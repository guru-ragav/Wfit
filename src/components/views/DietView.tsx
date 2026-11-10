import React from 'react';
import { Utensils, Droplets, CheckCircle2, Plus, Flame, Sparkles } from 'lucide-react';
import { NutritionMeal, Language, UserProfile } from '../../types/wfit';
import { I18N } from '../../data/mockData';

interface DietViewProps {
  meals: NutritionMeal[];
  user: UserProfile;
  lang: Language;
  onToggleMeal: (mealId: string) => void;
  onAddWater: (amountMl: number) => void;
}

export const DietView: React.FC<DietViewProps> = ({
  meals,
  user,
  lang,
  onToggleMeal,
  onAddWater
}) => {
  const t = I18N[lang];

  // Calculate consumed macros from completed meals
  const completedMeals = meals.filter((m) => m.isCompleted);
  const totalProtein = completedMeals.reduce((acc, m) => acc + m.proteinGrams, 0);
  const totalCarbs = completedMeals.reduce((acc, m) => acc + m.carbsGrams, 0);
  const totalFats = completedMeals.reduce((acc, m) => acc + m.fatGrams, 0);
  const totalCalories = completedMeals.reduce((acc, m) => acc + m.calories, 0);

  // Targets
  const targetProtein = 140; // g
  const targetCarbs = 200; // g
  const targetFats = 45; // g

  const proteinPct = Math.min(100, Math.round((totalProtein / targetProtein) * 100));
  const carbsPct = Math.min(100, Math.round((totalCarbs / targetCarbs) * 100));
  const fatsPct = Math.min(100, Math.round((totalFats / targetFats) * 100));

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {t.dietHeader}
        </h2>
        <p className="text-xs text-white/60 mt-1">
          Nutrient-dense Tamil Nadu athletic nutrition with high bioavailable protein.
        </p>
      </div>

      {/* 1. Macro Breakdown Card */}
      <div className="p-5 rounded-2xl bg-[#26291F] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              {t.macroBreakdown}
            </h3>
            <span className="text-xs text-white/60">
              {completedMeals.length} of {meals.length} meals logged today
            </span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-[#D1EF51] tabular-nums">
              {totalCalories}
            </span>
            <span className="text-xs text-white/50 block">/ 1,800 kcal</span>
          </div>
        </div>

        {/* Macro Bars */}
        <div className="space-y-3">
          {/* Protein */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/80 font-medium">{t.protein}</span>
              <span className="text-white font-mono font-bold">
                {totalProtein}g <span className="text-white/40">/ {targetProtein}g</span>
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#10110D] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#B2DF10] transition-all duration-500"
                style={{ width: `${proteinPct}%` }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/80 font-medium">{t.carbs}</span>
              <span className="text-white font-mono font-bold">
                {totalCarbs}g <span className="text-white/40">/ {targetCarbs}g</span>
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#10110D] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#D1EF51] transition-all duration-500"
                style={{ width: `${carbsPct}%` }}
              />
            </div>
          </div>

          {/* Fats */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/80 font-medium">{t.fats}</span>
              <span className="text-white font-mono font-bold">
                {totalFats}g <span className="text-white/40">/ {targetFats}g</span>
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#10110D] overflow-hidden">
              <div
                className="h-full rounded-full bg-white/40 transition-all duration-500"
                style={{ width: `${fatsPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hydration & Water Intake Tracker */}
      <div className="p-4 rounded-2xl bg-[#26291F] border border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#B2DF10]/15 flex items-center justify-center text-[#B2DF10]">
            <Droplets size={20} />
          </div>
          <div>
            <span className="text-xs text-white/60 block font-medium">Daily Hydration</span>
            <div className="text-lg font-bold text-white tabular-nums">
              {(user.waterIntakeMl / 1000).toFixed(2)} Liters{' '}
              <span className="text-xs font-normal text-white/50">/ {(user.waterGoalMl / 1000).toFixed(1)} L</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddWater(250)}
            className="px-3 py-2 rounded-xl bg-[#10110D] hover:bg-white/10 text-xs font-semibold text-white border border-white/10 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Plus size={13} className="text-[#B2DF10]" />
            <span>+250 ml</span>
          </button>
          <button
            onClick={() => onAddWater(500)}
            className="px-3 py-2 rounded-xl btn-wfit-primary text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus size={13} />
            <span>+500 ml</span>
          </button>
        </div>
      </div>

      {/* 3. Meals Timeline */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Today's South Indian Meal Plan
        </h3>

        {meals.map((meal) => (
          <div
            key={meal.id}
            className={`p-4 rounded-2xl bg-[#26291F] border transition-all ${
              meal.isCompleted
                ? 'border-[#B2DF10]/40 opacity-90'
                : 'border-white/5 hover:border-white/15'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10110D] text-[#D1EF51] uppercase tracking-wider border border-white/5">
                    {lang === 'ta' ? meal.mealTypeLabelTa : meal.mealTypeLabel}
                  </span>
                  <span className="text-xs text-white/50 flex items-center gap-1">
                    <Flame size={12} className="text-[#B2DF10]" />
                    {meal.calories} kcal
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white">
                  {lang === 'ta' ? meal.nameTa : meal.name}
                </h4>

                <p className="text-xs text-white/60 leading-relaxed max-w-lg">
                  {lang === 'ta' ? meal.descriptionTa : meal.description}
                </p>

                {/* Macro tags */}
                <div className="flex items-center gap-3 text-xs text-white/70 pt-1">
                  <span>Protein: <strong className="text-[#B2DF10] font-semibold">{meal.proteinGrams}g</strong></span>
                  <span>·</span>
                  <span>Carbs: {meal.carbsGrams}g</span>
                  <span>·</span>
                  <span>Fats: {meal.fatGrams}g</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onToggleMeal(meal.id)}
                className={`self-start sm:self-center px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  meal.isCompleted
                    ? 'bg-[#B2DF10]/20 text-[#B2DF10] border border-[#B2DF10]/30'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <CheckCircle2 size={14} />
                <span>{meal.isCompleted ? t.mealDone : t.markMealEaten}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
