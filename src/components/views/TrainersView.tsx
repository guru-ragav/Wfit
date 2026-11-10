import React, { useState } from 'react';
import { Star, MapPin, Award, Calendar, ChevronRight } from 'lucide-react';
import { GymTrainer, MaduraiBranch, Language } from '../../types/wfit';
import { I18N } from '../../data/mockData';

interface TrainersViewProps {
  trainers: GymTrainer[];
  lang: Language;
  onBookTrainer: (trainer: GymTrainer) => void;
}

export const TrainersView: React.FC<TrainersViewProps> = ({
  trainers,
  lang,
  onBookTrainer
}) => {
  const t = I18N[lang];
  const [branchFilter, setBranchFilter] = useState<'All' | MaduraiBranch>('All');

  const filtered = trainers.filter((tr) =>
    branchFilter === 'All' ? true : tr.branch === branchFilter
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {t.trainersHeader}
        </h2>
        <p className="text-xs text-white/60 mt-1">
          Certified national & state medalists dedicated to your physique and athletic goals.
        </p>
      </div>

      {/* Filter by Branch */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {(['All', 'KK Nagar', 'Anna Nagar', 'Bypass Road'] as ('All' | MaduraiBranch)[]).map((br) => (
          <button
            key={br}
            onClick={() => setBranchFilter(br)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              branchFilter === br
                ? 'bg-[#B2DF10] text-[#10110D] shadow-sm'
                : 'bg-[#26291F] text-white/70 hover:text-white border border-white/5'
            }`}
          >
            {br === 'All' ? 'All Centers' : `${br} Branch`}
          </button>
        ))}
      </div>

      {/* Trainer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((trainer) => (
          <div
            key={trainer.id}
            className="p-5 rounded-2xl bg-[#26291F] border border-white/5 hover:border-[#B2DF10]/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3.5">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-[#B2DF10]/40 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10110D] text-[#D1EF51] uppercase tracking-wider border border-white/5">
                      {trainer.branch}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-white/80 font-semibold">
                      <Star size={12} className="fill-[#B2DF10] text-[#B2DF10]" />
                      <span>{trainer.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {lang === 'ta' ? trainer.nameTa : trainer.name}
                  </h3>

                  <p className="text-xs text-[#B2DF10] font-medium">
                    {lang === 'ta' ? trainer.roleTa : trainer.role}
                  </p>
                </div>
              </div>

              <p className="text-xs text-white/70 leading-relaxed">
                {lang === 'ta' ? trainer.bioTa : trainer.bio}
              </p>

              {/* Specialties tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {trainer.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-[#10110D] text-white/70 border border-white/5"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-white/50">
                {trainer.availableSlots.length} slots available today
              </span>

              <button
                onClick={() => onBookTrainer(trainer)}
                className="px-4 py-2 rounded-xl btn-wfit-primary text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Calendar size={13} />
                <span>{t.bookPtSession}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
