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
    <aside className="w-[260px] h-screen bg-zinc-950 border-r border-white/10 flex flex-col justify-between fixed left-0 top-0">
      <div>
        <div className="flex items-center justify-between px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-zinc-950 font-bold text-lg leading-none">S</span>
            </div>
            <span className="text-zinc-50 font-bold text-xl tracking-tight">ScoreUp</span>
          </div>
          <button className="text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded p-1">
            <ChevronLeft size={20} />
          </button>
        </div>

        <nav className="px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
                ${isActive || item.name === 'Luyện tập' ? 'bg-zinc-800 text-zinc-50' : 'text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/50'}
              `}
            >
              <item.icon size={20} className={item.name === 'Luyện tập' ? 'text-amber-500' : 'text-zinc-500'} />
              <span className="font-medium text-[15px]">{item.name}</span>
              {item.badge && (
                <span className="ml-auto bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-6">
        <button className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 transition-colors ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
          <HelpCircle size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
