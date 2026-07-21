import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 flex flex-col items-center shadow-2xl">
        <Loader2 size={48} className="text-blue-500 animate-spin mb-6" />
        <h3 className="text-xl font-medium text-white mb-2">Đang tải bộ câu hỏi...</h3>
        <p className="text-slate-400 text-sm">Vui lòng đợi trong giây lát</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
