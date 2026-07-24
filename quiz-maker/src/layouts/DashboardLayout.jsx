import React, { useRef } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import BackToTopButton from '../components/BackToTopButton';

const DashboardLayout = () => {
  const scrollContainerRef = useRef(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden relative">
        <Header />
        <main ref={scrollContainerRef} className="flex-1 overflow-y-auto px-10 pb-10">
          <Outlet />
        </main>
      </div>

      <BackToTopButton scrollContainerRef={scrollContainerRef} />
    </div>
  );
};

export default DashboardLayout;
