import React from 'react';
import { User, Package, Settings, LogOut } from 'lucide-react';

export default function Account() {
  return (
    <div className="min-h-screen pt-[120px] pb-24 px-6 md:px-12 bg-gray-50 dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">
          My Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#111] border border-brand-sky font-bold uppercase tracking-widest text-xs text-brand-deep dark:text-brand-sky">
              <User className="w-4 h-4" /> Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#111] border border-transparent hover:border-gray-200 dark:hover:border-white/10 font-bold uppercase tracking-widest text-xs text-gray-500 hover:text-black dark:hover:text-white transition-colors">
              <Package className="w-4 h-4" /> Orders
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#111] border border-transparent hover:border-gray-200 dark:hover:border-white/10 font-bold uppercase tracking-widest text-xs text-gray-500 hover:text-black dark:hover:text-white transition-colors">
              <Settings className="w-4 h-4" /> Settings
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#111] border border-transparent hover:border-red-200 dark:hover:border-red-900/50 font-bold uppercase tracking-widest text-xs text-red-500 transition-colors mt-8">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-8">
              <h2 className="font-black italic uppercase tracking-tighter text-2xl mb-6">Profile Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                  <input type="text" defaultValue="John" className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 px-4 py-3 text-sm font-bold outline-none focus:border-brand-sky" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                  <input type="text" defaultValue="Doe" className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 px-4 py-3 text-sm font-bold outline-none focus:border-brand-sky" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input type="email" defaultValue="john.doe@example.com" className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 px-4 py-3 text-sm font-bold outline-none focus:border-brand-sky" />
                </div>
              </div>

              <button className="bg-brand-deep text-white font-bold uppercase tracking-widest text-xs px-8 py-4 hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
