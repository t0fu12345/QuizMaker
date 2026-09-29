import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  BookOpen, 
  Lightbulb, 
  PenTool, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle,
  Users,
  Database,
  TrendingUp,
  ShieldCheck,
  ArrowUpDown,
  Shield
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Bảng xếp hạng', icon: BarChart2, path: '/leaderboard' },
  { name: 'Luyện tập', icon: BookOpen, path: '/practice' },
  { name: 'Gợi ý', icon: Lightbulb, path: '/hints' },
  { name: 'Thi', icon: PenTool, path: '/exam' },
  { name: 'Studio', icon: Sparkles, path: '/studio', badge: 'BETA' },
];

const adminNavItems = [
  { name: 'Giám sát học viên', icon: Users, path: '/admin/students', badge: 'ADMIN' },
  { name: 'Ngân hàng đề (CRUD)', icon: Database, path: '/admin/questions', badge: 'CRUD' },
  { name: 'Thống kê & Báo cáo', icon: TrendingUp, path: '/admin/analytics' },
  { name: 'Quản lý kỳ thi', icon: ShieldCheck, path: '/admin/exams' },
  { name: 'Nhập / Xuất dữ liệu', icon: ArrowUpDown, path: '/admin/import-export' },
];

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [location]);

  const isAdmin = currentUser?.role === 'admin';

  return (
    <aside className={`h-screen bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-white/10 flex flex-col justify-between fixed left-0 top-0 transition-[width] duration-300 z-30 ${isCollapsed ? 'w-[80px]' : 'w-[260px]'}`}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Logo / Header */}
        <div className={`shrink-0 flex items-center py-6 ${isCollapsed ? 'flex-col gap-5 justify-center px-2' : 'justify-between px-6'}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 shrink-0 bg-blue-500 dark:bg-amber-500 rounded-lg flex items-center justify-center transition-colors shadow-sm">
              <span className="text-white dark:text-zinc-950 font-bold text-lg leading-none">S</span>
            </div>
            {!isCollapsed && <span className="text-slate-900 dark:text-zinc-50 font-bold text-xl tracking-tight transition-colors whitespace-nowrap">ScoreUp</span>}
          </div>
          <button 
            onClick={onToggle} 
            aria-label={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"} 
            className="text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500 rounded p-1 shrink-0 cursor-pointer"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 space-y-1">
          {/* General Student/User Nav */}
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              title={isCollapsed ? item.name : undefined}
              className={({ isActive }) => `
                flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500
                ${isActive ? 'bg-slate-100 dark:bg-zinc-800 text-blue-600 dark:text-zinc-50 font-medium' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-50 hover:bg-slate-50 dark:hover:bg-zinc-800/50'}
                ${isCollapsed ? 'justify-center px-0' : 'gap-3'}
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={19} className={`shrink-0 transition-colors ${isActive ? 'text-blue-500 dark:text-amber-500' : 'text-slate-400 dark:text-zinc-500'}`} />
                  {!isCollapsed && (
                    <>
                      <span className="font-medium text-[14px] whitespace-nowrap">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-500 dark:text-zinc-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider transition-colors shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Admin Group (conditionally rendered for admin role) */}
          {isAdmin && (
            <div className="pt-3 pb-1">
              {isCollapsed ? (
                <div className="my-2 border-t border-slate-200 dark:border-white/10 mx-2" title="Khu vực Quản trị viên" />
              ) : (
                <div className="px-3 pt-2 pb-1.5 flex items-center justify-between border-t border-slate-200/80 dark:border-white/10 mt-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    <Shield size={12} />
                    <span>Quản trị viên</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    ADMIN
                  </span>
                </div>
              )}

              <div className="space-y-1">
                {adminNavItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    title={isCollapsed ? item.name : undefined}
                    className={({ isActive }) => `
                      flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
                      ${isActive 
                        ? 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 font-semibold' 
                        : 'text-slate-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-500/5'}
                      ${isCollapsed ? 'justify-center px-0' : 'gap-3'}
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon 
                          size={19} 
                          className={`shrink-0 transition-colors ${
                            isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-zinc-500'
                          }`} 
                        />
                        {!isCollapsed && (
                          <>
                            <span className="font-medium text-[14px] whitespace-nowrap truncate">{item.name}</span>
                            {item.badge && (
                              <span className="ml-auto bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help / Footer Button */}
      <div className={`p-4 shrink-0 flex ${isCollapsed ? 'justify-center px-0 pb-6' : ''}`}>
        <button 
          aria-label="Trợ giúp" 
          title="Trợ giúp & Hỗ trợ"
          className={`w-9 h-9 rounded-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-50 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500 shrink-0 ${isCollapsed ? '' : 'ml-auto'} cursor-pointer`}
        >
          <HelpCircle size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
