import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      setIsLightMode(true);
      document.documentElement.classList.remove('dark');
    } else {
      setIsLightMode(false);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <header className="h-20 flex items-center justify-end px-10 gap-6">
      {/* Custom Theme Toggle Switch */}
      <ThemeToggle isLightMode={isLightMode} toggleTheme={toggleTheme} />

      <button className="text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500 rounded-full p-1" aria-label="Notifications">
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 dark:bg-amber-500 rounded-full border border-white dark:border-zinc-950"></span>
      </button>

      <button className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500 rounded-full p-1 pl-3" aria-label="User Profile">
        <span className="text-slate-900 dark:text-zinc-50 font-medium text-[15px]">User</span>
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-zinc-800 flex items-end justify-center overflow-hidden border border-slate-300 dark:border-white/10 transition-colors">
          <svg className="w-8 h-8 text-slate-400 dark:text-zinc-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </button>
    </header>
  );
};

export default Header;
