import React from 'react';
import { Home, Dumbbell, Calendar, Utensils, Users, User, QrCode, Globe, TrendingUp } from 'lucide-react';
import { Language, MaduraiBranch } from '../types/wfit';
import { I18N } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

export type NavTab = 'dashboard' | 'workouts' | 'classes' | 'diet' | 'progress' | 'trainers' | 'membership' | 'profile';

interface AppNavigationProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  lang: Language;
  onToggleLang: () => void;
  branch: MaduraiBranch;
  onOpenQr: () => void;
}

export const AppNavigation: React.FC<AppNavigationProps> = ({
  currentTab,
  onTabChange,
  lang,
  onToggleLang,
  branch,
  onOpenQr
}) => {
  const t = I18N[lang];

  const primaryTabs: { id: NavTab; label: string; icon: any }[] = [
    { id: 'dashboard', label: t.tabDashboard, icon: Home },
    { id: 'workouts', label: t.tabWorkouts, icon: Dumbbell },
    { id: 'classes', label: t.tabClasses, icon: Calendar },
    { id: 'diet', label: t.tabDiet, icon: Utensils },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'profile', label: t.tabProfile, icon: User }
  ];

  const desktopTabs: { id: NavTab; label: string }[] = [
    { id: 'dashboard', label: t.tabDashboard },
    { id: 'workouts', label: t.tabWorkouts },
    { id: 'classes', label: t.tabClasses },
    { id: 'diet', label: t.tabDiet },
    { id: 'progress', label: 'Progress' },
    { id: 'trainers', label: t.tabTrainers },
    { id: 'membership', label: 'Plans' },
    { id: 'profile', label: t.tabProfile }
  ];

  return (
    <>
      {/* 1. Desktop & Mobile Top App Bar */}
      <header className="sticky top-0 z-30 w-full bg-[#10110D]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div
            onClick={() => onTabChange('dashboard')}
            className="cursor-pointer shrink-0"
          >
            <BrandLogo size="md" />
          </div>

          {/* Zone 2: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {desktopTabs.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#26291F] text-[#B2DF10] font-bold border border-[#B2DF10]/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Branch, Language Toggle, QR Pass Trigger) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language switch */}
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-lg bg-[#26291F] hover:bg-[#323629] text-xs font-semibold text-white/90 border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Toggle Language"
            >
              <Globe size={13} className="text-[#B2DF10]" />
              <span className="uppercase">{lang}</span>
            </button>

            {/* Quick QR entry button */}
            <button
              onClick={onOpenQr}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl btn-wfit-primary text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="QR Gate Pass"
            >
              <QrCode size={15} />
              <span className="hidden sm:inline">Club Pass</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Mobile Fixed Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#26291F]/95 backdrop-blur-md border-t border-white/10 pb-safe">
        <div className="grid grid-cols-6 items-center h-16 px-1">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all cursor-pointer relative ${
                  isActive ? 'text-[#B2DF10]' : 'text-white/50 hover:text-white/80'
                }`}
              >
                <Icon
                  size={20}
                  className={`transition-transform duration-200 ${
                    isActive ? 'scale-110' : ''
                  }`}
                />
                <span
                  className={`text-[9px] font-medium tracking-tight mt-1 truncate max-w-[50px] ${
                    isActive ? 'font-bold text-[#D1EF51]' : ''
                  }`}
                >
                  {tab.label}
                </span>

                {/* Subtle active dot */}
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#B2DF10]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
