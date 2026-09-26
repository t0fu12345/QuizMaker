import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/auth';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = loginUser(identifier, password);
      setIsSubmitting(false);

      if (res.success) {
        navigate('/');
      } else {
        setErrorMessage(res.message);
      }
    }, 600);
  };

  const handleQuickFill = (demoEmail, demoPass) => {
    setIdentifier(demoEmail);
    setPassword(demoPass);
    setErrorMessage('');
  };

  return (
    <>
      <div className="bg-surface-container-lowest rounded-xl shadow-xl p-space-md sm:p-space-lg relative overflow-hidden transition-all duration-300">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-surface-variant/40 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-md shadow-primary/20 mb-space-sm group">
            <span className="font-headline-md text-headline-md font-bold tracking-tight">S</span>
          </div>
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-container-low text-on-surface-variant mb-space-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm">Cổng Học Viên • Academic Portal</span>
          </div>
          
          <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight mt-space-xs">
            Chào mừng trở lại!
          </h1>
          <p className="font-body-md text-on-surface-variant mt-1 text-sm max-w-sm">
            Đăng nhập để tiếp tục lộ trình ôn tập và luyện đề chuẩn hóa.
          </p>

          <div className="grid grid-cols-3 gap-space-sm w-full mt-space-md">
            <button className="h-11 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95" type="button">
              <svg aria-hidden="true" className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z" fill="#EA4335"></path>
                <path d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" fill="#4285F4"></path>
                <path d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.6 0 12s.6 3.7 1.6 5.6l3.7-2.9z" fill="#FBBC05"></path>
                <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z" fill="#34A853"></path>
              </svg>
              <span className="text-xs sm:text-sm">Google</span>
            </button>
            <button className="h-11 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95" type="button">
              <svg aria-hidden="true" className="w-4 h-4 fill-[#5865F2] shrink-0" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
              </svg>
              <span className="text-xs sm:text-sm">Discord</span>
            </button>
            <button className="h-11 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95" type="button">
              <svg aria-hidden="true" className="w-4 h-4 fill-[#FF4500] shrink-0" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.703zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"></path>
              </svg>
              <span className="text-xs sm:text-sm">Reddit</span>
            </button>
          </div>

          <div className="relative w-full my-space-md flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-surface-container-high"></div>
            </div>
            <span className="relative px-space-sm bg-surface-container-lowest font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Hoặc bằng tài khoản ScoreUp
            </span>
          </div>

          <form className="w-full text-left flex flex-col gap-space-md" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm flex items-start gap-2 animate-in fade-in duration-200">
                <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface flex items-center justify-between" htmlFor="usernameInput">
                <span>Email hoặc tên đăng nhập</span>
                <span className="font-label-sm text-label-sm text-primary font-normal">Bắt buộc</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none transition-colors">
                  mail
                </span>
                <input 
                  className="w-full h-12 pl-10 pr-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-sm transition" 
                  id="usernameInput" 
                  placeholder="exam_taker@scoreup.edu.vn hoặc admin" 
                  required 
                  type="text" 
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="passwordInput">
                  Mật khẩu
                </label>
                <Link className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors" to="/auth/forgot-password">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none transition-colors">
                  lock
                </span>
                <input 
                  className="w-full h-12 pl-10 pr-11 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-sm transition" 
                  id="passwordInput" 
                  placeholder="••••••••••••" 
                  required 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                />
                <button 
                  aria-label="Ẩn hiện mật khẩu" 
                  className="absolute right-3 p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition flex items-center justify-center focus:outline-none" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                <input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary bg-surface-container-low border-0 cursor-pointer transition" id="rememberMe" type="checkbox" />
                <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Ghi nhớ đăng nhập
                </span>
              </label>
              <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[15px] text-tertiary">verified_user</span>
                <span>Mã hóa SSL 256-bit</span>
              </div>
            </div>

            <button 
              className={`w-full h-12 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.99] transition duration-200 mt-2 ${isSubmitting ? 'opacity-90' : ''}`}
              disabled={isSubmitting} 
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <>
                  <span>Đăng nhập</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>

            {/* Quick Demo Fill Helper */}
            <div className="mt-2 p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-1.5">
              <span className="text-[11px] font-medium text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">tips_and_updates</span>
                Tài khoản dùng thử có sẵn:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickFill('exam_taker@scoreup.edu.vn', 'Password123!')}
                  className="text-[11px] py-1 px-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition font-medium"
                >
                  🎓 Học viên: <span className="text-primary font-normal">exam_taker@scoreup.edu.vn</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin', 'Password123!')}
                  className="text-[11px] py-1 px-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition font-medium"
                >
                  🛡️ Admin: <span className="text-primary font-normal">admin</span>
                </button>
              </div>
            </div>
          </form>

          <div className="w-full mt-space-md p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
              <div className="text-left">
                <p className="font-label-sm text-label-sm text-on-surface font-semibold">Kỳ thi Đánh giá Năng lực 2025</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Hơn 450+ đề luyện thi đã được cập nhật</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
              Mới
            </span>
          </div>

          <div className="mt-space-lg text-center">
            <p className="font-label-md text-label-md text-on-surface-variant">
              Chưa có tài khoản?
              <Link className="text-primary hover:text-primary-container font-semibold transition ml-1 inline-flex items-center gap-0.5 group" to="/auth/register">
                <span>Đăng ký ngay</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
