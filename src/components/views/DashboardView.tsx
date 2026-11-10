import React from 'react';
import {
  Flame,
  Droplets,
  Timer,
  QrCode,
  Calendar,
  CreditCard,
  Plus,
  Play,
  ArrowRight,
  MapPin,
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';
import { UserProfile, WorkoutRoutine, Language, MaduraiBranch } from '../../types/wfit';
import { I18N } from '../../data/mockData';
import { ProgressRing } from '../ProgressRing';
import { GYM_IMAGES } from '../../assets/images';

interface DashboardViewProps {
  user: UserProfile;
  lang: Language;
  onOpenQr: () => void;
  onNavigateTab: (tab: string) => void;
  onStartWorkout: (workout: WorkoutRoutine) => void;
  onQuickLogWater: () => void;
  onOpenPayment: () => void;
  todayWorkout: WorkoutRoutine;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  lang,
  onOpenQr,
  onNavigateTab,
  onStartWorkout,
  onQuickLogWater,
  onOpenPayment,
  todayWorkout
}) => {
  const t = I18N[lang];

  const calProgress = Math.round((user.caloriesBurned / user.caloriesGoal) * 100);
  const waterProgress = Math.round((user.waterIntakeMl / user.waterGoalMl) * 100);
  const workoutProgress = Math.round((user.activeWorkoutMinutes / user.workoutGoalMinutes) * 100);

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Header Greeting & Branch Location */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#B2DF10] font-semibold tracking-wider uppercase">
              {t.greeting}!
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-white/60 flex items-center gap-1 font-medium">
              <MapPin size={12} className="text-[#B2DF10]" />
              {user.branch} Club
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
            {user.name}
          </h2>
        </div>

        {/* Quick QR Entry Pass Button */}
        <button
          onClick={onOpenQr}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#26291F] border border-[#B2DF10]/30 hover:border-[#B2DF10] text-white hover:text-[#B2DF10] transition-all cursor-pointer shadow-sm group"
        >
          <div className="p-1 rounded-lg bg-[#B2DF10] text-[#10110D] group-hover:scale-105 transition-transform">
            <QrCode size={16} />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold leading-tight">Turnstile Pass</span>
            <span className="block text-[10px] text-white/50 leading-tight">Scan to Enter</span>
          </div>
        </button>
      </section>

      {/* 2. Streak & Active Membership Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Streak Card */}
        <div className="p-4 rounded-2xl bg-[#26291F] border border-white/5 flex items-center gap-3.5 relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-[#B2DF10]/15 border border-[#B2DF10]/30 flex items-center justify-center text-[#B2DF10] shrink-0">
            <Flame size={24} className="fill-[#B2DF10]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-white">
                {user.streakDays} {t.streak}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#B2DF10] text-[#10110D]">
                HOT
              </span>
            </div>
            <p className="text-xs text-white/60 mt-0.5 leading-snug">
              {t.streakDesc}
            </p>
          </div>
        </div>

        {/* Membership Status Card */}
        <div className="md:col-span-2 p-4 rounded-2xl bg-[#26291F] border border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 relative overflow-hidden">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#10110D] bg-[#B2DF10] px-2 py-0.5 rounded-full uppercase tracking-wider">
                {t.membershipActive}
              </span>
              <span className="text-xs text-white/60">
                {user.membershipPlan}
              </span>
            </div>
            <p className="text-xs text-white/70">
              Valid until <span className="text-white font-semibold">{user.membershipExpiry}</span> ({t.membershipRenews})
            </p>
          </div>

          <button
            onClick={onOpenPayment}
            className="self-start sm:self-center px-4 py-2 rounded-xl btn-wfit-primary text-xs font-semibold cursor-pointer shadow-md"
          >
            {t.quickPayment}
          </button>
        </div>
      </section>

      {/* 3. Daily Goals & Animated Progress Rings */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-tight">
            Today's Target Rings
          </h3>
          <span className="text-xs text-[#D1EF51] font-semibold">
            {Math.round((calProgress + waterProgress + workoutProgress) / 3)}% Overall Goal
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Calories Ring Card */}
          <div className="p-4 rounded-2xl bg-[#26291F] border border-white/5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-white/60 flex items-center gap-1 font-medium">
                <Flame size={13} className="text-[#B2DF10]" />
                {t.burnMetric}
              </span>
              <div className="text-xl font-bold text-white tabular-nums">
                {user.caloriesBurned}{' '}
                <span className="text-xs font-normal text-white/50">/ {user.caloriesGoal} kcal</span>
              </div>
              <span className="text-[11px] text-[#D1EF51] font-medium block">
                {calProgress}% completed
              </span>
            </div>
            <ProgressRing
              radius={38}
              strokeWidth={6}
              progress={calProgress}
              label={`${calProgress}%`}
            />
          </div>

          {/* Water Intake Ring Card */}
          <div className="p-4 rounded-2xl bg-[#26291F] border border-white/5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-white/60 flex items-center gap-1 font-medium">
                <Droplets size={13} className="text-[#B2DF10]" />
                {t.waterMetric}
              </span>
              <div className="text-xl font-bold text-white tabular-nums">
                {(user.waterIntakeMl / 1000).toFixed(1)}{' '}
                <span className="text-xs font-normal text-white/50">/ {(user.waterGoalMl / 1000).toFixed(1)} L</span>
              </div>
              <button
                onClick={onQuickLogWater}
                className="text-[11px] font-semibold text-[#B2DF10] hover:text-[#D1EF51] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus size={12} />
                <span>Add 250ml</span>
              </button>
            </div>
            <ProgressRing
              radius={38}
              strokeWidth={6}
              progress={waterProgress}
              label={`${waterProgress}%`}
            />
          </div>

          {/* Active Workout Time Ring Card */}
          <div className="p-4 rounded-2xl bg-[#26291F] border border-white/5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-white/60 flex items-center gap-1 font-medium">
                <Timer size={13} className="text-[#B2DF10]" />
                {t.workoutMetric}
              </span>
              <div className="text-xl font-bold text-white tabular-nums">
                {user.activeWorkoutMinutes}{' '}
                <span className="text-xs font-normal text-white/50">/ {user.workoutGoalMinutes} min</span>
              </div>
              <span className="text-[11px] text-[#D1EF51] font-medium block">
                {workoutProgress}% of daily goal
              </span>
            </div>
            <ProgressRing
              radius={38}
              strokeWidth={6}
              progress={workoutProgress}
              label={`${workoutProgress}%`}
            />
          </div>
        </div>
      </section>

      {/* 4. Quick Action Buttons Row */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={onOpenQr}
          className="p-3 rounded-xl bg-[#26291F] border border-white/5 hover:border-[#B2DF10]/50 flex items-center gap-2.5 transition-all text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#10110D] flex items-center justify-center text-[#B2DF10] group-hover:bg-[#B2DF10] group-hover:text-[#10110D] transition-colors">
            <QrCode size={16} />
          </div>
          <div>
            <span className="block text-xs font-bold text-white leading-tight">{t.quickQrCheckIn}</span>
            <span className="block text-[10px] text-white/50">Entry Gate</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('classes')}
          className="p-3 rounded-xl bg-[#26291F] border border-white/5 hover:border-[#B2DF10]/50 flex items-center gap-2.5 transition-all text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#10110D] flex items-center justify-center text-[#B2DF10] group-hover:bg-[#B2DF10] group-hover:text-[#10110D] transition-colors">
            <Calendar size={16} />
          </div>
          <div>
            <span className="block text-xs font-bold text-white leading-tight">{t.quickBookClass}</span>
            <span className="block text-[10px] text-white/50">CrossFit & Yoga</span>
          </div>
        </button>

        <button
          onClick={onQuickLogWater}
          className="p-3 rounded-xl bg-[#26291F] border border-white/5 hover:border-[#B2DF10]/50 flex items-center gap-2.5 transition-all text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#10110D] flex items-center justify-center text-[#B2DF10] group-hover:bg-[#B2DF10] group-hover:text-[#10110D] transition-colors">
            <Droplets size={16} />
          </div>
          <div>
            <span className="block text-xs font-bold text-white leading-tight">{t.quickLogWater}</span>
            <span className="block text-[10px] text-white/50">+250 ml Hydro</span>
          </div>
        </button>

        <button
          onClick={onOpenPayment}
          className="p-3 rounded-xl bg-[#26291F] border border-white/5 hover:border-[#B2DF10]/50 flex items-center gap-2.5 transition-all text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#10110D] flex items-center justify-center text-[#B2DF10] group-hover:bg-[#B2DF10] group-hover:text-[#10110D] transition-colors">
            <CreditCard size={16} />
          </div>
          <div>
            <span className="block text-xs font-bold text-white leading-tight">UPI Renewal</span>
            <span className="block text-[10px] text-white/50">Instant GPay</span>
          </div>
        </button>
      </section>

      {/* 5. Today's Workout Hero Spotlight */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-tight">
            {t.todayWorkoutHeader}
          </h3>
          <button
            onClick={() => onNavigateTab('workouts')}
            className="text-xs text-[#B2DF10] hover:text-[#D1EF51] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{t.viewAllWorkouts}</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="rounded-2xl bg-[#26291F] border border-white/10 overflow-hidden relative">
          <div className="relative h-44 sm:h-52 w-full overflow-hidden">
            <img
              src={GYM_IMAGES.strengthFeature}
              alt="Gym workout"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#26291F] via-[#26291F]/40 to-transparent" />

            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#B2DF10] text-[#10110D] uppercase tracking-wider">
                  {todayWorkout.category}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {lang === 'ta' ? todayWorkout.titleTa : todayWorkout.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-white/70 mt-1">
                  <span>{todayWorkout.durationMinutes} mins</span>
                  <span>·</span>
                  <span>{todayWorkout.exercises.length} Exercises</span>
                  <span>·</span>
                  <span className="text-[#D1EF51] font-semibold">~{todayWorkout.caloriesEstimate} kcal</span>
                </div>
              </div>

              <button
                onClick={() => onStartWorkout(todayWorkout)}
                className="px-4 py-2.5 rounded-xl btn-wfit-primary text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0"
              >
                <Play size={14} className="fill-[#10110D]" />
                <span>{t.startWorkout}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Madurai Centers & Facilities Showcase */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          {t.branchesTitle}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#26291F] border border-white/5 space-y-2">
            <img
              src={GYM_IMAGES.gymInterior}
              alt="KK Nagar Club"
              className="w-full h-28 rounded-xl object-cover"
            />
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">KK Nagar Club</h4>
                <span className="text-[10px] text-[#B2DF10] font-semibold">Flagship</span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                80-feet Road · Heavy Strength Arena · InBody 570
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#26291F] border border-white/5 space-y-2">
            <img
              src={GYM_IMAGES.featuredCableMachine}
              alt="Anna Nagar Club"
              className="w-full h-28 rounded-xl object-cover"
            />
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Anna Nagar Club</h4>
                <span className="text-[10px] text-[#D1EF51] font-semibold">HIIT Studio</span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Kuruvikaran Salai · Turf Sprint Track · Steam Spa
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#26291F] border border-white/5 space-y-2">
            <img
              src={GYM_IMAGES.cardioFeature}
              alt="Bypass Road Club"
              className="w-full h-28 rounded-xl object-cover"
            />
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Bypass Road Club</h4>
                <span className="text-[10px] text-white/60 font-semibold">Cardio Hub</span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Kalavasal Junction · Spinning Studio · Recovery
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
