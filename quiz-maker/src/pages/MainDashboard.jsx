import React, { useState, useEffect } from 'react';
import { m } from 'motion/react';
import { Trophy, TrendingUp, Sparkles, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const stats = user?.stats || {
    completedQuizzes: 0,
    correctRate: 0,
    streakDays: 1
  };

  const displayName = user?.displayName || user?.username || 'Người chinh phục';

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-24 pb-32 max-w-5xl mx-auto">
        <m.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block px-3 py-1 bg-slate-200/60 dark:bg-white/5 rounded-md border border-slate-300/60 dark:border-white/10 mb-8 transition-colors">
            <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-slate-600 dark:text-zinc-400 transition-colors">TỔNG QUAN</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-zinc-50 leading-[1.1] tracking-tight mb-8 transition-colors">
            {user?.role === 'admin' ? 'Xin chào Quản trị viên,' : 'Chào mừng trở lại,'}
            <br />
            <span className="text-blue-600 dark:text-amber-500 transition-colors">{displayName}.</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed transition-colors">
            {user?.role === 'admin'
              ? 'Bạn đang đăng nhập bằng tài khoản Quản Trị Viên do Developers cấp. Mọi phân hệ giám sát và ngân hàng đề thi đã sẵn sàng.'
              : 'Hôm nay là một ngày tuyệt vời để phá vỡ những giới hạn mới. Bạn đã sẵn sàng tiếp tục hành trình học tập của mình chưa?'}
          </p>
        </m.div>
      </section>

      {/* Z-Axis Cascade Cards Area */}
      <section className="max-w-4xl mx-auto relative">
        
        {/* Card 1: Progress */}
        <m.div 
          className="sticky top-24 z-10 w-[90%] md:w-[92%] mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 p-6 md:p-8 shadow-sm dark:shadow-xl h-[420px] flex flex-col justify-center transition-all hover:border-slate-300 dark:hover:border-white/20 duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-11 h-11 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-500/20">
                <TrendingUp size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-50 transition-colors">Tiến độ của bạn</h2>
                <p className="text-slate-500 dark:text-zinc-400 text-sm transition-colors">Tài khoản @{user?.username || 'khach'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-slate-50/80 dark:bg-zinc-950/60 rounded-lg p-5 border border-slate-200/80 dark:border-white/5 transition-colors">
                <p className="text-slate-500 dark:text-zinc-500 font-semibold mb-2 uppercase text-[11px] tracking-wider transition-colors">Đã hoàn thành</p>
                <p className="text-4xl font-extrabold text-slate-900 dark:text-zinc-50 transition-colors">{stats.completedQuizzes} <span className="text-xl text-slate-400 dark:text-zinc-600 font-normal transition-colors">Bài</span></p>
              </div>
              <div className="bg-slate-50/80 dark:bg-zinc-950/60 rounded-lg p-5 border border-slate-200/80 dark:border-white/5 transition-colors">
                <p className="text-slate-500 dark:text-zinc-500 font-semibold mb-2 uppercase text-[11px] tracking-wider transition-colors">Tỉ lệ đúng</p>
                <p className="text-4xl font-extrabold text-emerald-500 dark:text-emerald-400 transition-colors">{stats.correctRate}<span className="text-xl text-emerald-500/50 dark:text-emerald-400/50 font-normal transition-colors">%</span></p>
              </div>
              <div className="bg-slate-50/80 dark:bg-zinc-950/60 rounded-lg p-5 border border-slate-200/80 dark:border-white/5 transition-colors">
                <p className="text-slate-500 dark:text-zinc-500 font-semibold mb-2 uppercase text-[11px] tracking-wider transition-colors">Chuỗi ngày</p>
                <p className="text-4xl font-extrabold text-blue-500 dark:text-amber-500 transition-colors">{stats.streakDays} <span className="text-xl text-blue-500/50 dark:text-amber-500/50 font-normal transition-colors">Ngày</span></p>
              </div>
            </div>

            {stats.history && stats.history.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span>Bài thi gần nhất: <strong className="text-slate-800 dark:text-zinc-100 font-semibold">{stats.history[0].subject}</strong> ({stats.history[0].score} điểm)</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 font-mono text-[11px] text-slate-600 dark:text-zinc-300">
                  {stats.history[0].date}
                </span>
              </div>
            )}
          </div>
        </m.div>

        {/* Card 2: Leaderboard Snippet */}
        <m.div 
          className="sticky top-40 z-20 w-[95%] md:w-[96%] mx-auto mt-[30vh]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 p-6 md:p-8 shadow-sm dark:shadow-xl h-[420px] flex flex-col justify-center transition-all hover:border-slate-300 dark:hover:border-white/20 duration-300">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-11 h-11 rounded-lg bg-blue-500/10 dark:bg-amber-500/10 flex items-center justify-center text-blue-500 dark:text-amber-500 shrink-0 border border-blue-500/20 dark:border-amber-500/20 transition-colors">
                <Trophy size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-50 transition-colors">Bảng vàng</h2>
                <p className="text-slate-500 dark:text-zinc-400 text-sm transition-colors">Những người dẫn đầu</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { name: "Alex Chen", score: 2450, rank: 1 },
                { name: "Sarah Connor", score: 2100, rank: 2 },
                { name: `${displayName} (Bạn)`, score: stats.completedQuizzes * 100 + 450, rank: 3, isYou: true },
              ].map((item) => (
                <div key={item.name} className={`flex items-center justify-between p-3.5 rounded-lg border transition-colors ${item.isYou ? 'bg-blue-500/10 dark:bg-amber-500/10 border-blue-500/30 dark:border-amber-500/30' : 'bg-slate-50/80 dark:bg-zinc-950/50 border-slate-200/70 dark:border-white/5'}`}>
                  <div className="flex items-center gap-3.5">
                    <span className={`font-bold w-6 text-center text-sm transition-colors ${item.rank === 1 ? 'text-blue-500 dark:text-amber-500' : 'text-slate-400 dark:text-zinc-500'}`}>#{item.rank}</span>
                    <div className="w-9 h-9 rounded-md bg-blue-600/20 text-blue-600 dark:text-amber-400 font-bold flex items-center justify-center border border-slate-300/60 dark:border-white/10 text-sm transition-colors">
                      {item.name[0].toUpperCase()}
                    </div>
                    <span className={`font-medium text-sm transition-colors ${item.isYou ? 'text-blue-600 dark:text-amber-500 font-semibold' : 'text-slate-700 dark:text-zinc-300'}`}>{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-zinc-50 transition-colors">{item.score} <span className="text-xs text-slate-400 dark:text-zinc-600 font-normal transition-colors">XP</span></span>
                </div>
              ))}
            </div>
          </div>
        </m.div>

        {/* Card 3: Action */}
        <m.div 
          className="sticky top-56 z-30 w-full mx-auto mt-[30vh]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="rounded-xl bg-white dark:bg-zinc-900 border border-emerald-500/30 dark:border-emerald-500/20 p-6 md:p-8 shadow-sm dark:shadow-xl h-[420px] flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 transition-all hover:border-emerald-500/40 duration-300">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-emerald-500" />
                <span className="text-emerald-500 font-bold uppercase tracking-wider text-xs">Gợi ý cho bạn</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-zinc-50 mb-4 transition-colors">
                {stats.history && stats.history.length > 0 
                  ? `Tiếp tục luyện tập: ${stats.history[0].subject}` 
                  : 'Bắt đầu luyện tập bài đầu tiên'}
              </h2>
              <p className="text-slate-600 dark:text-zinc-400 max-w-md text-sm md:text-base leading-relaxed transition-colors">
                {stats.completedQuizzes > 0 
                  ? `Bạn đã hoàn thành ${stats.completedQuizzes} bài thi với tỉ lệ đúng ${stats.correctRate}%. Tiếp tục duy trì chuỗi học tập để thăng hạng nhé!` 
                  : 'Hãy hoàn thành bài thi đầu tiên để ghi lại điểm số và kích hoạt chuỗi ngày học tập cho tài khoản của bạn.'}
              </p>
            </div>
            
            {/* Action button */}
            <button 
              onClick={() => navigate('/practice')}
              className="group relative inline-flex items-center gap-4 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-amber-500 dark:hover:bg-amber-400 pl-6 pr-3 py-3 text-white dark:text-zinc-950 font-bold text-base transition-all duration-200 active:scale-[0.98] shadow-sm cursor-pointer shrink-0"
            >
              <span>Vào thi ngay</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/20 dark:bg-zinc-950/20 text-white dark:text-zinc-950 transition-transform group-hover:translate-x-1">
                <Play size={16} fill="currentColor" />
              </div>
            </button>
          </div>
        </m.div>

        {/* Dynamic spacer */}
        <div style={{ height: 'max(0px, calc(100vh - 684px))' }} className="w-full pointer-events-none" />
      </section>
    </div>
  );
};

export default MainDashboard;
