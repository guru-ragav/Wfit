import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Play, Pause, RotateCcw, Clock, Dumbbell, Award, Flame } from 'lucide-react';
import { WorkoutRoutine, Language } from '../types/wfit';
import { I18N } from '../data/mockData';

interface WorkoutDetailModalProps {
  workout: WorkoutRoutine;
  lang: Language;
  onClose: () => void;
  onCompleteWorkout: (workoutId: string, caloriesBurned: number, minutes: number) => void;
}

export const WorkoutDetailModal: React.FC<WorkoutDetailModalProps> = ({
  workout,
  lang,
  onClose,
  onCompleteWorkout
}) => {
  const t = I18N[lang];
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [activeTimerSeconds, setActiveTimerSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && activeTimerSeconds > 0) {
      interval = setInterval(() => {
        setActiveTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (activeTimerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, activeTimerSeconds]);

  const startRestTimer = (seconds: number) => {
    setActiveTimerSeconds(seconds);
    setTimerRunning(true);
  };

  const toggleExercise = (id: string, defaultRestSec: number) => {
    setCompletedExercises((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      // If marking as completed, start rest timer
      if (!prev[id]) {
        startRestTimer(defaultRestSec || 45);
      }
      return next;
    });
  };

  const completedCount = workout.exercises.filter((ex) => completedExercises[ex.id]).length;
  const isAllComplete = completedCount === workout.exercises.length && workout.exercises.length > 0;

  const handleFinishRoutine = () => {
    setShowCelebration(true);
    setTimeout(() => {
      onCompleteWorkout(workout.id, workout.caloriesEstimate, workout.durationMinutes);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#26291F] border border-white/10 shadow-2xl p-6 text-white overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-start justify-between pb-3 border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#B2DF10] text-[#10110D]">
                {workout.category}
              </span>
              <span className="text-xs text-white/60">
                {lang === 'ta' ? workout.difficultyTa : workout.difficulty}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {lang === 'ta' ? workout.titleTa : workout.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Floating Rest Timer Bar if active */}
        {activeTimerSeconds > 0 && (
          <div className="my-3 p-3 rounded-xl bg-[#10110D] border border-[#B2DF10]/40 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#B2DF10]" />
              <span className="text-xs text-white/80 font-medium">Rest Countdown:</span>
              <span className="text-sm font-mono font-bold text-[#D1EF51]">
                {Math.floor(activeTimerSeconds / 60)}:
                {(activeTimerSeconds % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs"
              >
                {timerRunning ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={() => setActiveTimerSeconds(0)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Scrollable exercise list */}
        <div className="overflow-y-auto space-y-3 py-3 pr-1 my-1 flex-1">
          <p className="text-xs text-white/70 leading-relaxed">
            {lang === 'ta' ? workout.descriptionTa : workout.description}
          </p>

          <div className="flex items-center justify-between text-xs text-white/50 pt-1 border-t border-white/5">
            <span>Progress: {completedCount} of {workout.exercises.length} {t.completedCount}</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[#D1EF51]">
                <Flame size={13} /> {workout.caloriesEstimate} {t.caloriesEst}
              </span>
              <span>·</span>
              <span>{workout.durationMinutes} {t.minsLabel}</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {workout.exercises.map((ex, index) => {
              const isDone = !!completedExercises[ex.id];
              return (
                <div
                  key={ex.id}
                  onClick={() => toggleExercise(ex.id, ex.restSec)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isDone
                      ? 'bg-[#10110D]/70 border-[#B2DF10]/50 opacity-90'
                      : 'bg-[#10110D] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mt-0.5 transition-colors ${
                        isDone
                          ? 'bg-[#B2DF10] text-[#10110D]'
                          : 'border border-white/30 text-white/30'
                      }`}
                    >
                      {isDone ? <CheckCircle2 size={16} /> : index + 1}
                    </button>
                    <div>
                      <h4
                        className={`text-sm font-semibold transition-all ${
                          isDone ? 'line-through text-white/50' : 'text-white'
                        }`}
                      >
                        {lang === 'ta' ? ex.nameTa : ex.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-white/60 mt-1">
                        <span className="font-medium text-[#D1EF51]">{ex.sets} Sets</span>
                        <span>·</span>
                        <span>{ex.reps}</span>
                        <span>·</span>
                        <span className="text-white/40">{ex.restSec}s rest</span>
                      </div>
                      <p className="text-[11px] text-white/40 mt-1 italic">
                        {ex.notes}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                      isDone
                        ? 'bg-[#B2DF10]/20 text-[#B2DF10]'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {isDone ? t.markExerciseComplete : 'Done'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-3 border-t border-white/10 shrink-0">
          {showCelebration ? (
            <div className="py-2 text-center text-[#B2DF10] font-bold text-sm flex items-center justify-center gap-2 animate-bounce">
              <Award size={18} />
              <span>{t.workoutCompletedToast}</span>
            </div>
          ) : (
            <button
              onClick={handleFinishRoutine}
              disabled={completedCount === 0}
              className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                completedCount > 0
                  ? 'btn-wfit-primary'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              <Award size={18} />
              <span>
                {isAllComplete
                  ? 'Complete & Log Full Workout'
                  : `Finish Workout (${completedCount}/${workout.exercises.length} Done)`}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
