import React, { useRef } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import BackToTopButton from '../components/BackToTopButton';

const DashboardLayout = () => {
  const scrollContainerRef = useRef(null);

  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <Header />
        <main ref={scrollContainerRef} className="flex-1 overflow-y-auto px-10 pb-10">
          <Outlet />
        </main>
      </div>
      
      {/* Background glow effects */}
      <div className="fixed top-0 left-[300px] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Back to Top Button */}
      <BackToTopButton scrollContainerRef={scrollContainerRef} />
    </div>
  );
};

export default DashboardLayout;
