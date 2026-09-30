import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Sliders, Palette, DownloadCloud, Sparkles, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const layoutContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let animated = false;

    const runAnimation = () => {
      if (animated) return;
      animated = true;

      const items = layoutContainerRef.current?.querySelectorAll('.feature-block');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.55,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
          }
        );
      }
    };

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        runAnimation();
      },
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(sectionRef.current);
    ScrollTrigger.refresh();

    return () => {
      st.kill();
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#F7F8FC] border-b border-[#E5E7EB] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="max-w-2xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-[#7C3AED] bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200/60 mb-3">
            <span>CAPABILITIES / EDITORIAL ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1020] tracking-tight leading-tight">
            Designed for Speed. <br />
            Engineered for Precision.
          </h2>
          <p className="mt-3 text-base text-[#667085]">
            Every social format requires different narrative pacing, character limits, and visual composition.
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div ref={layoutContainerRef} className="space-y-6">
          {/* Block 01: Hero Dominant Feature Card */}
          <div className="feature-block bg-white rounded-3xl p-8 sm:p-10 border border-[#E5E7EB] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-xs font-mono font-bold text-[#7C3AED] tracking-wider uppercase">
                01 / CORE WORKFLOW
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0B1020] tracking-tight leading-snug">
                One event. <br />
                Multiple platforms.
              </h3>
              <p className="text-sm text-[#667085] leading-relaxed">
                Generate platform-specific content without rewriting everything manually. Each channel receives tailored headlines, body copy, and hashtags automatically structured to maximize reach.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Instagram Feed
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Vertical Stories
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> LinkedIn
                </span>
              </div>
            </div>

            {/* Visual Canvas Demonstration inside Feature 01 */}
            <div className="lg:col-span-7 bg-[#F7F8FC] rounded-2xl p-4 sm:p-6 border border-slate-200/80 relative overflow-hidden">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs space-y-2 text-left">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-1 border-b border-slate-100">
                    <span>1:1 FEED</span>
                    <span className="text-[#7C3AED] font-bold">INSTAGRAM</span>
                  </div>
                  <div className="aspect-video rounded-md bg-gradient-to-tr from-slate-900 via-purple-900 to-[#7C3AED] p-2 flex items-end">
                    <span className="text-[10px] font-bold text-white uppercase">AI Arena Keynote</span>
                  </div>
                  <p className="text-[10px] text-slate-600 line-clamp-2">
                    Excited to convene 1,200+ researchers and students for the annual challenge...
                  </p>
                </div>

                <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs space-y-2 text-left">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-1 border-b border-slate-100">
                    <span>9:16 VERTICAL</span>
                    <span className="text-[#7C3AED] font-bold">STORY</span>
                  </div>
                  <div className="aspect-video rounded-md bg-gradient-to-b from-purple-950 via-slate-900 to-black p-2 flex flex-col justify-between">
                    <span className="text-[8px] font-mono text-purple-300">SWIPE UP LIVE</span>
                    <span className="text-[10px] font-bold text-white uppercase">OCT 01 · RKU</span>
                  </div>
                  <div className="p-1 bg-purple-50 rounded text-[9px] font-mono text-purple-700 text-center font-bold">
                    REGISTER NOW →
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 02 & 03: Editorial Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 02: Editable Content */}
            <div className="feature-block bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-xs flex flex-col justify-between text-left">
              <div>
                <span className="text-xs font-mono font-bold text-[#7C3AED] tracking-wider uppercase">
                  02 / REAL-TIME EDITOR
                </span>
                <h3 className="text-xl font-extrabold text-[#0B1020] mt-2 mb-3 tracking-tight">
                  Editable Content & Copy
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed">
                  Change copy and preview instantly. Modify hashtags, test alternative headlines, adjust like metrics, or rewrite descriptions with instantaneous visual feedback.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>INSTANT SYNCHRONIZATION</span>
                <Sliders className="w-4 h-4 text-[#7C3AED]" />
              </div>
            </div>

            {/* Feature 03: Brand Control */}
            <div className="feature-block bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-xs flex flex-col justify-between text-left">
              <div>
                <span className="text-xs font-mono font-bold text-[#2563EB] tracking-wider uppercase">
                  03 / VISUAL IDENTITY
                </span>
                <h3 className="text-xl font-extrabold text-[#0B1020] mt-2 mb-3 tracking-tight">
                  Brand Control & Themes
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed">
                  Apply your visual identity effortlessly. Choose custom primary and secondary accents that automatically format mockups, story CTA buttons, and background gradients.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>HEX & PALETTE PICKER</span>
                <Palette className="w-4 h-4 text-[#2563EB]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
