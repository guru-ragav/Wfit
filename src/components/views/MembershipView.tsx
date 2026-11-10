import React from 'react';
import { Check, ShieldCheck, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { MembershipPlan, Language } from '../../types/wfit';
import { MEMBERSHIP_PLANS, I18N } from '../../data/mockData';

interface MembershipViewProps {
  currentPlanName: string;
  lang: Language;
  onSelectPlan: (plan: MembershipPlan) => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({
  currentPlanName,
  lang,
  onSelectPlan
}) => {
  const t = I18N[lang];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {t.membershipHeader}
        </h2>
        <p className="text-xs text-white/60 mt-1">
          Transparent, all-inclusive fitness passes with access across Madurai clubs and zero hidden lock-ins.
        </p>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MEMBERSHIP_PLANS.map((plan) => {
          const isCurrent = currentPlanName === plan.name;
          const features = lang === 'ta' ? plan.featuresTa : plan.features;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 bg-[#26291F] border transition-all flex flex-col justify-between ${
                plan.popular
                  ? 'border-[#B2DF10] shadow-xl shadow-[#B2DF10]/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#B2DF10] text-[#10110D] text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                  {plan.badge || 'BEST VALUE'}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'ta' ? plan.nameTa : plan.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white tabular-nums tracking-tight">
                      ₹{plan.priceInr.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-white/50">
                      / {plan.durationMonths === 1 ? 'month' : `${plan.durationMonths} months`}
                    </span>
                  </div>
                  <span className="text-[11px] text-white/40 block mt-0.5">
                    ₹{Math.round(plan.priceInr / plan.durationMonths).toLocaleString('en-IN')}/mo effective
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-2 border-t border-white/5">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                      <div className="w-4 h-4 rounded-full bg-[#B2DF10]/20 flex items-center justify-center text-[#B2DF10] shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4">
                {isCurrent ? (
                  <div className="w-full py-3 rounded-xl bg-white/10 text-white/70 text-xs font-semibold text-center border border-white/10">
                    {t.currentPlanBadge}
                  </div>
                ) : (
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className="w-full py-3.5 rounded-xl btn-wfit-primary text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Choose & Pay via UPI</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="p-4 rounded-2xl bg-[#10110D] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-[#B2DF10]" />
          <span>All plans come with 7-Day Money-Back Guarantee & Free Membership Freeze</span>
        </div>
        <span className="text-white/40">UPI AutoPay / QR / One-time</span>
      </div>
    </div>
  );
};
