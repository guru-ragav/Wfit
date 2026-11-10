import React, { useState } from 'react';
import { Play, Flame, Clock, Dumbbell, ChevronRight, Filter } from 'lucide-react';
import { WorkoutRoutine, WorkoutCategory, Language } from '../../types/wfit';
import { I18N } from '../../data/mockData';
import { GYM_IMAGES } from '../../assets/images';

interface WorkoutsViewProps {
  workouts: WorkoutRoutine[];
  lang: Language;
  onSelectWorkout: (workout: WorkoutRoutine) => void;
}

const CATEGORIES: ('All' | WorkoutCategory)[] = [
  'All',
  'Strength',
  'HIIT',
  'Yoga',
  'Weight Loss',
  'Cardio'
];

export const WorkoutsView: React.FC<WorkoutsViewProps> = ({
  workouts,
  lang,
  onSelectWorkout
}) => {
  const t = I18N[lang];
  const [activeCategory, setActiveCategory] = useState<'All' | WorkoutCategory>('All');

  const filteredWorkouts = workouts.filter((w) =>
    activeCategory === 'All' ? true : w.category === activeCategory
  );

  const getImageForCategory = (cat: WorkoutCategory) => {
    switch (cat) {
      case 'Strength':
        return GYM_IMAGES.strengthFeature;
      case 'HIIT':
        return GYM_IMAGES.featuredCableMachine;
      case 'Yoga':
        return GYM_IMAGES.cardioFeature;
      case 'Weight Loss':
        return GYM_IMAGES.heroEquipment;
      case 'Cardio':
      default:
        return GYM_IMAGES.dumbbellsTraining;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {t.workoutsHeader}
        </h2>
        <p className="text-xs text-white/60 mt-1">
          Structured programs engineered for power, agility, and fat loss.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#B2DF10] text-[#10110D] shadow-sm'
                : 'bg-[#26291F] text-white/70 hover:text-white border border-white/5'
            }`}
          >
            {cat === 'All' ? t.allCategories : cat}
          </button>
        ))}
      </div>

      {/* Workout Routine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWorkouts.map((workout) => (
          <div
            key={workout.id}
            onClick={() => onSelectWorkout(workout)}
            className="rounded-2xl bg-[#26291F] border border-white/10 overflow-hidden hover:border-[#B2DF10]/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            {/* Top Media Area */}
            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={getImageForCategory(workout.category)}
                alt={workout.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#26291F] via-[#26291F]/30 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#B2DF10] text-[#10110D] uppercase tracking-wider">
                  {workout.category}
                </span>
                <span className="text-[11px] font-medium text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                  {lang === 'ta' ? workout.difficultyTa : workout.difficulty}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-lg font-bold text-white group-hover:text-[#D1EF51] transition-colors leading-snug">
                  {lang === 'ta' ? workout.titleTa : workout.title}
                </h3>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                {lang === 'ta' ? workout.descriptionTa : workout.description}
              </p>

              <div className="flex items-center justify-between text-xs text-white/70 pt-2 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock size={13} className="text-[#B2DF10]" />
                    {workout.durationMinutes} {t.minsLabel}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[#D1EF51] font-medium">
                    <Flame size={13} />
                    ~{workout.caloriesEstimate} cals
                  </span>
                </div>

                <div className="flex items-center gap-1 font-semibold text-white group-hover:text-[#B2DF10] transition-colors">
                  <span>{workout.exercises.length} {t.exercisesLabel}</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
