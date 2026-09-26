import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(45);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const otpRefs = useRef([]);

  useEffect(() => {
    let timer = null;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.charAt(value.length - 1);
    }
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl shadow-md p-space-md sm:p-space-lg">
      <div className="flex items-center justify-between mb-space-md">
        <Link className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" to="/auth/forgot-password">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Đổi email nhận mã</span>
        </Link>
        <span className="inline-flex items-center px-space-sm py-space-xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
          Bước 2 / 2
        </span>
      </div>
      
      <div className="flex items-center gap-space-md mb-space-md">
        <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface">Nhập mã xác thực</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Mã 6 chữ số đã gửi tới{' '}
            <span className="inline-block px-1.5 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-primary">exam***@scoreup.edu.vn</span>
          </p>
        </div>
      </div>
      
      {/* OTP Input Group */}
      <div className="my-space-md">
        <div className="flex justify-between items-center gap-space-xs sm:gap-space-sm" id="otp-container">
          {otp.map((digit, index) => (
            <input 
              key={index}
              ref={el => otpRefs.current[index] = el}
              aria-label={`Ký tự OTP ${index + 1}`} 
              className={`w-12 h-12 sm:w-14 sm:h-14 text-center font-headline-md text-headline-md rounded-lg focus:outline-none focus:shadow-sm transition-colors ${digit ? 'text-primary bg-surface-container-lowest shadow-sm ring-1 ring-primary/20' : 'text-on-surface bg-surface-container-low focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary'}`} 
              maxLength={1} 
              type="text" 
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-space-xs mt-space-sm font-label-sm text-label-sm text-on-surface-variant">
          <span>Chưa nhận được mã?</span>
          {countdown > 0 ? (
            <>
              <span className="text-on-surface-variant">Gửi lại mã sau</span>
              <span className="font-label-md text-label-md text-primary">
                00:{countdown < 10 ? `0${countdown}` : countdown}
              </span>
            </>
          ) : (
            <button 
              type="button" 
              className="font-label-md text-label-md text-primary hover:underline"
              onClick={() => setCountdown(45)}
            >
              Gửi lại mã
            </button>
          )}
        </div>
      </div>
      
      {/* Tonal Separator */}
      <div className="h-px bg-surface-container my-space-lg w-full"></div>
      
      {/* New Password Section */}
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Thiết lập mật khẩu mới</span>
          <span className="font-label-sm text-label-sm text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">shield</span> Bảo mật cao
          </span>
        </div>
        
        {/* Password Input */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="new-password">Mật khẩu mới</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-space-sm text-on-surface-variant text-[20px] pointer-events-none">lock</span>
            <input 
              className="w-full h-10 pl-10 pr-10 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm transition-all" 
              id="new-password" 
              placeholder="Nhập mật khẩu mới" 
              type={showNewPassword ? "text" : "password"} 
              defaultValue="ScoreUp#2025" 
            />
            <button 
              aria-label="Hiển thị mật khẩu" 
              className="absolute right-space-sm text-on-surface-variant hover:text-on-surface transition-colors" 
              onClick={() => setShowNewPassword(!showNewPassword)} 
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showNewPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>
        
        {/* Confirm Password Input */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="confirm-password">Xác nhận mật khẩu</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-space-sm text-on-surface-variant text-[20px] pointer-events-none">lock_clock</span>
            <input 
              className="w-full h-10 pl-10 pr-10 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm transition-all" 
              id="confirm-password" 
              placeholder="Nhập lại mật khẩu mới" 
              type={showConfirmPassword ? "text" : "password"} 
              defaultValue="ScoreUp#2025" 
            />
            <button 
              aria-label="Hiển thị mật khẩu" 
              className="absolute right-space-sm text-on-surface-variant hover:text-on-surface transition-colors" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showConfirmPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>
        
        {/* Password Strength Indicator */}
        <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-space-xs">
          <div className="flex items-center justify-between font-label-sm text-label-sm">
            <span className="text-on-surface-variant">Độ mạnh mật khẩu:</span>
            <span className="text-primary font-label-md text-label-md">Rất mạnh</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden flex gap-1">
            <div className="flex-1 bg-primary rounded-full"></div>
            <div className="flex-1 bg-primary rounded-full"></div>
            <div className="flex-1 bg-primary rounded-full"></div>
            <div className="flex-1 bg-primary rounded-full"></div>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-space-sm mt-space-xs font-label-sm text-label-sm">
            <li className="flex items-center gap-1.5 text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span>Tối thiểu 8 ký tự</span>
            </li>
            <li className="flex items-center gap-1.5 text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span>Chữ hoa &amp; thường</span>
            </li>
            <li className="flex items-center gap-1.5 text-on-surface sm:col-span-2">
              <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span>Ít nhất 1 ký tự đặc biệt (@, #, !)</span>
            </li>
          </ul>
        </div>
        
        {/* Action Button */}
        <Link 
          className="w-full h-11 mt-space-xs bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-space-xs active:translate-y-0.5" 
          to="/auth/login"
        >
          <span>Đổi mật khẩu &amp; Đăng nhập</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
        <div className="flex items-center justify-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[14px]">support_agent</span>
          <span>Gặp sự cố đăng nhập?</span>
          <a className="text-primary hover:underline" href="#">Liên hệ quản trị viên</a>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
