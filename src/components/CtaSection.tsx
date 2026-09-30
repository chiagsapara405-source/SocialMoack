import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CtaSectionProps {
  onCreateCampaign: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onCreateCampaign }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.cta-heading-word', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        yPercent: 110,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
      });

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 36, scale: 0.98 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#0A0A0A] text-white relative overflow-hidden sm-dot-grid-dark border-t border-black"
    >
      {/* Subtle gold center glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[130px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #D4A72C 0%, rgba(212, 167, 44, 0.1) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div
          ref={cardRef}
          className="p-8 sm:p-14 md:p-20 rounded-3xl bg-gradient-to-b from-[#141414] to-[#0D0D0D] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-8"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#D4A72C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C] animate-pulse" />
            <span>START YOUR CAMPAIGN</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[-0.03em] leading-[1.08] max-w-3xl mx-auto">
            <span className="block overflow-hidden">
              <span className="cta-heading-word inline-block mr-3">Your</span>
              <span className="cta-heading-word inline-block mr-3">next</span>
              <span className="cta-heading-word inline-block">event</span>
            </span>
            <span className="block overflow-hidden">
              <span className="cta-heading-word inline-block mr-3">deserves</span>
              <span className="cta-heading-word inline-block mr-3">more</span>
              <span className="cta-heading-word inline-block mr-3">than</span>
              <span className="cta-heading-word inline-block text-[#D4A72C]">one</span>
              <span className="cta-heading-word inline-block text-[#D4A72C]">post.</span>
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto font-normal leading-relaxed">
            Build the entire campaign from one event brief.
          </p>

          {/* Action button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onCreateCampaign}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#D4A72C] hover:bg-[#E7C45A] text-[#0A0A0A] text-sm font-bold tracking-wide transition-all duration-200 shadow-md cursor-pointer group border border-[#D4A72C]"
            >
              <span>Create Campaign</span>
              <ArrowRight className="w-4 h-4 text-[#0A0A0A] group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Minimal feature confirmation pills */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-white/50">
            <span className="flex items-center gap-1.5">
              <span className="text-[#D4A72C]">●</span> 6 Platform Formats
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#D4A72C]">●</span> Zero Manual Formatting
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#D4A72C]">●</span> Browser Persistent Workspace
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
