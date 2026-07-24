import React from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 flex items-center justify-end px-10 gap-6">
      <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-full px-3 py-1.5 cursor-pointer hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" tabIndex={0} role="button" aria-label="Credits">
        <div className="w-4 h-4 bg-zinc-500 rounded-full"></div>
        <div className="w-4 h-4 bg-zinc-500 rounded-full"></div>
      </div>
      
      <button className="text-zinc-400 hover:text-zinc-50 transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-full p-1" aria-label="Notifications">
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full border border-zinc-950"></span>
      </button>

      <button className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-full p-1 pl-3" aria-label="User Profile">
        <span className="text-zinc-50 font-medium text-[15px]">User</span>
        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-end justify-center overflow-hidden border border-white/10">
          <svg className="w-8 h-8 text-zinc-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </button>
    </header>
  );
};

export default Header;
