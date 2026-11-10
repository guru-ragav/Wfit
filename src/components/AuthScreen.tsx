import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AuthScreenProps {
  onSuccess: (userData: { name: string; phone: string; email: string }) => void;
  onBack: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, onBack }) => {
  const [authMode, setAuthMode] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('9842176540');
  const [otpStep, setOtpStep] = useState<'input' | 'otp'>('input');
  const [otpCode, setOtpCode] = useState(['8', '9', '2', '1']);
  const [email, setEmail] = useState('saravanan.p@wfitmadurai.in');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Saravanan Pandian');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      name: name || 'WFIT Madurai Member',
      phone: `+91 ${phone}`,
      email: email || `${phone}@wfitmadurai.in`
    });
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      name: name || 'Saravanan Pandian',
      phone: `+91 ${phone}`,
      email: email
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#10110D] text-white flex flex-col justify-between p-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-[#26291F] hover:bg-[#323629] text-white/80 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <BrandLogo size="sm" />
        <div className="w-9" /> {/* balance spacing */}
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-[#26291F] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {otpStep === 'otp' ? 'Enter 4-Digit Code' : 'Member Access'}
            </h2>
            <p className="text-xs text-white/60 mt-1">
              {otpStep === 'otp'
                ? `Sent via SMS to +91 ${phone}`
                : 'Access your workouts, club entry QR & trainer sessions'}
            </p>
          </div>

          {/* Toggle between Phone OTP and Email */}
          {otpStep !== 'otp' && (
            <div className="grid grid-cols-2 p-1 bg-[#10110D] rounded-xl border border-white/5 mb-6 text-xs">
              <button
                type="button"
                onClick={() => setAuthMode('phone')}
                className={`py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  authMode === 'phone'
                    ? 'bg-[#B2DF10] text-[#10110D]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Phone size={13} />
                <span>Phone OTP</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('email')}
                className={`py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  authMode === 'email'
                    ? 'bg-[#B2DF10] text-[#10110D]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Mail size={13} />
                <span>Email Sign-in</span>
              </button>
            </div>
          )}

          {/* Phone Input Form */}
          {authMode === 'phone' && otpStep === 'input' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#10110D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B2DF10]"
                  placeholder="Your Full Name"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <div className="bg-[#10110D] border border-white/10 rounded-xl px-3 py-3 text-sm text-white font-medium flex items-center gap-1">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-[#10110D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B2DF10]"
                    placeholder="98421 76540"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl btn-wfit-primary text-sm font-semibold cursor-pointer mt-2"
              >
                Get One-Time Password (OTP)
              </button>
            </form>
          )}

          {/* OTP Verification Form */}
          {authMode === 'phone' && otpStep === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center gap-3">
                {otpCode.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newCode = [...otpCode];
                      newCode[i] = e.target.value;
                      setOtpCode(newCode);
                    }}
                    className="w-14 h-14 bg-[#10110D] border-2 border-[#B2DF10]/50 rounded-xl text-center text-xl font-bold font-mono text-white focus:outline-none focus:border-[#B2DF10]"
                  />
                ))}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setOtpStep('input')}
                  className="text-xs text-white/50 hover:text-white underline cursor-pointer"
                >
                  Change phone number (+91 {phone})
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl btn-wfit-primary text-sm font-semibold cursor-pointer"
              >
                Verify & Enter Gym Portal
              </button>
            </form>
          )}

          {/* Email Sign In */}
          {authMode === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#10110D] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#B2DF10]"
                    placeholder="saravanan@wfitmadurai.in"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-white/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#10110D] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#B2DF10]"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl btn-wfit-primary text-sm font-semibold cursor-pointer mt-2"
              >
                Sign In With Password
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-white/40 py-2">
        <span>Madurai Fitness Hub · KK Nagar · Anna Nagar · Bypass Road</span>
      </footer>
    </div>
  );
};
