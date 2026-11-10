import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MapPin, QrCode, Clock, ShieldCheck } from 'lucide-react';
import { UserProfile, MaduraiBranch, Language } from '../types/wfit';
import { I18N } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

interface QrCheckInModalProps {
  user: UserProfile;
  lang: Language;
  onClose: () => void;
  onCheckInSuccess: (branch: MaduraiBranch) => void;
}

export const QrCheckInModal: React.FC<QrCheckInModalProps> = ({
  user,
  lang,
  onClose,
  onCheckInSuccess
}) => {
  const t = I18N[lang];
  const [selectedBranch, setSelectedBranch] = useState<MaduraiBranch>(user.branch);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [hasScanned, setHasScanned] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateScan = () => {
    setHasScanned(true);
    setTimeout(() => {
      onCheckInSuccess(selectedBranch);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#26291F] border border-[#B2DF10]/30 shadow-2xl p-6 text-white overflow-hidden">
        {/* Glow accent in background */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#B2DF10]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <BrandLogo size="sm" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {hasScanned ? (
          <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#B2DF10]/20 border border-[#B2DF10] flex items-center justify-center text-[#B2DF10] animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Access Granted!</h3>
              <p className="text-xs text-white/70 mt-1">
                Turnstile unlocked at {selectedBranch} branch
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#D1EF51]">
              Token: WF-GATE-{Math.floor(100000 + Math.random() * 900000)}
            </span>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="text-center">
              <h3 className="text-base font-bold text-white tracking-tight">
                {t.qrTitle}
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                {t.scanAtGate}
              </p>
            </div>

            {/* Branch selector */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#10110D] rounded-xl border border-white/5 text-xs">
              {(['KK Nagar', 'Anna Nagar', 'Bypass Road'] as MaduraiBranch[]).map((br) => (
                <button
                  key={br}
                  onClick={() => setSelectedBranch(br)}
                  className={`py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
                    selectedBranch === br
                      ? 'bg-[#B2DF10] text-[#10110D] font-bold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {br}
                </button>
              ))}
            </div>

            {/* Simulated Live QR Code Card */}
            <div className="relative p-5 bg-white rounded-xl flex flex-col items-center justify-center shadow-inner">
              <div className="relative p-2 border-2 border-dashed border-[#10110D]/30 rounded-lg">
                <svg
                  className="w-44 h-44 text-[#10110D]"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  {/* Outer corner boxes */}
                  <rect x="5" y="5" width="26" height="26" fill="#10110D" />
                  <rect x="9" y="9" width="18" height="18" fill="#FFFFFF" />
                  <rect x="13" y="13" width="10" height="10" fill="#10110D" />

                  <rect x="69" y="5" width="26" height="26" fill="#10110D" />
                  <rect x="73" y="9" width="18" height="18" fill="#FFFFFF" />
                  <rect x="77" y="13" width="10" height="10" fill="#10110D" />

                  <rect x="5" y="69" width="26" height="26" fill="#10110D" />
                  <rect x="9" y="73" width="18" height="18" fill="#FFFFFF" />
                  <rect x="13" y="77" width="10" height="10" fill="#10110D" />

                  {/* Matrix pattern elements */}
                  <rect x="36" y="8" width="6" height="6" />
                  <rect x="48" y="14" width="6" height="6" />
                  <rect x="56" y="8" width="6" height="6" />
                  <rect x="36" y="22" width="6" height="6" />
                  <rect x="44" y="26" width="8" height="6" />
                  <rect x="58" y="24" width="6" height="6" />

                  <rect x="12" y="38" width="6" height="6" />
                  <rect x="22" y="44" width="8" height="6" />
                  <rect x="36" y="40" width="10" height="6" />
                  <rect x="50" y="38" width="8" height="8" />
                  <rect x="64" y="42" width="6" height="6" />
                  <rect x="76" y="38" width="12" height="6" />

                  <rect x="8" y="52" width="12" height="6" />
                  <rect x="26" y="56" width="6" height="8" />
                  <rect x="38" y="52" width="6" height="6" />
                  <rect x="50" y="54" width="14" height="6" />
                  <rect x="70" y="54" width="6" height="6" />
                  <rect x="82" y="50" width="8" height="8" />

                  <rect x="38" y="68" width="8" height="6" />
                  <rect x="52" y="68" width="8" height="8" />
                  <rect x="68" y="68" width="8" height="6" />
                  <rect x="82" y="74" width="10" height="6" />
                  <rect x="42" y="82" width="14" height="8" />
                  <rect x="64" y="84" width="8" height="6" />
                  <rect x="78" y="86" width="8" height="6" />

                  {/* Center WFIT badge overlay */}
                  <circle cx="50" cy="50" r="10" fill="#B2DF10" />
                  <path
                    d="M50 46 c1 0 2 .5 2 2 c0 2 -2 3 -2 4 c0-1 -2-2 -2-4 c0-1.5 1-2 2-2 z"
                    fill="#10110D"
                  />
                </svg>

                {/* Animated laser scanner line */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-[#B2DF10] shadow-[0_0_8px_#B2DF10] animate-pulse" />
              </div>

              {/* Pass ID & Live Time */}
              <div className="mt-2 text-center">
                <span className="text-[12px] font-bold text-[#10110D] tracking-wider font-mono">
                  {user.id}
                </span>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-700 mt-0.5 font-medium">
                  <Clock size={12} className="text-[#10110D]" />
                  <span>{currentTime}</span>
                </div>
              </div>
            </div>

            {/* Member Card Details */}
            <div className="p-3 bg-[#10110D] rounded-xl border border-white/5 space-y-1 text-xs">
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/50">Member:</span>
                <span className="font-semibold text-white">{user.name}</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/50">Plan:</span>
                <span className="font-semibold text-[#D1EF51]">{user.membershipPlan}</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/50">Selected Gate:</span>
                <span className="font-medium flex items-center gap-1 text-white">
                  <MapPin size={12} className="text-[#B2DF10]" /> {selectedBranch} Branch
                </span>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={handleSimulateScan}
              className="w-full py-3 rounded-xl btn-wfit-primary text-sm flex items-center justify-center gap-2 cursor-pointer font-semibold"
            >
              <QrCode size={18} />
              Simulate Gate Scan & Check-in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
