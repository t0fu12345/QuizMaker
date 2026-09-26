import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/auth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const strength = useMemo(() => {
    if (!password) {
      return {
        score: 0,
        label: 'Chưa nhập mật khẩu',
        color: 'text-on-surface-variant',
        barColor: 'bg-surface-container-high',
        icon: 'lock',
        hint: 'Tối thiểu 8 ký tự'
      };
    }

    let checks = 0;
    if (password.length >= 8) checks += 1;
    if (password.length >= 12) checks += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) checks += 1;
    if (/\d/.test(password)) checks += 1;
    if (/[^A-Za-z0-9]/.test(password)) checks += 1;

    let score = 1;
    if (password.length < 6) {
      score = 1;
    } else if (checks <= 2) {
      score = 1;
    } else if (checks === 3) {
      score = 2;
    } else if (checks === 4) {
      score = 3;
    } else {
      score = 4;
    }

    switch (score) {
      case 1:
        return {
          score: 1,
          label: 'Mật khẩu yếu',
          color: 'text-error',
          barColor: 'bg-error',
          icon: 'cancel',
          hint: 'Nên thêm chữ hoa, số & ký tự đặc biệt'
        };
      case 2:
        return {
          score: 2,
          label: 'Mật khẩu trung bình',
          color: 'text-amber-500',
          barColor: 'bg-amber-500',
          icon: 'warning',
          hint: 'Thêm ký tự đặc biệt hoặc chữ hoa'
        };
      case 3:
        return {
          score: 3,
          label: 'Mật khẩu mạnh',
          color: 'text-primary',
          barColor: 'bg-primary',
          icon: 'check_circle',
          hint: 'Độ an toàn tốt'
        };
      case 4:
        return {
          score: 4,
          label: 'Mật khẩu rất mạnh',
          color: 'text-emerald-600 dark:text-emerald-400',
          barColor: 'bg-emerald-500',
          icon: 'verified',
          hint: 'Tối ưu bảo mật'
        };
      default:
        return {
          score: 0,
          label: 'Chưa nhập mật khẩu',
          color: 'text-on-surface-variant',
          barColor: 'bg-surface-container-high',
          icon: 'lock',
          hint: 'Tối thiểu 8 ký tự'
        };
    }
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Vui lòng nhập tên người dùng.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Vui lòng nhập email học tập.');
      return;
    }

    if (!password) {
      setErrorMessage('Vui lòng nhập mật khẩu.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = registerUser({ username, email, password });
      setIsSubmitting(false);

      if (res.success) {
        navigate('/');
      } else {
        setErrorMessage(res.message);
      }
    }, 600);
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl shadow-md p-space-lg sm:p-space-xl flex flex-col">
      {/* Brand / Header */}
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-display-lg text-headline-sm shadow-sm select-none">
          S
        </div>
        <span className="font-headline-sm text-headline-sm text-on-surface mt-space-xs tracking-tight">ScoreUp</span>
        <h1 className="font-headline-md text-headline-md text-on-surface mt-space-md tracking-tight">Tạo tài khoản mới</h1>
        <p className="font-body-md text-label-md text-on-surface-variant mt-space-xs">Bắt đầu hành trình nâng cao điểm số của bạn</p>
      </div>

      {/* Social Sign-up Grid */}
      <div className="grid grid-cols-3 gap-space-sm mt-space-lg">
        {/* Google */}
        <button className="h-11 px-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-sm sm:text-label-md flex items-center justify-center gap-space-xs transition-colors" type="button">
          <svg aria-hidden="true" className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
          </svg>
          <span>Google</span>
        </button>
        {/* Discord */}
        <button className="h-11 px-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-sm sm:text-label-md flex items-center justify-center gap-space-xs transition-colors" type="button">
          <svg aria-hidden="true" className="w-4 h-4 shrink-0 fill-current text-primary" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
          </svg>
          <span>Discord</span>
        </button>
        {/* Reddit */}
        <button className="h-11 px-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-sm sm:text-label-md flex items-center justify-center gap-space-xs transition-colors" type="button">
          <svg aria-hidden="true" className="w-4 h-4 shrink-0 fill-current text-primary-container" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.703zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"></path>
          </svg>
          <span>Reddit</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-space-lg">
        <div className="w-full h-px bg-surface-container-high"></div>
        <span className="absolute px-space-sm bg-surface-container-lowest font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
          Hoặc tiếp tục với email
        </span>
      </div>

      {/* Registration Form */}
      <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm flex items-start gap-2 animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Username */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="username">Tên người dùng</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-space-md text-on-surface-variant pointer-events-none text-[20px]">
              person
            </span>
            <input 
              className="w-full h-12 pl-11 pr-space-md rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none focus:bg-surface-container-low transition-colors" 
              id="username" 
              placeholder="scoreup_learner" 
              type="text" 
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email học tập</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-space-md text-on-surface-variant pointer-events-none text-[20px]">
              mail
            </span>
            <input 
              className="w-full h-12 pl-11 pr-space-md rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none focus:bg-surface-container-low transition-colors" 
              id="email" 
              placeholder="example@scoreup.edu.vn" 
              type="email" 
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Mật khẩu</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-space-md text-on-surface-variant pointer-events-none text-[20px]">
              lock
            </span>
            <input 
              className="w-full h-12 pl-11 pr-11 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none focus:bg-surface-container-low transition-colors" 
              id="password" 
              placeholder="••••••••••••" 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              aria-label="Ẩn hiện mật khẩu" 
              className="absolute right-space-md text-on-surface-variant hover:text-on-surface focus:outline-none" 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          <div className="flex flex-col gap-space-xs mt-space-xs">
            <div className="grid grid-cols-4 gap-space-xs w-full h-1.5">
              {[1, 2, 3, 4].map((index) => (
                <div 
                  key={index} 
                  className={`rounded-full h-full transition-all duration-300 ${
                    index <= strength.score ? strength.barColor : 'bg-surface-container-high'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className={`font-label-sm text-label-sm flex items-center gap-1 transition-colors duration-200 ${strength.color}`}>
                <span className="material-symbols-outlined text-[14px]">{strength.icon}</span>
                {strength.label}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant transition-colors duration-200">
                {strength.hint}
              </span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <label className="flex items-start gap-space-sm cursor-pointer select-none mt-space-xs">
          <div className="relative flex items-center justify-center shrink-0 mt-0.5">
            <input defaultChecked className="sr-only peer" id="terms" type="checkbox" />
            <div className="w-5 h-5 rounded bg-surface-container peer-checked:bg-primary transition-colors flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[16px] hidden peer-checked:block">check</span>
            </div>
          </div>
          <span className="font-body-md text-label-sm text-on-surface-variant leading-tight">
            Tôi đồng ý với{' '}
            <a className="text-primary hover:underline font-label-md" href="#">Điều khoản dịch vụ</a>
            {' '}&{' '}
            <a className="text-primary hover:underline font-label-md" href="#">Chính sách bảo mật</a>
          </span>
        </label>

        {/* Primary CTA */}
        <button 
          className={`h-12 w-full mt-space-sm rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-body-md shadow-md transition-colors flex items-center justify-center gap-space-xs ${isSubmitting ? 'opacity-90' : ''}`}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Đang xử lý...</span>
            </>
          ) : (
            <>
              <span>Đăng ký</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </button>
      </form>

      {/* Footer Redirect Link */}
      <div className="mt-space-lg text-center font-body-md text-label-md text-on-surface-variant">
        <span>Đã có tài khoản?</span>
        <Link className="text-primary font-label-md hover:underline ml-space-xs" to="/auth/login">Đăng nhập</Link>
      </div>
    </div>
  );
};

export default Register;
