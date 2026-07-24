import React from 'react';
import { motion } from 'motion/react';

const LoadingScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-start pt-20 bg-zinc-950/80 backdrop-blur-md overflow-hidden"
    >
      <div className="w-full max-w-3xl px-4 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-24 bg-zinc-800 rounded-lg"></div>
          <div className="h-8 w-40 bg-zinc-800 rounded-full"></div>
        </div>
        
        {/* Progress Bar Skeleton */}
        <div className="mb-10">
          <div className="flex justify-between mb-3">
            <div className="h-4 w-24 bg-zinc-800 rounded"></div>
            <div className="h-4 w-12 bg-zinc-800 rounded"></div>
          </div>
          <div className="h-2 w-full bg-zinc-800 rounded-full"></div>
        </div>

        {/* Questions Skeleton (2 items) */}
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-zinc-900/50 border border-white/5 p-6 md:p-8 rounded-[24px]">
              <div className="h-6 w-3/4 bg-zinc-800 rounded mb-6"></div>
              
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-14 w-full bg-zinc-900 rounded-xl border border-white/5"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
