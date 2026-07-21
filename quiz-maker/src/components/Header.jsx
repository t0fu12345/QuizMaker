import React from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 flex items-center justify-end px-10 gap-6">
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 cursor-pointer hover:bg-white/10 transition-colors">
        <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
        <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
      </div>
      
      <button className="text-slate-300 hover:text-white transition-colors relative">
        <Bell size={20} />
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
      </button>

      <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
        <span className="text-white font-medium text-[15px]">User</span>
        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-end justify-center overflow-hidden border border-white/10">
          <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
