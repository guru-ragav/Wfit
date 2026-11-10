import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  Bell,
  LogOut,
  QrCode,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award
} from 'lucide-react';
import { UserProfile, MaduraiBranch, Language, CheckInLog } from '../../types/wfit';
import { I18N } from '../../data/mockData';
import { BrandLogo } from '../BrandLogo';

interface ProfileViewProps {
  user: UserProfile;
  lang: Language;
  checkIns: CheckInLog[];
  onUpdateBranch: (branch: MaduraiBranch) => void;
  onToggleLanguage: (lang: Language) => void;
  onLogout: () => void;
  onOpenQr: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  lang,
  checkIns,
  onUpdateBranch,
  onToggleLanguage,
  onLogout,
  onOpenQr
}) => {
  const t = I18N[lang];
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {t.profileHeader}
        </h2>
        <p className="text-xs text-white/60 mt-1">
          Manage your membership, home gym branch, language preference, and check-in history.
        </p>
      </div>

      {/* Member Identity Card */}
      <div className="p-6 rounded-3xl bg-[#26291F] border border-white/10 relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#10110D] border-2 border-[#B2DF10] flex items-center justify-center text-white font-extrabold text-xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B2DF10] text-[#10110D]">
                  PRO
                </span>
              </div>
              <p className="text-xs text-white/60 font-mono mt-0.5">
                Member ID: {user.id}
              </p>
              <p className="text-xs text-[#D1EF51] font-medium">
                {user.membershipPlan}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenQr}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl btn-wfit-primary text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <QrCode size={16} />
            <span>Show QR Gate Pass</span>
          </button>
        </div>

        {/* Contact Info details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-white/5 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-[#B2DF10]" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-[#B2DF10]" />
            <span>{user.email}</span>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Branch Preference */}
        <div className="p-5 rounded-2xl bg-[#26291F] border border-white/5 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#B2DF10]" />
            <h4 className="text-sm font-bold text-white">{t.switchBranch}</h4>
          </div>
          <p className="text-xs text-white/60">
            Set your default check-in and trainer location in Madurai:
          </p>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            {(['KK Nagar', 'Anna Nagar', 'Bypass Road'] as MaduraiBranch[]).map((br) => (
              <button
                key={br}
                type="button"
                onClick={() => onUpdateBranch(br)}
                className={`py-2 px-1 rounded-xl text-center font-medium transition-all cursor-pointer ${
                  user.branch === br
                    ? 'bg-[#B2DF10] text-[#10110D] font-bold shadow-sm'
                    : 'bg-[#10110D] text-white/70 hover:text-white border border-white/5'
                }`}
              >
                {br}
              </button>
            ))}
          </div>
        </div>

        {/* Language Preference */}
        <div className="p-5 rounded-2xl bg-[#26291F] border border-white/5 space-y-3">
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-[#B2DF10]" />
            <h4 className="text-sm font-bold text-white">{t.languageToggle}</h4>
          </div>
          <p className="text-xs text-white/60">
            Switch UI labels and workout details between English & தமிழ்:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => onToggleLanguage('en')}
              className={`py-2 rounded-xl text-center font-semibold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#B2DF10] text-[#10110D]'
                  : 'bg-[#10110D] text-white/70 hover:text-white border border-white/5'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onToggleLanguage('ta')}
              className={`py-2 rounded-xl text-center font-semibold transition-all cursor-pointer ${
                lang === 'ta'
                  ? 'bg-[#B2DF10] text-[#10110D]'
                  : 'bg-[#10110D] text-white/70 hover:text-white border border-white/5'
              }`}
            >
              தமிழ் (Tamil)
            </button>
          </div>
        </div>
      </div>

      {/* Notifications toggle */}
      <div className="p-4 rounded-2xl bg-[#26291F] border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#10110D] flex items-center justify-center text-[#B2DF10]">
            <Bell size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{t.notifications}</h4>
            <span className="text-xs text-white/50">SMS class reminders & expiry alerts</span>
          </div>
        </div>

        <button
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
            notificationsEnabled ? 'bg-[#B2DF10]' : 'bg-white/20'
          }`}
        >
          <span
            className={`block w-5 h-5 rounded-full bg-[#10110D] transition-transform ${
              notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {/* Recent Check-In History Log */}
      <div className="p-5 rounded-2xl bg-[#26291F] border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#B2DF10]" />
            <h4 className="text-sm font-bold text-white">Recent Turnstile Check-Ins</h4>
          </div>
          <span className="text-xs font-semibold text-[#D1EF51]">
            {user.streakDays}-Day Attendance Active
          </span>
        </div>

        <div className="space-y-2 pt-1">
          {checkIns.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="p-2.5 rounded-xl bg-[#10110D] border border-white/5 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#B2DF10]" />
                <div>
                  <span className="font-semibold text-white">{log.branch} Gate</span>
                  <span className="text-white/40 block text-[11px]">{log.type}</span>
                </div>
              </div>
              <div className="text-right text-white/60">
                <span className="font-medium text-white">{log.date}</span>
                <span className="text-white/40 block text-[11px] font-mono">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout button */}
      <div className="pt-2">
        <button
          onClick={onLogout}
          className="w-full py-3.5 rounded-2xl bg-[#10110D] hover:bg-red-950/30 text-white/70 hover:text-red-400 border border-white/10 flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer transition-all"
        >
          <LogOut size={16} />
          <span>{t.logout}</span>
        </button>
      </div>
    </div>
  );
};
