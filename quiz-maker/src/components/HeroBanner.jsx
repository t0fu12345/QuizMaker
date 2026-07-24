import React from 'react';
import { motion } from 'motion/react';

const HeroBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[24px] bg-zinc-900 border border-white/10 p-10 flex items-center justify-between shadow-xl"
    >
      <div className="relative z-10 max-w-xl">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-6 border border-amber-500/20"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          Ready to learn
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-zinc-50 text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight"
        >
          Nâng cao điểm số<br />của bạn hôm nay.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-zinc-400 text-lg font-medium max-w-md leading-relaxed"
        >
          Chọn một môn học và bắt đầu luyện tập để củng cố kiến thức ngay bây giờ.
        </motion.p>
      </div>
      
      {/* Decorative clean abstract shape instead of div-cat */}
      <div className="hidden md:flex relative z-10 w-48 h-48 items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-full blur-2xl"></div>
        <div className="w-32 h-32 rounded-2xl bg-zinc-800 border border-white/10 rotate-12 shadow-2xl flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-amber-500/50"></div>
        </div>
        <div className="absolute w-24 h-24 rounded-full bg-zinc-800 border border-white/10 -bottom-4 -left-4 shadow-xl -z-10 flex items-center justify-center">
           <div className="w-8 h-8 rounded-sm bg-zinc-700/50 rotate-45"></div>
        </div>
      </div>
      
      {/* Subtle texture background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none"></div>
    </motion.div>
  );
};

export default HeroBanner;
