import React, { useEffect, useRef } from 'react';
import {
  ArrowRight,
  Calendar,
  Image as ImageIcon,
} from 'lucide-react';
import gsap from 'gsap';
import heroLandscapeImg from '../assets/images/hero_landscape_1790761216794.jpg';

interface HeroProps {
  onCreateCampaign: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCreateCampaign }) => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const parallaxGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check for reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Eyebrow reveal
      tl.from('.hero-eyebrow', {
        opacity: 0,
        y: 16,
        duration: 0.45,
      });

      // 2. Headline word-by-word reveal upward
      tl.from(
        '.hero-word',
        {
          yPercent: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 0.85,
          ease: 'power4.out',
        },
        '-=0.2'
      );

      // 3. Description reveal
      tl.from(
        '.hero-description',
        {
          opacity: 0,
          y: 16,
          duration: 0.5,
        },
        '-=0.3'
      );

      // 4. CTAs
      tl.from(
        '.hero-cta-group',
        {
          opacity: 0,
          y: 14,
          duration: 0.45,
        },
        '-=0.25'
      );

      // 5. Metadata Divider Row
      tl.from(
        '.hero-metadata',
        {
          opacity: 0,
          y: 12,
          duration: 0.45,
        },
        '-=0.2'
      );

      // 6. Event Brief Card (source of the campaign)
      tl.from(
        '.event-brief-card',
        {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // 7. Connector Line Reveal & One-time Traveling Dot
      tl.from(
        '.hero-connector-stem',
        {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 0.35,
          ease: 'power2.inOut',
        },
        '-=0.2'
      );

      tl.from(
        '.hero-connector-branch',
        {
          scaleX: 0,
          transformOrigin: 'center center',
          duration: 0.35,
          ease: 'power2.inOut',
        },
        '-=0.15'
      );

      // One-time traveling gold dot down connector
      tl.fromTo(
        '.connector-travel-dot',
        { y: -10, opacity: 0 },
        { y: 32, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.35'
      );

      // 8. Social Output Cards entrance from subtle offsets
      tl.from(
        '.social-card-instagram',
        {
          opacity: 0,
          x: -30,
          duration: 0.65,
          ease: 'power3.out',
        },
        '-=0.2'
      );

      tl.from(
        '.social-card-story',
        {
          opacity: 0,
          x: 30,
          duration: 0.65,
          ease: 'power3.out',
        },
        '-=0.55'
      );

      // 9. Floating UI Badges
      tl.from(
        '.floating-badge',
        {
          opacity: 0,
          y: 15,
          scale: 0.9,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // Gentle floating sine motion (6-8px maximum, no rotation)
      gsap.to('.floating-badge', {
        y: -7,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.4,
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // Subtle mouse parallax (max ±5px, desktop only)
  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop || !parallaxGroupRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xOffset = ((e.clientX / innerWidth) - 0.5) * 10;
      const yOffset = ((e.clientY / innerHeight) - 0.5) * 10;

      gsap.to(parallaxGroupRef.current, {
        x: xOffset,
        y: yOffset,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToWorkflow = () => {
    const element = document.getElementById('workflow');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroSectionRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#FAFAF8] text-[#111111] overflow-hidden sm-dot-grid border-b border-[rgba(10,10,10,0.08)] select-none"
    >
      {/* Extremely subtle radial gold glow behind the product composition */}
      <div
        className="pointer-events-none absolute right-[5%] top-[20%] w-[520px] h-[520px] rounded-full blur-3xl opacity-50 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(212, 167, 44, 0.08) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* LEFT COLUMN: Editorial Hero Typography (~48% width) */}
          <div className="lg:col-span-6 text-left space-y-6">
            {/* Eyebrow */}
            <div className="hero-eyebrow inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(10,10,10,0.12)] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#D4A72C]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#0A0A0A]">
                EVENT → SOCIAL CAMPAIGN
              </span>
            </div>

            {/* Headline with Word Split Reveal */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0A0A0A] tracking-[-0.035em] leading-[1.08]">
              <span className="block overflow-hidden">
                <span className="hero-word inline-block mr-3">One</span>
                <span className="hero-word inline-block">event.</span>
              </span>
              <span className="block overflow-hidden text-[#D4A72C]">
                <span className="hero-word inline-block mr-3">Every</span>
                <span className="hero-word inline-block mr-3">social</span>
                <span className="hero-word inline-block">format.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-word inline-block mr-3">Ready</span>
                <span className="hero-word inline-block mr-3">in</span>
                <span className="hero-word inline-block">seconds.</span>
              </span>
            </h1>

            {/* Description */}
            <p className="hero-description text-base sm:text-lg text-[#6B6B67] max-w-xl font-normal leading-relaxed">
              Turn a single event brief into realistic social media campaigns, complete with platform-ready previews, editable content and exportable assets.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group pt-1 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onCreateCampaign}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0A0A0A] hover:bg-[#D4A72C] text-white hover:text-[#0A0A0A] text-sm font-bold transition-all duration-200 shadow-sm cursor-pointer group border border-[#0A0A0A] hover:border-[#D4A72C]"
              >
                <span>Create Campaign</span>
                <ArrowRight className="w-4 h-4 text-white/90 group-hover:text-[#0A0A0A] group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                type="button"
                onClick={scrollToWorkflow}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#F4F3EF] hover:border-[#D4A72C]/50 text-[#111111] text-sm font-semibold border border-[rgba(10,10,10,0.12)] transition-colors cursor-pointer"
              >
                <span>See How It Works</span>
              </button>
            </div>

            {/* Hero Metadata Divider Row */}
            <div className="hero-metadata pt-8 border-t border-[rgba(10,10,10,0.10)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <p className="text-[11px] font-mono font-bold text-[#D4A72C]">01</p>
                <p className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase mt-0.5">
                  EVENT INPUT
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono font-bold text-[#D4A72C]">02</p>
                <p className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase mt-0.5">
                  AI CONTENT
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono font-bold text-[#D4A72C]">03</p>
                <p className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase mt-0.5">
                  SOCIAL FORMATS
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono font-bold text-[#D4A72C]">04</p>
                <p className="text-xs font-bold text-[#0A0A0A] tracking-wider uppercase mt-0.5">
                  EXPORT
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Streamlined Product Composition (~48% width) */}
          <div className="lg:col-span-6 relative w-full flex flex-col items-center justify-center">
            <div ref={parallaxGroupRef} className="w-full max-w-[490px] relative">
              {/* Floating UI Badge 1: Top Left */}
              <div className="floating-badge absolute -top-3.5 left-2 z-20 px-3 py-1.5 rounded-lg bg-[#0A0A0A] text-white text-[10px] font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-md border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
                <span>AI CAPTION GENERATED ✓</span>
              </div>

              {/* Floating UI Badge 2: Top Right */}
              <div className="floating-badge absolute -top-3.5 right-2 z-20 px-3 py-1.5 rounded-lg bg-white text-[#0A0A0A] text-[10px] font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-md border border-[rgba(10,10,10,0.12)]">
                <span className="text-[#D4A72C]">●</span>
                <span>6 FORMATS READY</span>
              </div>

              {/* 1. HERO VISUAL: EVENT BRIEF CARD */}
              <div className="event-brief-card mx-auto w-full bg-white rounded-2xl p-6 border border-[rgba(10,10,10,0.12)] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative z-10 text-left">
                <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(10,10,10,0.08)]">
                  <span className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-[#6B6B67]">
                    EVENT BRIEF
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FAFAF8] border border-[rgba(10,10,10,0.1)] text-[#0A0A0A]">
                    SOURCE · 01
                  </span>
                </div>

                <div className="py-3.5 space-y-2.5">
                  <div>
                    <h3 className="text-lg font-black text-[#0A0A0A] tracking-tight">
                      AI ARENA 2026
                    </h3>
                    <p className="text-xs text-[#6B6B67] leading-relaxed mt-0.5">
                      Student AI hackathon & engineering showcase focused on building real-world autonomous agents.
                    </p>
                  </div>

                  {/* Attached Creative Asset Thumbnail */}
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAFAF8] border border-[rgba(10,10,10,0.08)]">
                    <img
                      src={heroLandscapeImg}
                      alt="AI Arena 2026 Creative Asset"
                      referrerPolicy="no-referrer"
                      className="w-12 h-9 object-cover rounded-md border border-black/10 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono font-bold text-[#0A0A0A] truncate">
                        alpine_keynote_art.jpg
                      </p>
                      <p className="text-[9px] font-mono text-[#6B6B67]">
                        Attached Event Artwork · 16:9 HD
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-[rgba(10,10,10,0.08)] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#0A0A0A] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4A72C]" />
                    <span>01 OCT · RKU</span>
                  </span>
                  <span className="text-[#D4A72C] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4A72C]" />
                    <span>READY TO GENERATE</span>
                  </span>
                </div>
              </div>

              {/* 2. ELEGANT ONE-TIME CONNECTOR */}
              <div className="relative flex flex-col items-center my-3.5 z-0">
                {/* Vertical Stem */}
                <div className="hero-connector-stem w-[1.5px] h-7 bg-[#0A0A0A] relative">
                  <div className="connector-travel-dot absolute -left-[2px] top-0 w-[5.5px] h-[5.5px] rounded-full bg-[#D4A72C]" />
                </div>
                {/* Horizontal Branch spanning to both cards */}
                <div className="hero-connector-branch w-full max-w-[320px] h-[1.5px] bg-[#0A0A0A] relative">
                  <div className="absolute left-0 -top-[2px] w-[5.5px] h-[5.5px] rounded-full bg-[#0A0A0A]" />
                  <div className="absolute right-0 -top-[2px] w-[5.5px] h-[5.5px] rounded-full bg-[#0A0A0A]" />
                </div>
              </div>

              {/* 3. SOCIAL OUTPUT PREVIEWS (ONLY INSTAGRAM + STORY) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Card 1: Instagram Post (1:1 Abstracted Editorial Mockup with Uploaded Artwork) */}
                <div className="social-card-instagram bg-white rounded-xl p-3.5 border border-[rgba(10,10,10,0.12)] shadow-sm text-left space-y-2.5 hover:border-[#D4A72C] transition-colors">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-[#0A0A0A] uppercase tracking-wider">
                      INSTAGRAM
                    </span>
                    <span className="text-[#D4A72C] font-semibold bg-[#FAFAF8] px-1.5 py-0.5 rounded border border-[rgba(10,10,10,0.08)]">
                      1:1
                    </span>
                  </div>

                  {/* Editorial Abstract Preview Canvas with Uploaded Art */}
                  <div className="aspect-square rounded-lg bg-[#0A0A0A] text-white relative overflow-hidden group border border-black/10">
                    <img
                      src={heroLandscapeImg}
                      alt="AI Arena 2026 Instagram Post"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/55 p-2.5 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-[9px] font-mono text-white/90">
                        <span className="bg-black/50 backdrop-blur-xs px-1.5 py-0.5 rounded font-semibold">
                          KEYNOTE
                        </span>
                        <span className="text-[#D4A72C] font-bold bg-black/50 backdrop-blur-xs px-1.5 py-0.5 rounded">
                          OCT 01
                        </span>
                      </div>

                      <div className="my-auto py-1">
                        <p className="text-[9px] uppercase font-mono text-[#D4A72C] tracking-wider font-bold drop-shadow">
                          TECH MINDS CLUB
                        </p>
                        <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight leading-snug drop-shadow-md text-white">
                          AI ARENA 2026
                        </h4>
                      </div>

                      <div className="flex items-center justify-between text-[9px] font-mono text-white/90 pt-1 border-t border-white/20">
                        <span>RSVP LIVE</span>
                        <span className="text-[#D4A72C] font-bold">REGISTER →</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#6B6B67] pt-0.5 font-mono">
                    <span className="font-semibold text-[#0A0A0A]">142 likes</span>
                    <span>Feed ready</span>
                  </div>
                </div>

                {/* Card 2: Instagram Story (9:16 Abstracted Editorial Mockup with Uploaded Artwork) */}
                <div className="social-card-story bg-white rounded-xl p-3.5 border border-[rgba(10,10,10,0.12)] shadow-sm text-left space-y-2.5 hover:border-[#D4A72C] transition-colors">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-[#0A0A0A] uppercase tracking-wider">
                      STORY
                    </span>
                    <span className="text-[#D4A72C] font-semibold bg-[#FAFAF8] px-1.5 py-0.5 rounded border border-[rgba(10,10,10,0.08)]">
                      9:16
                    </span>
                  </div>

                  {/* Editorial Abstract Preview Canvas with Uploaded Art */}
                  <div className="aspect-square rounded-lg bg-[#0A0A0A] text-white relative overflow-hidden border border-white/10 group">
                    <img
                      src={heroLandscapeImg}
                      alt="AI Arena 2026 Story"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover scale-110 transition-transform duration-500 group-hover:scale-115"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/90 p-2.5 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-[9px] font-mono">
                        <span className="text-[#D4A72C] font-bold bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded">
                          PASS RELEASE
                        </span>
                        <span className="text-white/90 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded">
                          RKU
                        </span>
                      </div>

                      <div className="my-auto py-1 text-center">
                        <span className="text-[8px] font-mono uppercase tracking-widest text-[#D4A72C] font-bold drop-shadow">
                          SWIPE UP
                        </span>
                        <h4 className="text-xs font-black uppercase tracking-tight leading-snug drop-shadow text-white">
                          BUILD WITH AI
                        </h4>
                      </div>

                      <div className="w-full bg-[#D4A72C] text-[#0A0A0A] font-bold text-[9px] text-center py-1 rounded font-mono shadow-md">
                        CLAIM PASS →
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#6B6B67] pt-0.5 font-mono">
                    <span className="font-semibold text-[#0A0A0A]">Vertical</span>
                    <span>Full frame</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
