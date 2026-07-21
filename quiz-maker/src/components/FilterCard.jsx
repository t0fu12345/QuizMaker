import React from 'react';
import { Filter } from 'lucide-react';

const FilterCard = ({ onOpenFilter }) => {
  return (
    <div className="mt-8 rounded-[24px] bg-slate-800/40 backdrop-blur-md border border-white/10 p-16 flex flex-col items-center justify-center text-center shadow-xl">
      <h2 className="text-white text-3xl font-bold mb-4 tracking-tight">
        Trước hết, hãy cho chúng tôi biết thêm về bạn!
      </h2>
      <p className="text-slate-300 text-lg mb-8">
        Mở bộ lọc và chọn nội dung học bạn muốn!
      </p>
      
      <button 
        onClick={onOpenFilter}
        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
      >
        <Filter size={24} />
        Mở bộ lọc
      </button>
    </div>
  );
};

export default FilterCard;
