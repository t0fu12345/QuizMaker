import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !e.target.checkValidity()) {
      setStatus('error');
      setMessage('Vui lòng nhập định dạng email học thuật hợp lệ.');
      return;
    }

    setStatus('submitting');
    
    setTimeout(() => {
      setStatus('success');
      setMessage('Kiểm tra hòm thư của bạn để lấy mã OTP tiếp tục bước 2.');
    }, 1200);
  };

  return (
    <div className="relative bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-xl shadow-[rgba(19,27,46,0.06)] overflow-hidden">
      {/* Subtle Scholarly Accent Glow */}
      <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-primary-fixed opacity-40 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-16 w-40 h-40 rounded-full bg-surface-variant opacity-60 blur-2xl pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col">
        {/* Back Navigation Link */}
        <Link to="/auth/login" className="inline-flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors mb-space-lg w-fit group">
          <span className="material-symbols-outlined text-[18px] transform group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
          <span>Quay lại Đăng nhập</span>
        </Link>
        
        {/* Academic Security Emblem Badge */}
        <div className="flex items-center justify-between mb-space-md">
          <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-[26px]">lock_reset</span>
          </div>
          <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span>Bước 1 / 3</span>
          </div>
        </div>
        
        {/* Heading & Academic Prompt */}
        <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight mb-space-xs">
          Khôi phục mật khẩu
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg">
          Nhập email đã đăng ký của bạn để nhận mã xác thực OTP 6 số bảo vệ tài khoản ScoreUp.
        </p>
        
        {/* Form Section */}
        <form className="flex flex-col gap-space-md" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="recovery-email">
                Email tài khoản
              </label>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Bắt buộc</span>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-space-md text-[20px] text-on-surface-variant pointer-events-none transition-colors">
                mail
              </span>
              <input 
                autoComplete="email" 
                className="w-full h-12 pl-11 pr-space-md bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-inner transition-all placeholder:text-outline" 
                id="recovery-email" 
                placeholder="exam_taker@scoreup.edu.vn" 
                required 
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
              />
            </div>
            {status === 'error' && (
              <span className="font-label-sm text-label-sm text-error">
                {message}
              </span>
            )}
            {status === 'success' && (
              <span className="font-label-sm text-label-sm text-primary">
                {message}
              </span>
            )}
          </div>
          
          {/* Academic Security Information Box */}
          <div className="bg-surface-container-low rounded-lg p-space-md flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-[20px] text-primary flex-shrink-0 mt-0.5">
              verified_user
            </span>
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">Chính sách bảo mật khảo thí</span>
              <p className="font-label-sm text-label-sm text-on-surface-variant leading-normal">
                Chúng tôi sẽ gửi một mã OTP có hiệu lực trong 5 phút tới hộp thư của bạn. Vui lòng không chia sẻ mã này cho bất kỳ ai.
              </p>
            </div>
          </div>
          
          {/* Submission CTA */}
          <button 
            className={`w-full h-12 mt-space-xs rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.99] transition-all flex items-center justify-center gap-space-sm group ${status === 'submitting' ? 'opacity-90' : ''}`} 
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
          >
            {status === 'submitting' ? (
              <>
                <span>Đang gửi mã...</span>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
              </>
            ) : status === 'success' ? (
              <>
                <span>Đã gửi mã thành công</span>
                <span className="material-symbols-outlined text-[18px]">
                  check
                </span>
              </>
            ) : (
              <>
                <span>Gửi mã xác nhận</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </>
            )}
          </button>
          
          {status === 'success' && (
            <Link to="/auth/verify-otp" className="w-full h-12 mt-2 rounded-full bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-high transition">
              Tiếp tục nhập OTP
            </Link>
          )}
        </form>
        
        {/* Institutional Support & Assistance Divider */}
        <div className="mt-space-lg pt-space-md flex flex-col items-center gap-space-xs text-center">
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            Cần hỗ trợ thêm về tài khoản học thuật?
          </p>
          <div className="flex items-center gap-space-md">
            <a className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:underline underline-offset-4 transition-all" href="#">
              <span className="material-symbols-outlined text-[15px]">headset_mic</span>
              <span>Liên hệ Quản trị viên</span>
            </a>
            <span className="text-outline-variant">•</span>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              Trung tâm trợ giúp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
