import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Search, MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { locationsData, StoreLocation } from '../data/locationsData';
import { motion, AnimatePresence } from 'motion/react';
import 'leaflet/dist/leaflet.css';

// Custom Marker Icon to avoid broken image links in Leaflet and look premium
const createCustomIcon = (isActive: boolean) => L.divIcon({
  className: 'custom-pin',
  html: `<div style="background-color: ${isActive ? '#0ea5e9' : '#000000'}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform: scale(${isActive ? 1.4 : 1});"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Component to handle auto-panning the map when a location is selected from sidebar
function MapController({ selectedLoc }: { selectedLoc: StoreLocation | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedLoc) {
      // Fly to the location smoothly
      map.flyTo([selectedLoc.lat, selectedLoc.lng], 13, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [selectedLoc, map]);
  return null;
}

export default function StoreLocator() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Filter locations based on search query
  const filteredLocations = useMemo(() => {
    if (!search) return locationsData;
    const lower = search.toLowerCase();
    return locationsData.filter(loc => 
      loc.city.toLowerCase().includes(lower) || 
      loc.region.toLowerCase().includes(lower) ||
      loc.address.toLowerCase().includes(lower) ||
      loc.state.toLowerCase().includes(lower)
    );
  }, [search]);

  // Group the filtered locations by Region
  const groupedLocations = useMemo(() => {
    const groups: Record<string, StoreLocation[]> = {};
    filteredLocations.forEach(loc => {
      if (!groups[loc.region]) groups[loc.region] = [];
      groups[loc.region].push(loc);
    });
    return groups;
  }, [filteredLocations]);

  const selectedLocation = useMemo(() => 
    locationsData.find(l => l.id === selectedId) || null
  , [selectedId]);

  return (
    <div className="h-[calc(100dvh-112px)] bg-white dark:bg-black flex flex-col overflow-hidden">
      
      {/* Hero Section */}
      <div className="bg-gray-200 dark:bg-zinc-900 text-black dark:text-white py-16 px-6 relative overflow-hidden border-b border-gray-300 dark:border-white/10 shrink-0">
        <div className="max-w-4xl mx-auto relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl uppercase italic font-black tracking-tighter mb-4"
          >
            Store <span className="text-brand-sky">Locator</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-bold tracking-widest uppercase"
          >
            Visit one of our retail locations to get expert advice, sample products, and pick up your supplements today.
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar - Locations List */}
        <div className="w-full md:w-[400px] lg:w-[450px] h-full flex flex-col border-r border-gray-200 dark:border-white/10 relative z-10 shadow-[10px_0_30px_rgba(0,0,0,0.1)] dark:shadow-[10px_0_30px_rgba(0,0,0,0.5)] bg-white dark:bg-black">
          
          {/* Search Header */}
          <div className="p-6 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-black sticky top-0 z-10 shrink-0">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by city, region, or zip..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-brand-sky text-sm font-sans text-black dark:text-white transition-shadow"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(groupedLocations).length === 0 ? (
            <div className="p-10 text-center text-gray-500 font-sans text-sm">
              No locations found matching "{search}"
            </div>
          ) : (
            Object.entries(groupedLocations).map(([region, locs]) => (
              <div key={region} className="mb-0">
                {/* Region Header */}
                <div className="bg-gray-50 dark:bg-zinc-900/80 px-6 py-2 border-y border-gray-200 dark:border-white/5 sticky top-0 z-10 backdrop-blur-md">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-sky">{region}</h3>
                </div>
                
                {/* Stores in Region */}
                <div className="divide-y divide-gray-100 dark:divide-white/5">
                  {locs.map(loc => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedId(loc.id)}
                      className={`w-full text-left p-6 transition-colors group relative ${selectedId === loc.id ? 'bg-brand-sky/5 dark:bg-brand-sky/10' : 'hover:bg-gray-50 dark:hover:bg-zinc-900/40'}`}
                    >
                      {/* Active indicator bar */}
                      {selectedId === loc.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-sky" />
                      )}
                      
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-display text-xl uppercase italic font-black tracking-tighter ${selectedId === loc.id ? 'text-brand-sky' : 'text-black dark:text-white'}`}>
                          {loc.city}
                        </h4>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{loc.state}</span>
                      </div>
                      
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${selectedId === loc.id ? 'text-brand-sky' : 'text-gray-400'}`} />
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-sans leading-relaxed">{loc.address}</p>
                      </div>

                      {/* Expandable Details if Selected */}
                      <AnimatePresence>
                        {selectedId === loc.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10 space-y-3">
                              {loc.phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                  <Phone className="w-4 h-4 text-brand-sky shrink-0" />
                                  <span>{loc.phone}</span>
                                </div>
                              )}
                              {loc.hours && (
                                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                  <Clock className="w-4 h-4 text-brand-sky shrink-0 mt-0.5" />
                                  <span className="leading-tight">{loc.hours}</span>
                                </div>
                              )}
                              
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`https://maps.google.com/?q=${loc.lat},${loc.lng}`, '_blank');
                                }}
                                className="mt-6 w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black hover:bg-brand-sky dark:hover:bg-brand-sky py-3 text-[10px] font-bold uppercase tracking-widest transition-colors shadow-md"
                              >
                                <Navigation className="w-4 h-4" /> Get Directions
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 h-[50vh] md:h-full relative z-0 bg-gray-100 dark:bg-zinc-900">
        <MapContainer 
          center={[30.6, -91.5]} 
          zoom={7} 
          scrollWheelZoom={true} 
          className="w-full h-full z-0"
          zoomControl={true}
        >
          {/* High-quality neutral tiles that look good in modern UIs */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          <MapController selectedLoc={selectedLocation} />
          
          {filteredLocations.map(loc => (
            <Marker 
              key={loc.id} 
              position={[loc.lat, loc.lng]}
              icon={createCustomIcon(selectedId === loc.id)}
              eventHandlers={{
                click: () => {
                  setSelectedId(loc.id);
                  // On mobile, scroll the sidebar into view if they click a map pin
                  if (window.innerWidth < 768) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                },
              }}
            >
              <Popup className="custom-popup" closeButton={false}>
                <div className="font-sans text-center p-1">
                  <h3 className="font-display text-lg font-black italic uppercase tracking-tighter text-black m-0 leading-none">{loc.city}</h3>
                  <p className="text-[10px] uppercase font-bold text-gray-500 mt-2 mb-0 tracking-widest">{loc.state}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Subtle shadow overlay from the sidebar onto the map */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/5 dark:from-black/40 to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
    </div>
  );
}
