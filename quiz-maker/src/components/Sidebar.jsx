import React from 'react';
import { LayoutDashboard, BarChart2, BookOpen, Lightbulb, PenTool, Sparkles, ChevronLeft, HelpCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Bảng xếp hạng', icon: BarChart2, path: '/leaderboard' },
    { name: 'Luyện tập', icon: BookOpen, path: '/practice' },
    { name: 'Gợi ý', icon: Lightbulb, path: '/hints' },
    { name: 'Thi', icon: PenTool, path: '/exam' },
    { name: 'Studio', icon: Sparkles, path: '/studio', badge: 'BETA' },
  ];

  return (
    <aside className="w-[260px] h-screen bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-white/10 flex flex-col justify-between fixed left-0 top-0 transition-colors">
      <div>
        <div className="flex items-center justify-between px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 dark:bg-amber-500 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white dark:text-zinc-950 font-bold text-lg leading-none">S</span>
            </div>
            <span className="text-slate-900 dark:text-zinc-50 font-bold text-xl tracking-tight transition-colors">ScoreUp</span>
          </div>
          <button className="text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500 rounded p-1">
            <ChevronLeft size={20} />
          </button>
        </div>

        <nav className="px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500
                ${isActive ? 'bg-slate-100 dark:bg-zinc-800 text-blue-600 dark:text-zinc-50' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-50 hover:bg-slate-50 dark:hover:bg-zinc-800/50'}
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} className={`transition-colors ${isActive ? 'text-blue-500 dark:text-amber-500' : 'text-slate-400 dark:text-zinc-500'}`} />
                  <span className="font-medium text-[15px]">{item.name}</span>
                  {item.badge && (
                     <span className="ml-auto bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-500 dark:text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-6">
        <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-50 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500">
          <HelpCircle size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
