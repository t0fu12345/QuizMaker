import React from 'react';

const ThemeToggle = ({ isLightMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`relative w-[68px] h-[34px] rounded-full overflow-hidden transition-colors duration-500 border-2 shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 flex-shrink-0
        ${isLightMode 
          ? 'bg-[#6ebff3] border-[#55a8e0]' 
          : 'bg-[#292d3e] border-[#1d212d]'}`}
      aria-label="Toggle theme"
    >
      {/* --- Dark Mode Background (Stars) --- */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 flex items-center ${isLightMode ? 'opacity-0' : 'opacity-100'}`}
      >
        <svg width="30" height="30" viewBox="0 0 100 100" className="absolute left-1 top-1.5 opacity-80">
          <path d="M 15,35 Q 25,35 25,25 Q 25,35 35,35 Q 25,35 25,45 Q 25,35 15,35 Z" fill="white" />
          <path d="M 40,20 Q 45,20 45,15 Q 45,20 50,20 Q 45,20 45,25 Q 45,20 40,20 Z" fill="white" />
          <path d="M 35,55 Q 40,55 40,50 Q 40,55 45,55 Q 40,55 40,60 Q 40,55 35,55 Z" fill="white" />
        </svg>
      </div>

      {/* --- Light Mode Background (Clouds) --- */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${isLightMode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <svg width="40" height="30" viewBox="0 0 100 100" className="absolute right-0 bottom-0 opacity-90">
          {/* Cloud base */}
          <circle cx="80" cy="80" r="20" fill="white" />
          <circle cx="50" cy="85" r="15" fill="white" />
          <circle cx="25" cy="90" r="10" fill="white" />
          <rect x="25" y="75" width="55" height="25" fill="white" />
        </svg>
      </div>

      {/* --- The Thumb (Sun / Moon) --- */}
      <div 
        className={`absolute top-0.5 left-0.5 w-[26px] h-[26px] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center overflow-hidden
          ${isLightMode 
            ? 'translate-x-0 bg-[#FFD43B] border border-[#E5A814] shadow-[inset_0_-2px_4px_rgba(200,120,0,0.3)]' 
            : 'translate-x-[34px] bg-[#c4c9d4] border border-[#9fa6b7] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]'}`}
      >
        {/* Moon Craters (Only visible in dark mode) */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${isLightMode ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute bottom-[4px] left-[3px] w-[8px] h-[8px] rounded-full bg-[#939aab] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"></div>
          <div className="absolute top-[3px] right-[4px] w-[5px] h-[5px] rounded-full bg-[#939aab] shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]"></div>
          <div className="absolute top-[10px] right-[2px] w-[3px] h-[3px] rounded-full bg-[#939aab] shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]"></div>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
