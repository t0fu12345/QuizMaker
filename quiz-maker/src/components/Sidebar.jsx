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
    <aside className="w-[260px] h-screen bg-slate-900/40 backdrop-blur-xl border-r border-white/5 flex flex-col justify-between fixed left-0 top-0">
      <div>
        <div className="flex items-center justify-between px-6 py-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-amber-500 font-bold text-2xl tracking-tight">ScoreUp</span>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </button>
        </div>

        <nav className="px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive || item.name === 'Luyện tập' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-300 hover:text-white hover:bg-white/5'}
              `}
            >
              <item.icon size={20} className={item.name === 'Luyện tập' ? 'text-white' : 'text-slate-400'} />
              <span className="font-medium text-[15px]">{item.name}</span>
              {item.badge && (
                <span className="ml-auto bg-fuchsia-500/20 text-fuchsia-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-6">
        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all ml-auto">
          <HelpCircle size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
