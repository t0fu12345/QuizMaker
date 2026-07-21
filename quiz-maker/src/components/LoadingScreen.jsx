import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start pt-20 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden">
      <div className="w-full max-w-5xl px-4 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-24 bg-slate-800 rounded-lg"></div>
          <div className="h-8 w-40 bg-slate-800 rounded-full"></div>
        </div>
        
        {/* Progress Bar Skeleton */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <div className="h-4 w-24 bg-slate-800 rounded"></div>
            <div className="h-4 w-12 bg-slate-800 rounded"></div>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full"></div>
        </div>

        {/* Questions Skeleton (2 items) */}
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-slate-800/40 border border-white/5 p-6 rounded-2xl">
              <div className="h-6 w-3/4 bg-slate-700/50 rounded mb-6"></div>
              
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-14 w-full bg-slate-800/50 rounded-xl border border-white/5"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
