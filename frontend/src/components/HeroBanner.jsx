import React from 'react';
import { m } from 'motion/react';

const HeroBanner = () => {
  return (
    <m.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 p-8 md:p-10 flex items-center justify-between shadow-sm dark:shadow-xl transition-colors"
    >
      <div className="relative z-10 max-w-xl">
        <m.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 dark:bg-amber-500/10 text-blue-600 dark:text-amber-400 text-xs font-semibold mb-6 border border-blue-500/20 dark:border-amber-500/20 uppercase tracking-wider transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-amber-500 animate-pulse transition-colors"></span>
          Ready to learn
        </m.div>
        
        <m.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-900 dark:text-zinc-50 text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight transition-colors"
        >
          Nâng cao điểm số<br />của bạn hôm nay.
        </m.h1>
        
        <m.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-600 dark:text-zinc-400 text-base md:text-lg font-medium max-w-md leading-relaxed transition-colors"
        >
          Chọn một môn học và bắt đầu luyện tập để củng cố kiến thức ngay bây giờ.
        </m.p>
      </div>
      
      {/* Decorative clean abstract shape */}
      <div className="hidden md:flex relative z-10 w-44 h-44 items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 dark:from-amber-500/20 to-transparent rounded-xl blur-2xl transition-colors"></div>
        <div className="w-28 h-28 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 rotate-12 shadow-lg dark:shadow-2xl flex items-center justify-center transition-colors">
          <div className="w-14 h-14 rounded-lg border-2 border-blue-500/50 dark:border-amber-500/50 transition-colors"></div>
        </div>
        <div className="absolute w-20 h-20 rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 -bottom-3 -left-3 shadow-md dark:shadow-xl -z-10 flex items-center justify-center transition-colors">
           <div className="w-7 h-7 rounded-sm bg-slate-200/50 dark:bg-zinc-700/50 rotate-45 transition-colors"></div>
        </div>
      </div>
      
      {/* Subtle texture background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900/[0.03] dark:from-white/[0.03] via-transparent to-transparent pointer-events-none transition-colors"></div>
    </m.div>
  );
};

export default HeroBanner;
