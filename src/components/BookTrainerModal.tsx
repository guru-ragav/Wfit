import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, MapPin, Star } from 'lucide-react';
import { GymTrainer, MaduraiBranch, Language } from '../types/wfit';
import { I18N } from '../data/mockData';

interface BookTrainerModalProps {
  trainer: GymTrainer;
  lang: Language;
  onClose: () => void;
  onConfirm: (trainer: GymTrainer, slot: string, branch: MaduraiBranch) => void;
}

export const BookTrainerModal: React.FC<BookTrainerModalProps> = ({
  trainer,
  lang,
  onClose,
  onConfirm
}) => {
  const t = I18N[lang];
  const [selectedSlot, setSelectedSlot] = useState(trainer.availableSlots[0] || '06:00 AM');
  const [selectedBranch, setSelectedBranch] = useState<MaduraiBranch>(trainer.branch);
  const [selectedDay, setSelectedDay] = useState('Tomorrow');
  const [booked, setBooked] = useState(false);

  const handleBooking = () => {
    setBooked(true);
    setTimeout(() => {
      onConfirm(trainer, selectedSlot, selectedBranch);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#26291F] border border-white/10 shadow-2xl p-6 text-white overflow-hidden">
        {/* Top Header */}
        <div className="flex items-start justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-12 h-12 rounded-xl object-cover border border-[#B2DF10]/50"
            />
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'ta' ? trainer.nameTa : trainer.name}
              </h3>
              <p className="text-xs text-[#D1EF51] font-medium">
                {lang === 'ta' ? trainer.roleTa : trainer.role}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-white/60 mt-0.5">
                <Star size={11} className="fill-[#B2DF10] text-[#B2DF10]" />
                <span className="font-semibold text-white">{trainer.rating}</span>
                <span>·</span>
                <span>{trainer.experienceYears} yrs exp</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {booked ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#B2DF10]/20 border border-[#B2DF10] flex items-center justify-center text-[#B2DF10] animate-bounce">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Session Confirmed!</h4>
              <p className="text-xs text-white/70 mt-1">
                Scheduled with {trainer.name} at {selectedBranch} on {selectedDay} at {selectedSlot}.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Day Selector */}
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5 flex items-center gap-1.5">
                <Calendar size={13} className="text-[#B2DF10]" />
                Select Date
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['Today', 'Tomorrow', 'Thursday'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={`py-2 px-2 rounded-lg text-center font-medium transition-colors ${
                      selectedDay === d
                        ? 'bg-[#B2DF10] text-[#10110D] font-bold'
                        : 'bg-[#10110D] text-white/70 hover:text-white border border-white/5'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time slot selector */}
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5 flex items-center gap-1.5">
                <Clock size={13} className="text-[#B2DF10]" />
                {t.selectSlot}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {trainer.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 px-3 rounded-lg text-center font-mono font-medium transition-colors ${
                      selectedSlot === slot
                        ? 'bg-[#B2DF10] text-[#10110D] font-bold'
                        : 'bg-[#10110D] text-white/80 hover:text-white border border-white/5'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Branch selector */}
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5 flex items-center gap-1.5">
                <MapPin size={13} className="text-[#B2DF10]" />
                Madurai Center
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                {(['KK Nagar', 'Anna Nagar', 'Bypass Road'] as MaduraiBranch[]).map((br) => (
                  <button
                    key={br}
                    type="button"
                    onClick={() => setSelectedBranch(br)}
                    className={`py-1.5 px-1 rounded-lg text-center font-medium transition-colors ${
                      selectedBranch === br
                        ? 'bg-white text-[#10110D] font-bold'
                        : 'bg-[#10110D] text-white/60 hover:text-white border border-white/5'
                    }`}
                  >
                    {br}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm button */}
            <button
              onClick={handleBooking}
              className="w-full py-3 rounded-xl btn-wfit-primary text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{t.confirmBooking}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
