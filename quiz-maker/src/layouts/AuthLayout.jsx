import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col justify-between selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Header */}
      <header className="w-full max-w-[800px] mx-auto px-margin pt-space-lg flex items-center justify-between">
        <Link to="/" className="flex items-center gap-space-sm group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <span className="material-symbols-outlined text-[18px]">school</span>
          </div>
          <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">ScoreUp</span>
        </Link>
        <div className="flex items-center gap-space-sm">
          <button className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button">
            <span className="material-symbols-outlined text-[16px]">language</span>
            <span>EN</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-margin py-stack-lg">
        <div className="w-full max-w-[480px]">
          <div className="flex flex-col w-full">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[800px] mx-auto px-margin pb-space-lg pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
        <p>© 2025 ScoreUp Academic Platforms. All rights reserved.</p>
        <div className="flex items-center gap-space-md">
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-primary transition-colors" href="#">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
