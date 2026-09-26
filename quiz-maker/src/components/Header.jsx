import React, { useState, useEffect, useRef } from 'react';
import { Bell, LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { getCurrentUser, clearCurrentUserSession } from '../utils/auth';

const Header = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

      <div className="relative" ref={profileRef}>
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500 rounded-full p-1 pl-3" 
          aria-label="User Profile"
        >
          <div className="flex flex-col text-right">
            <span className="text-slate-900 dark:text-zinc-50 font-medium text-[15px] leading-tight">
              {user?.displayName || user?.username || 'Người dùng'}
            </span>
            {user?.role === 'admin' && (
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                🛡️ ADMIN
              </span>
            )}
          </div>
          <div className={`w-10 h-10 rounded-full ${user?.role === 'admin' ? 'bg-gradient-to-tr from-amber-600 to-amber-400 ring-2 ring-amber-500/30' : 'bg-blue-600 dark:bg-amber-500'} text-white font-bold flex items-center justify-center overflow-hidden border border-slate-300 dark:border-white/10 transition-colors shadow-sm`}>
            {user ? (user.displayName || user.username || 'U')[0].toUpperCase() : (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-slate-200 dark:border-white/10 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 border-b border-slate-100 dark:border-white/5 mb-2">
              <div className="flex items-center justify-between gap-1 mb-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-zinc-50 truncate">
                  {user?.displayName || user?.username || 'Người dùng'}
                </p>
                {user?.role === 'admin' ? (
                  <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    ADMIN
                  </span>
                ) : (
                  <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    HỌC VIÊN
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 truncate">
                {user?.email || 'Chưa cập nhật email'}
              </p>
              <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 font-mono">
                @{user?.username || 'guest'}
              </span>
            </div>
            
            <button 
              onClick={() => {
                setIsProfileOpen(false);
                clearCurrentUserSession();
                navigate('/auth/login');
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
