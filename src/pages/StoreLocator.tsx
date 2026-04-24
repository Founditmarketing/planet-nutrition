import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const locations = [
  {
    city: "Alexandria",
    state: "Louisiana",
    address: "6503 Coliseum Blvd, Ste D Bldg",
    zip: "Alexandria, LA 71303",
  },
  {
    city: "Pineville",
    state: "Louisiana",
    address: "2951A Monroe Highway",
    zip: "Pineville, LA 71360",
  },
  {
    city: "Wiggins",
    state: "Mississippi",
    address: "1704 Central Ave W",
    zip: "Wiggins, MS 39577",
  }
];

export default function StoreLocator() {
  return (
    <div className="min-h-screen pt-[120px] pb-24 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-brand-sky font-sans text-[10px] uppercase tracking-[0.3em] font-bold block mb-4">
            Find A Store
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
            Our Locations
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-bold tracking-widest uppercase text-xs">
            Visit one of our retail locations to get expert advice, sample products, and pick up your supplements today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((loc, i) => (
            <div key={i} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-8 hover:border-brand-sky transition-colors group flex flex-col">
              <div className="w-12 h-12 bg-brand-sky/10 flex items-center justify-center rounded-full mb-6 group-hover:bg-brand-sky transition-colors">
                <MapPin className="w-6 h-6 text-brand-sky group-hover:text-black transition-colors" />
              </div>
              <h2 className="font-display text-3xl font-black italic uppercase tracking-tighter mb-2">
                {loc.city}
              </h2>
              <h3 className="text-brand-sky font-bold tracking-widest uppercase text-[10px] mb-6">
                {loc.state} LOCATION
              </h3>
              
              <div className="space-y-4 flex-grow">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                    {loc.address}<br/>
                    {loc.zip}
                  </p>
                </div>
                {/* Placeholders for future details */}
                <div className="flex items-center gap-3 opacity-50">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-500 text-sm">Phone number coming soon</p>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-500 text-sm">Store hours coming soon</p>
                </div>
              </div>
              
              <button className="w-full mt-8 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-[10px] py-4 hover:bg-brand-sky dark:hover:bg-brand-sky transition-colors">
                Get Directions
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
