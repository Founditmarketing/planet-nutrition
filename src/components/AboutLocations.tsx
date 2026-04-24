import React, { useEffect, useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix leaflet default icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

const locations = [
  { name: "Alexandria, LA", address: "6503 Coliseum Blvd, Ste D Bldg", zip: "Alexandria, LA 71303", coords: [31.3130, -92.4939] },
  { name: "Pineville, LA", address: "2951A Monroe Highway", zip: "Pineville, LA 71360", coords: [31.3341, -92.4332] },
  { name: "Wiggins, MS", address: "1704 Central Ave W", zip: "Wiggins, MS 39577", coords: [30.8574, -89.1412] },
];

export default function AboutLocations() {
  return (
    <section className="w-full bg-white dark:bg-black text-black dark:text-white border-b border-gray-200 dark:border-white/10 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background massive text overlay */}
      <div className="absolute top-4 left-0 right-0 overflow-hidden pointer-events-none select-none z-0 flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[100px] md:text-[160px] font-black text-black/[0.03] dark:text-white/[0.02] uppercase tracking-tighter leading-none transition-colors duration-300 pr-8">
            FIND A LOCATION • PLANET NUTRITION • GET FUELED • 
          </span>
          <span className="text-[100px] md:text-[160px] font-black text-black/[0.03] dark:text-white/[0.02] uppercase tracking-tighter leading-none transition-colors duration-300 pr-8">
            FIND A LOCATION • PLANET NUTRITION • GET FUELED • 
          </span>
        </motion.div>
      </div>

      <div className="w-full flex flex-col lg:flex-row relative z-10">
        
        {/* Left Panel: Locations */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 lg:pl-[max(1.5rem,calc((100vw-1600px)/2+3rem))] lg:pr-16 flex flex-col justify-center relative overflow-hidden transition-colors duration-300">
          <span className="text-gray-500 dark:text-white/50 font-sans text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">
            Locator
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-black dark:text-white mb-10">
            Find Your<br />Fueling Station.
          </h2>

          {/* Location List */}
          <div className="space-y-0">
            {locations.map((loc, i) => (
              <div 
                key={i}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-gray-200 dark:border-white/5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 px-4 -mx-4 transition-colors"
              >
                <div>
                  <h4 className="flex items-center gap-2 text-black dark:text-white font-sans font-black italic uppercase tracking-normal text-lg mb-1 group-hover:text-brand-sky transition-colors">
                    <MapPin className="w-4 h-4" />
                    {loc.name}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 font-sans text-[10px] font-bold tracking-widest uppercase pl-6">
                    {loc.address}<br />{loc.zip}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 pl-6 sm:pl-0 text-left sm:text-right">
                  <Link to="/locations" className="text-[10px] font-bold tracking-[0.1em] text-[#72c5de] hover:text-brand-sky flex items-center gap-1 uppercase">
                    View Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
            <Link to="/locations" className="flex items-center gap-3 text-black dark:text-white font-sans text-[10px] uppercase tracking-[0.2em] font-bold group w-fit">
              <span className="border-b-2 border-black dark:border-white group-hover:border-brand-sky group-hover:text-brand-sky transition-colors pb-1">
                View All Locations
              </span>
              <ArrowRight className="w-4 h-4 text-brand-sky group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Panel: Interactive Map */}
        <div className="w-full lg:w-1/2 bg-gray-100 dark:bg-[#111] relative min-h-[500px] lg:min-h-0 border-t lg:border-t-0 border-gray-200 dark:border-white/10 z-0">
          <MapContainer 
            center={[31.1, -90.8]} 
            zoom={7} 
            scrollWheelZoom={false} 
            className="w-full h-full absolute inset-0"
            style={{ zIndex: 1 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {locations.map((loc, idx) => (
              <Marker key={idx} position={loc.coords as [number, number]}>
                <Popup>
                  <div className="font-sans">
                    <strong className="block text-[14px] uppercase italic font-black text-brand-sky">{loc.name}</strong>
                    <span className="text-gray-600 text-[12px]">{loc.address}</span><br />
                    <span className="text-gray-600 text-[12px]">{loc.zip}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

      </div>
    </section>
  );
}
