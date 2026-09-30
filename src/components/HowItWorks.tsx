import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'DESCRIBE',
    description: "Tell SocialMock what you're organizing.",
    detail: 'Event name, venue, dates, audience and call to action.',
  },
  {
    number: '02',
    title: 'GENERATE',
    description: 'Create platform-specific campaign content.',
    detail: 'Native aspect ratios, tailored character lengths and hashtags.',
  },
  {
    number: '03',
    title: 'CUSTOMIZE',
    description: 'Adjust content, branding and visuals.',
    detail: 'Edit captions, swap primary brand colors, and refine typography.',
  },
  {
    number: '04',
    title: 'EXPORT',
    description: 'Download ready-to-use social assets.',
    detail: 'Studio mockups ready for community launch and stakeholder review.',
  },
];

interface HowItWorksProps {
  onOpenExport?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenExport }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading word reveal
      gsap.from('.workflow-word', {
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

      // Steps sequential reveal with scrubbed line extension
      const stepCards = gsap.utils.toArray<HTMLElement>('.workflow-step-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 85%',
          scrub: 0.6,
        },
      });

      if (lineProgressRef.current) {
        tl.fromTo(
          lineProgressRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', transformOrigin: 'left center' }
        );
      }

      stepCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#FAFAF8] text-[#111111] relative overflow-hidden border-b border-[rgba(10,10,10,0.08)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(10,10,10,0.12)] text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#6B6B67] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
            <span>02 / WORKFLOW PIPELINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0A0A0A] tracking-[-0.03em] leading-tight">
            <span className="block overflow-hidden">
              <span className="workflow-word inline-block mr-3">From</span>
              <span className="workflow-word inline-block mr-3">event</span>
              <span className="workflow-word inline-block">brief</span>
            </span>
            <span className="block overflow-hidden text-[#D4A72C]">
              <span className="workflow-word inline-block mr-3">to</span>
              <span className="workflow-word inline-block">campaign.</span>
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6B6B67] max-w-xl font-normal leading-relaxed">
            A linear four-step system designed to eliminate manual format re-creation.
          </p>
        </div>

        {/* Step Cards with Connecting Line */}
        <div className="relative">
          {/* Desktop Connecting Baseline */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-[1.5px] bg-[rgba(10,10,10,0.1)] z-0">
            <div
              ref={lineProgressRef}
              className="h-full bg-[#D4A72C] w-full"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 relative z-10">
            {steps.map((item, index) => (
              <div
                key={item.number}
                className={`workflow-step-card bg-white rounded-2xl p-6 border shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-colors group text-left ${
                  item.number === '04'
                    ? 'border-[#D4A72C]/50 hover:border-[#D4A72C] ring-1 ring-[#D4A72C]/20'
                    : 'border-[rgba(10,10,10,0.12)] hover:border-[#D4A72C]'
                }`}
              >
                <div>
                  {/* Step Header Badge */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(10,10,10,0.08)]">
                    <span className="w-9 h-9 rounded-xl bg-[#0A0A0A] text-[#D4A72C] font-mono font-bold text-sm flex items-center justify-center shadow-2xs group-hover:bg-[#D4A72C] group-hover:text-[#0A0A0A] transition-colors">
                      {item.number}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#6B6B67] uppercase font-bold">
                      {item.number === '04' ? 'FINAL PART 4' : `STEP 0${index + 1}`}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#0A0A0A] tracking-tight mb-2 flex items-center justify-between">
                    <span>{item.title}</span>
                    {item.number === '04' && (
                      <span className="text-[10px] font-mono bg-[#D4A72C]/15 text-[#A77B12] px-2 py-0.5 rounded font-bold">
                        EXPORT POST
                      </span>
                    )}
                  </h3>

                  <p className="text-sm font-semibold text-[#111111] leading-snug mb-3">
                    {item.description}
                  </p>

                  <p className="text-xs text-[#6B6B67] leading-relaxed font-normal">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[rgba(10,10,10,0.06)]">
                  {item.number === '04' && onOpenExport ? (
                    <button
                      type="button"
                      onClick={onOpenExport}
                      className="w-full py-2 px-3 rounded-lg bg-[#0A0A0A] hover:bg-[#D4A72C] text-white hover:text-[#0A0A0A] font-bold text-xs font-mono transition-colors flex items-center justify-between cursor-pointer group/btn"
                    >
                      <span className="flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5 text-[#D4A72C] group-hover/btn:text-[#0A0A0A]" />
                        <span>Export Post</span>
                      </span>
                      <span>Launch Suite →</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#6B6B67]">
                      <span>System automated</span>
                      <span className="text-[#D4A72C] font-bold">● Active</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
