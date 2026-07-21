import React from 'react';

const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#00a8ff]/90 via-[#00d2ff]/80 to-[#f9ca24]/90 p-10 flex items-center justify-between shadow-2xl shadow-[#00a8ff]/20">
      <div className="relative z-10">
        <h1 className="text-white text-4xl font-bold mb-3 tracking-tight drop-shadow-md">
          Xin chào, User!
        </h1>
        <p className="text-white/90 text-lg font-medium drop-shadow">
          Lướt xuống để bắt đầu luyện tập!
        </p>
      </div>
      
      {/* Cat Mascot Placeholder */}
      <div className="relative z-10 w-48 h-48 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
        <div className="w-32 h-32 bg-amber-500 rounded-full relative flex items-center justify-center">
           {/* Eyes */}
           <div className="absolute top-12 left-8 w-2 h-2 bg-slate-900 rounded-full"></div>
           <div className="absolute top-12 right-8 w-2 h-2 bg-slate-900 rounded-full"></div>
           {/* Mouth */}
           <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-slate-900 rounded-full"></div>
           {/* Headband */}
           <div className="absolute top-6 left-0 right-0 h-4 bg-green-500"></div>
           <div className="absolute top-4 right-[-10px] w-6 h-8 bg-green-500 rounded-full transform rotate-45"></div>
        </div>
      </div>
      
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default HeroBanner;
