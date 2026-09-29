import React from 'react';
import { Filter } from 'lucide-react';
import { m } from 'motion/react';

const FilterCard = ({ onOpenFilter }) => {
  return (
    <m.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="mt-6 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 p-10 md:p-14 flex flex-col items-center justify-center text-center shadow-sm dark:shadow-xl transition-colors"
    >
      <h2 className="text-slate-900 dark:text-zinc-50 text-2xl md:text-3xl font-bold mb-3 tracking-tight max-w-lg leading-tight transition-colors">
        Bạn muốn tập trung vào nội dung nào hôm nay?
      </h2>
      <p className="text-slate-600 dark:text-zinc-400 text-base md:text-lg mb-8 max-w-md transition-colors">
        Thiết lập bộ lọc để chọn môn học và độ dài bài tập phù hợp với bạn.
      </p>
      
      <button 
        onClick={onOpenFilter}
        className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-zinc-950 px-7 py-3.5 rounded-lg font-bold text-base transition duration-200 active:scale-[0.98] shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500 cursor-pointer"
      >
        <Filter size={18} strokeWidth={2.5} />
        Thiết lập bài tập
      </button>
    </m.div>
  );
};

export default FilterCard;
