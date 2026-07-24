import React from 'react';
import { motion } from 'motion/react';
import { Trophy, TrendingUp, Sparkles, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-24 pb-32 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block px-3 py-1 bg-white/5 rounded-full border border-white/5 mb-8">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">TỔNG QUAN</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-50 leading-[1.1] tracking-tight mb-8">
            Chào mừng trở lại,
            <br />
            <span className="text-zinc-500">Người chinh phục.</span>
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Hôm nay là một ngày tuyệt vời để phá vỡ những giới hạn mới. 
            Bạn đã sẵn sàng tiếp tục hành trình của mình chưa?
          </p>
        </motion.div>
      </section>

      {/* Z-Axis Cascade Cards Area */}
      <section className="max-w-4xl mx-auto relative">
        
        {/* Card 1: Progress */}
        <motion.div 
          className="sticky top-24 z-10 w-[90%] md:w-[92%] mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="p-1.5 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-xl shadow-2xl origin-top transition-transform hover:scale-[1.01] duration-500">
            <div className="bg-zinc-950 rounded-[calc(2rem-0.375rem)] p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5 h-[420px] flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-zinc-50">Tiến độ học tập</h2>
                  <p className="text-zinc-400">Tuần này</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5">
                  <p className="text-zinc-500 font-medium mb-2 uppercase text-xs tracking-wider">Đã hoàn thành</p>
                  <p className="text-4xl font-extrabold text-zinc-50">14 <span className="text-xl text-zinc-600 font-normal">Bài</span></p>
                </div>
                <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5">
                  <p className="text-zinc-500 font-medium mb-2 uppercase text-xs tracking-wider">Tỉ lệ đúng</p>
                  <p className="text-4xl font-extrabold text-emerald-400">85<span className="text-xl text-emerald-400/50 font-normal">%</span></p>
                </div>
                <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5">
                  <p className="text-zinc-500 font-medium mb-2 uppercase text-xs tracking-wider">Chuỗi ngày</p>
                  <p className="text-4xl font-extrabold text-amber-500">5 <span className="text-xl text-amber-500/50 font-normal">Ngày</span></p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Leaderboard Snippet */}
        <motion.div 
          className="sticky top-40 z-20 w-[95%] md:w-[96%] mx-auto mt-[30vh]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="p-1.5 rounded-[2rem] bg-zinc-800/40 border border-white/10 backdrop-blur-xl shadow-2xl origin-top transition-transform hover:scale-[1.01] duration-500">
            <div className="bg-zinc-900 rounded-[calc(2rem-0.375rem)] p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5 h-[420px] flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Trophy size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-zinc-50">Bảng vàng</h2>
                  <p className="text-zinc-400">Những người dẫn đầu</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Alex Chen", score: 2450, rank: 1 },
                  { name: "Sarah Connor", score: 2100, rank: 2 },
                  { name: "You", score: 1850, rank: 3, isYou: true },
                ].map((user, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${user.isYou ? 'bg-amber-500/10 border-amber-500/30' : 'bg-zinc-950/50 border-white/5'}`}>
                    <div className="flex items-center gap-4">
                      <span className={`font-bold w-6 text-center ${user.rank === 1 ? 'text-amber-500' : 'text-zinc-500'}`}>#{user.rank}</span>
                      <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10" />
                      <span className={`font-medium ${user.isYou ? 'text-amber-500' : 'text-zinc-300'}`}>{user.name}</span>
                    </div>
                    <span className="font-bold text-zinc-50">{user.score} <span className="text-xs text-zinc-600 font-normal">XP</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Action */}
        <motion.div 
          className="sticky top-56 z-30 w-full mx-auto mt-[30vh]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="p-1.5 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl shadow-2xl origin-top transition-transform hover:scale-[1.01] duration-500">
            <div className="bg-zinc-950 rounded-[calc(2rem-0.375rem)] p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(16,185,129,0.2)] border border-emerald-500/10 h-[420px] flex flex-col md:flex-row items-center justify-center md:justify-between gap-8">
              <div className="w-full">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles size={20} className="text-emerald-500" />
                  <span className="text-emerald-500 font-bold uppercase tracking-widest text-sm">Gợi ý hôm nay</span>
                </div>
                <h2 className="text-3xl font-extrabold text-zinc-50 mb-4">Tiếp tục ReactJS</h2>
                <p className="text-zinc-400 max-w-md">Bạn đang có đà rất tốt. Hoàn thành nốt 5 câu hỏi cuối cùng để nhận huy hiệu Master.</p>
              </div>
              
              {/* Button-in-Button Architecture */}
              <button 
                onClick={() => navigate('/practice')}
                className="group relative inline-flex items-center gap-6 rounded-full bg-zinc-50 pl-8 pr-2 py-2 text-zinc-950 font-bold text-lg transition-all hover:bg-zinc-200 active:scale-[0.98]"
              >
                <span>Vào thi ngay</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-zinc-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                  <Play size={18} fill="currentColor" />
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Dynamic spacer to perfectly stop scroll when Card 3 hits top-56 (224px).
            Card 3 height is 420px. Bottom of Card 3 is at 644px from top.
            We need the document to end exactly so that the viewport bottom is 644px below viewport top.
            We subtract 40px for the pb-10 in DashboardLayout. */}
        <div style={{ height: 'max(0px, calc(100vh - 684px))' }} className="w-full pointer-events-none" />
      </section>
    </div>
  );
};

export default MainDashboard;
