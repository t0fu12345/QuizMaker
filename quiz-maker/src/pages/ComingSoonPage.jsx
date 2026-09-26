import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  ShieldAlert, 
  Construction, 
  CheckCircle2,
  Users,
  Database,
  TrendingUp,
  ShieldCheck,
  ArrowUpDown,
  Trophy,
  Lightbulb,
  PenTool,
  HelpCircle
} from 'lucide-react';
import { getCurrentUser } from '../utils/auth';

const ICON_MAP = {
  Users,
  Database,
  TrendingUp,
  ShieldCheck,
  ArrowUpDown,
  Trophy,
  Lightbulb,
  PenTool,
  Sparkles,
  HelpCircle
};

const ComingSoonPage = ({
  title = "Tính năng sắp ra mắt",
  subtitle = "Chúng tôi đang hoàn thiện tính năng và đồng bộ dữ liệu để mang lại trải nghiệm tốt nhất.",
  icon = "Sparkles",
  badge = "COMING SOON",
  isAdminOnly = false,
  features = []
}) => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  const IconComponent = ICON_MAP[icon] || Sparkles;

  // Access check for admin-only pages
  if (isAdminOnly && !isAdmin) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in duration-300">
        <div className="bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900/40 rounded-xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="w-14 h-14 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center mb-6 border border-red-200 dark:border-red-500/20">
            <ShieldAlert size={32} />
          </div>
          <span className="inline-block px-3 py-1 rounded-md bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-4 border border-red-200 dark:border-red-800/30">
            Truy cập bị giới hạn
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-zinc-50 mb-3">
            Quyền Quản Trị Viên (Admin) Được Yêu Cầu
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-sm md:text-base max-w-lg mx-auto mb-8">
            Trang <span className="font-semibold text-slate-800 dark:text-zinc-200">"{title}"</span> chỉ dành cho tài khoản quản trị hệ thống do đội ngũ Developer cấp. Bạn hiện đang đăng nhập với tư cách học viên.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-zinc-950 font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} />
              Về Trang Chủ Dashboard
            </button>
            <Link
              to="/auth/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 font-medium transition-colors"
            >
              Đăng nhập tài khoản khác
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 animate-in fade-in duration-300">
      <div className="relative bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl p-8 md:p-12 shadow-sm overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-blue-50 dark:bg-amber-500/10 text-blue-600 dark:text-amber-400 border border-blue-200 dark:border-amber-500/30">
              <Construction size={14} className="animate-spin-slow" />
              {badge}
            </span>
            {isAdminOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/30">
                🛡️ Admin Area
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 font-medium">
            <Clock size={14} />
            <span>Dữ liệu đang được kết nối</span>
          </div>
        </div>

        {/* Center Icon & Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-tr from-blue-500/20 to-blue-50 dark:from-amber-500/20 dark:to-zinc-800 border border-blue-200 dark:border-amber-500/30 flex items-center justify-center text-blue-600 dark:text-amber-400 shadow-inner">
              <IconComponent size={36} className="transition-transform hover:scale-105 duration-300" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md bg-amber-500 text-zinc-950 flex items-center justify-center shadow-md">
              <Sparkles size={12} />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Feature roadmap cards */}
        {features.length > 0 && (
          <div className="mb-10 bg-slate-50/80 dark:bg-zinc-950/60 border border-slate-200/80 dark:border-white/5 rounded-lg p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-3.5 flex items-center gap-2">
              <Sparkles size={14} className="text-amber-500" />
              Các tính năng dự kiến triển khai:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {features.map((feat, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-md bg-white dark:bg-zinc-900/80 border border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-zinc-300 text-sm"
                >
                  <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-zinc-950 font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <ArrowLeft size={18} />
            Quay lại Dashboard
          </button>
          <Link
            to="/practice"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-medium transition-colors"
          >
            Luyện tập câu hỏi có sẵn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
