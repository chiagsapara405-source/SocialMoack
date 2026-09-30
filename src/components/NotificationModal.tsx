import React from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  title = "Coming in Part 2",
  message = "Campaign creation will be available in Part 2.",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 md:p-8 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
          aria-label="Close notification"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center font-semibold border border-purple-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-[#0F172A]">
              {title}
            </h3>
            <span className="text-xs text-slate-500 font-medium">Part 1 Foundation Active</span>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {message}
        </p>

        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 mb-6 text-xs text-slate-600 space-y-1.5">
          <div className="font-semibold text-slate-700">What's completed in Part 1:</div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Landing page architecture & layout</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>GSAP entrance & scroll reveal interactions</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Multi-platform mock preview cards</span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-all shadow-xs"
          >
            <span>Got it</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
