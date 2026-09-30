import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
}) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!message) return;

    const el = toastRef.current;
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }
      );
    }

    const timer = setTimeout(() => {
      if (el) {
        gsap.to(el, {
          opacity: 0,
          y: 10,
          scale: 0.95,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: onClose,
        });
      } else {
        onClose();
      }
    }, 2400);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <div
        ref={toastRef}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#0F172A] text-white rounded-xl shadow-xl border border-slate-700/80 text-xs sm:text-sm font-medium"
      >
        {type === 'success' && (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        )}
        {type === 'info' && (
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
        )}
        {type === 'error' && (
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
        )}
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

