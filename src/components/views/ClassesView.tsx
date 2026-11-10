import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle2, ChevronRight } from 'lucide-react';
import { ClassSession, MaduraiBranch, Language } from '../../types/wfit';
import { I18N } from '../../data/mockData';

interface ClassesViewProps {
  classes: ClassSession[];
  lang: Language;
  onToggleBookClass: (classId: string) => void;
}

export const ClassesView: React.FC<ClassesViewProps> = ({
  classes,
  lang,
  onToggleBookClass
}) => {
  const t = I18N[lang];
  const [selectedBranch, setSelectedBranch] = useState<'All' | MaduraiBranch>('All');

  const filtered = classes.filter((cls) =>
    selectedBranch === 'All' ? true : cls.branch === selectedBranch
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {t.classesHeader}
        </h2>
        <p className="text-xs text-white/60 mt-1">
          High-energy group workouts led by certified Madurai performance coaches.
        </p>
      </div>

      {/* Branch selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {(['All', 'KK Nagar', 'Anna Nagar', 'Bypass Road'] as ('All' | MaduraiBranch)[]).map((br) => (
          <button
            key={br}
            onClick={() => setSelectedBranch(br)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedBranch === br
                ? 'bg-[#B2DF10] text-[#10110D] shadow-sm'
                : 'bg-[#26291F] text-white/70 hover:text-white border border-white/5'
            }`}
          >
            {br === 'All' ? 'All Centers' : `${br} Branch`}
          </button>
        ))}
      </div>

      {/* Classes list */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isFull = item.bookedCount >= item.capacity && !item.isBooked;
          const seatsAvailable = item.capacity - item.bookedCount;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl bg-[#26291F] border transition-all ${
                item.isBooked
                  ? 'border-[#B2DF10]/50 shadow-sm shadow-[#B2DF10]/10'
                  : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#B2DF10] text-[#10110D] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold text-white/70 flex items-center gap-1">
                      <MapPin size={11} className="text-[#B2DF10]" /> {item.branch}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {lang === 'ta' ? item.titleTa : item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                    <span className="flex items-center gap-1 font-medium text-white/80">
                      <Calendar size={12} className="text-[#D1EF51]" /> {item.day}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {item.time}
                    </span>
                    <span>·</span>
                    <span className="text-white/70">Coach: <strong className="text-white font-medium">{item.trainer}</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-semibold text-white/80 flex items-center gap-1">
                      <Users size={12} className="text-[#B2DF10]" />
                      <span>{seatsAvailable} {t.slotsLeft}</span>
                    </span>
                    <span className="text-[10px] text-white/40 block">
                      {item.bookedCount}/{item.capacity} booked
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleBookClass(item.id)}
                    disabled={isFull}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      item.isBooked
                        ? 'bg-[#B2DF10]/20 text-[#B2DF10] border border-[#B2DF10]/40'
                        : isFull
                        ? 'bg-white/10 text-white/40 cursor-not-allowed'
                        : 'btn-wfit-primary'
                    }`}
                  >
                    {item.isBooked ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span>{t.bookedSuccess}</span>
                      </>
                    ) : isFull ? (
                      t.classFull
                    ) : (
                      t.bookNow
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
