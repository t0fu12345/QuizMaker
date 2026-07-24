import React from 'react';
import { Filter } from 'lucide-react';
import { motion } from 'motion/react';

const FilterCard = ({ onOpenFilter }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="mt-6 rounded-[24px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 p-12 md:p-16 flex flex-col items-center justify-center text-center shadow-sm dark:shadow-xl transition-colors"
    >
      <h2 className="text-slate-900 dark:text-zinc-50 text-2xl md:text-3xl font-bold mb-4 tracking-tight max-w-lg leading-tight transition-colors">
        Bạn muốn tập trung vào nội dung nào hôm nay?
      </h2>
      <p className="text-slate-600 dark:text-zinc-400 text-lg mb-8 max-w-md transition-colors">
        Thiết lập bộ lọc để chọn môn học và độ dài bài tập phù hợp với bạn.
      </p>
      
      <button 
        onClick={onOpenFilter}
        className="flex items-center gap-3 bg-blue-600 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-blue-700 dark:hover:bg-zinc-200 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
      >
        <Filter size={20} strokeWidth={2.5} />
        Thiết lập bài tập
      </button>
    </motion.div>
  );
};

export default FilterCard;
