import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Smartphone, QrCode, ArrowRight, Copy } from 'lucide-react';
import { MembershipPlan, Language } from '../types/wfit';
import { I18N } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

interface UpiPaymentModalProps {
  plan: MembershipPlan;
  lang: Language;
  onClose: () => void;
  onPaymentSuccess: (plan: MembershipPlan) => void;
}

type PaymentMethod = 'gpay' | 'phonepe' | 'paytm' | 'qr' | 'vpa';

export const UpiPaymentModal: React.FC<UpiPaymentModalProps> = ({
  plan,
  lang,
  onClose,
  onPaymentSuccess
}) => {
  const t = I18N[lang];
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('gpay');
  const [vpaId, setVpaId] = useState('saravanan@okhdfcbank');
  const [step, setStep] = useState<'select' | 'processing' | 'success'>('select');
  const [transactionRef, setTransactionRef] = useState('');
  const [copied, setCopied] = useState(false);

  const handleStartPayment = () => {
    setStep('processing');
    const fakeRef = `UPI/WFIT/${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    setTransactionRef(fakeRef);

    // Simulate UPI gateway response in 2 seconds
    setTimeout(() => {
      setStep('success');
    }, 2200);
  };

  const handleDone = () => {
    onPaymentSuccess(plan);
    onClose();
  };

  const handleCopyVpa = () => {
    navigator.clipboard?.writeText('wfitmadurai@icici');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-[#26291F] border border-white/10 shadow-2xl p-6 text-white overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Glow accent in background */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#B2DF10]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <BrandLogo size="sm" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {step === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-[#B2DF10]/20 border-t-[#B2DF10] animate-spin" />
              <Smartphone size={24} className="text-[#B2DF10] absolute" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Connecting to UPI Gateway...
              </h3>
              <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                Please approve the authorization request of ₹{plan.priceInr.toLocaleString('en-IN')} on your UPI App
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#D1EF51]">
              Ref: {transactionRef}
            </span>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#B2DF10]/20 border border-[#B2DF10] flex items-center justify-center text-[#B2DF10] animate-bounce">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                Payment Successful!
              </h3>
              <p className="text-xs text-white/70 mt-1">
                Your {plan.name} has been activated instantly.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="w-full bg-[#10110D] rounded-xl p-4 border border-white/5 text-left text-xs space-y-2">
              <div className="flex justify-between items-center text-white/70">
                <span>Amount Paid:</span>
                <span className="font-bold text-white text-sm">
                  ₹{plan.priceInr.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>Transaction ID:</span>
                <span className="font-mono text-white/90">{transactionRef}</span>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>Plan Duration:</span>
                <span className="text-[#D1EF51] font-semibold">{plan.durationMonths} Months Access</span>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>Gym Centers:</span>
                <span className="text-white">KK Nagar · Anna Nagar · Bypass Rd</span>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3 rounded-xl btn-wfit-primary text-sm font-semibold cursor-pointer"
            >
              Done & Return to Dashboard
            </button>
          </div>
        )}

        {step === 'select' && (
          <div className="mt-4 space-y-4">
            {/* Plan Summary Card */}
            <div className="p-3.5 bg-[#10110D] rounded-xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#B2DF10] font-semibold uppercase tracking-wider">
                  Selected Membership
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  {lang === 'ta' ? plan.nameTa : plan.name}
                </h4>
                <span className="text-xs text-white/60">
                  {plan.durationMonths} Months validity
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-[#D1EF51]">
                  ₹{plan.priceInr.toLocaleString('en-IN')}
                </span>
                <span className="block text-[10px] text-white/40">Incl. all taxes</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-semibold text-white/80 block mb-2">
                Choose UPI Payment Method
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Google Pay */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('gpay')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                    selectedMethod === 'gpay'
                      ? 'border-[#B2DF10] bg-[#B2DF10]/10 text-white font-medium'
                      : 'border-white/5 bg-[#10110D] text-white/70 hover:border-white/20'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-bold text-[#10110D] text-xs">
                    G
                  </div>
                  <div>
                    <span className="block font-semibold">Google Pay</span>
                    <span className="text-[10px] text-white/50">Instant App Flow</span>
                  </div>
                </button>

                {/* PhonePe */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('phonepe')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                    selectedMethod === 'phonepe'
                      ? 'border-[#B2DF10] bg-[#B2DF10]/10 text-white font-medium'
                      : 'border-white/5 bg-[#10110D] text-white/70 hover:border-white/20'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-700 flex items-center justify-center font-bold text-white text-xs">
                    Pe
                  </div>
                  <div>
                    <span className="block font-semibold">PhonePe</span>
                    <span className="text-[10px] text-white/50">UPI Intent</span>
                  </div>
                </button>

                {/* Paytm */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('paytm')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                    selectedMethod === 'paytm'
                      ? 'border-[#B2DF10] bg-[#B2DF10]/10 text-white font-medium'
                      : 'border-white/5 bg-[#10110D] text-white/70 hover:border-white/20'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-[#002E6E] flex items-center justify-center font-bold text-[#00BAF2] text-[10px]">
                    Paytm
                  </div>
                  <div>
                    <span className="block font-semibold">Paytm UPI</span>
                    <span className="text-[10px] text-white/50">Direct Debit</span>
                  </div>
                </button>

                {/* QR Code */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('qr')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                    selectedMethod === 'qr'
                      ? 'border-[#B2DF10] bg-[#B2DF10]/10 text-white font-medium'
                      : 'border-white/5 bg-[#10110D] text-white/70 hover:border-white/20'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-[#10110D] border border-[#B2DF10] flex items-center justify-center text-[#B2DF10]">
                    <QrCode size={16} />
                  </div>
                  <div>
                    <span className="block font-semibold">Scan QR</span>
                    <span className="text-[10px] text-white/50">Any UPI Scanner</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Dynamic details based on method */}
            {selectedMethod === 'qr' ? (
              <div className="p-3 bg-white rounded-xl flex items-center justify-between text-[#10110D]">
                <div className="p-2 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="5" y="5" width="26" height="26" />
                    <rect x="9" y="9" width="18" height="18" fill="#FFF" />
                    <rect x="13" y="13" width="10" height="10" />
                    <rect x="69" y="5" width="26" height="26" />
                    <rect x="73" y="9" width="18" height="18" fill="#FFF" />
                    <rect x="77" y="13" width="10" height="10" />
                    <rect x="5" y="69" width="26" height="26" />
                    <rect x="9" y="73" width="18" height="18" fill="#FFF" />
                    <rect x="13" y="77" width="10" height="10" />
                    <rect x="36" y="8" width="6" height="6" />
                    <rect x="44" y="26" width="8" height="6" />
                    <rect x="36" y="40" width="10" height="6" />
                    <rect x="50" y="38" width="8" height="8" />
                    <rect x="64" y="42" width="6" height="6" />
                    <rect x="50" y="54" width="14" height="6" />
                    <rect x="70" y="54" width="6" height="6" />
                    <rect x="38" y="68" width="8" height="6" />
                    <rect x="52" y="68" width="8" height="8" />
                  </svg>
                </div>
                <div className="pl-3 text-left">
                  <span className="text-xs font-bold text-black block">Scan with any UPI App</span>
                  <span className="text-[11px] text-gray-600 block mt-0.5">BHIM, GPay, PhonePe, Cred</span>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded">
                    <span>wfitmadurai@icici</span>
                    <button
                      onClick={handleCopyVpa}
                      className="text-blue-600 hover:text-blue-800 ml-1 cursor-pointer"
                    >
                      {copied ? 'Copied!' : <Copy size={12} />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-[#10110D] rounded-xl border border-white/5 space-y-1.5">
                <label className="text-[11px] text-white/60 block font-medium">
                  Verified UPI Virtual Payment Address (VPA)
                </label>
                <div className="flex items-center gap-2 bg-[#26291F] px-3 py-2 rounded-lg border border-white/10">
                  <input
                    type="text"
                    value={vpaId}
                    onChange={(e) => setVpaId(e.target.value)}
                    className="w-full bg-transparent text-sm text-white focus:outline-none font-mono"
                    placeholder="yourname@upi"
                  />
                  <span className="text-[11px] text-[#B2DF10] font-semibold whitespace-nowrap">
                    VERIFIED
                  </span>
                </div>
              </div>
            )}

            {/* Security note */}
            <div className="flex items-center gap-2 text-[11px] text-white/50">
              <ShieldCheck size={14} className="text-[#B2DF10]" />
              <span>256-bit Encrypted Demo Gateway · NPCI UPI Compliant</span>
            </div>

            {/* Submit button */}
            <button
              onClick={handleStartPayment}
              className="w-full py-3.5 rounded-xl btn-wfit-primary text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Pay ₹{plan.priceInr.toLocaleString('en-IN')} via UPI</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
