import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Maximize2,
  CheckCircle2,
  Sliders,
  Palette,
  ExternalLink,
  Download,
} from 'lucide-react';
import { PlatformId, Campaign } from '../types/campaign';
import { generateMockContent } from '../utils/contentGenerator';
import { platformRegistry } from './studio/platformRegistry';

gsap.registerPlugin(ScrollTrigger);

const sampleCampaign: Campaign = {
  id: 'showcase-demo',
  event: {
    name: 'AI ARENA 2026',
    description: 'Student engineering hackathon and research forum building generative and autonomous AI agents.',
    date: '15 OCT 2026',
    time: '09:30 AM',
    venue: 'RK University Grand Auditorium',
    organizer: 'Tech Minds Club',
    audience: 'Student Builders & Researchers',
    cta: 'Register Now',
  },
  assets: {
    poster: null,
    logo: null,
  },
  brand: {
    primaryColor: '#D4A72C',
    secondaryColor: '#111111',
    socialHandle: '@techminds',
  },
  content: generateMockContent(
    {
      name: 'AI ARENA 2026',
      description: 'Student engineering hackathon and research forum building generative and autonomous AI agents.',
      date: '15 OCT 2026',
      time: '09:30 AM',
      venue: 'RK University Grand Auditorium',
      organizer: 'Tech Minds Club',
      audience: 'Student Builders & Researchers',
      cta: 'Register Now',
    },
    {
      primaryColor: '#D4A72C',
      secondaryColor: '#111111',
      socialHandle: '@techminds',
    }
  ),
  createdAt: new Date().toISOString(),
};

const formatTabs: { id: PlatformId; number: string; label: string }[] = [
  { id: 'instagram', number: '01', label: 'Instagram' },
  { id: 'instagramStory', number: '02', label: 'Story' },
  { id: 'linkedin', number: '03', label: 'LinkedIn' },
  { id: 'twitter', number: '04', label: 'X (Twitter)' },
  { id: 'facebook', number: '05', label: 'Facebook' },
  { id: 'whatsapp', number: '06', label: 'WhatsApp' },
];

interface ProductShowcaseProps {
  onCreateCampaign?: () => void;
  onOpenExport?: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  onCreateCampaign,
  onOpenExport,
}) => {
  const [activePlatform, setActivePlatform] = useState<PlatformId>('instagram');
  const sectionRef = useRef<HTMLElement>(null);
  const studioWindowRef = useRef<HTMLDivElement>(null);
  const canvasContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.showcase-heading-word', {
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

      if (studioWindowRef.current) {
        gsap.fromTo(
          studioWindowRef.current,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            scrollTrigger: {
              trigger: studioWindowRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate mockup change
  useEffect(() => {
    if (!canvasContentRef.current) return;
    gsap.fromTo(
      canvasContentRef.current,
      { opacity: 0.6, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
    );
  }, [activePlatform]);

  const activeConfig = platformRegistry[activePlatform];
  const MockupComponent = activeConfig?.component;
  const platformContent = sampleCampaign.content[activePlatform];

  return (
    <section
      id="product"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#0A0A0A] text-white relative overflow-hidden border-b border-black sm-dot-grid-dark"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 -top-[10%] -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #D4A72C 0%, rgba(212, 167, 44, 0.1) 60%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#D4A72C] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
            <span>03 / CAMPAIGN STUDIO WORKSPACE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.03em] leading-tight">
            <span className="block overflow-hidden">
              <span className="showcase-heading-word inline-block mr-3">One</span>
              <span className="showcase-heading-word inline-block">campaign.</span>
            </span>
            <span className="block overflow-hidden text-[#D4A72C]">
              <span className="showcase-heading-word inline-block mr-3">Built</span>
              <span className="showcase-heading-word inline-block mr-3">for</span>
              <span className="showcase-heading-word inline-block mr-3">every</span>
              <span className="showcase-heading-word inline-block">feed.</span>
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/60 max-w-2xl font-normal leading-relaxed">
            Inspect the live Campaign Studio below. Switch between platforms in real-time to preview native aspect ratios, custom metadata, and tailored captions.
          </p>
        </div>

        {/* Live Studio Frame Container */}
        <div
          ref={studioWindowRef}
          className="rounded-3xl border border-white/15 bg-[#111111] shadow-[0_24px_60px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Studio Window Bar */}
          <div className="bg-[#181818] px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-white font-bold">SocialMock Campaign Studio</span>
                <span className="text-white/40">/</span>
                <span className="text-[#D4A72C]">AI ARENA 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                <span>Auto-Save Active</span>
              </span>
              {onOpenExport && (
                <button
                  type="button"
                  onClick={onOpenExport}
                  className="px-3 py-1 rounded-md bg-white/10 hover:bg-[#D4A72C] text-white hover:text-[#0A0A0A] text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 border border-white/15 hover:border-[#D4A72C]"
                >
                  <Download className="w-3 h-3 text-[#D4A72C] group-hover:text-[#0A0A0A]" />
                  <span>Export Post</span>
                </button>
              )}
              <button
                type="button"
                onClick={onCreateCampaign}
                className="px-3 py-1 rounded-md bg-[#D4A72C] text-[#0A0A0A] text-xs font-bold font-mono uppercase tracking-wider hover:bg-[#E7C45A] transition-colors cursor-pointer"
              >
                Open Studio →
              </button>
            </div>
          </div>

          {/* Studio 3-Column Demonstration View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* 1. Format Selector Column */}
            <div className="lg:col-span-3 bg-[#141414] p-4 border-b lg:border-b-0 lg:border-r border-white/10 select-none">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[10px] font-mono font-bold tracking-widest uppercase text-white/50">
                <span>FORMAT SPECS</span>
                <span className="text-[#D4A72C]">6 LIVE</span>
              </div>

              <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
                {formatTabs.map((tab) => {
                  const isActive = activePlatform === tab.id;
                  const config = platformRegistry[tab.id];

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActivePlatform(tab.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 lg:shrink cursor-pointer text-left ${
                        isActive
                          ? 'bg-white/10 text-[#D4A72C] font-bold border border-[#D4A72C]/40 shadow-xs'
                          : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`font-mono text-[11px] ${
                            isActive ? 'text-[#D4A72C] font-black' : 'text-white/40'
                          }`}
                        >
                          {tab.number}
                        </span>
                        <span>{tab.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-white/40 ml-2">
                        {config?.aspectRatio}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden lg:block mt-8 p-3.5 rounded-xl bg-white/5 border border-white/10 text-left space-y-1">
                <span className="text-[10px] font-mono text-[#D4A72C] uppercase font-bold tracking-wider">
                  NATIVE ADAPTATION
                </span>
                <p className="text-[11px] text-white/60 leading-relaxed font-normal">
                  Each format adapts character limits, link card metadata, and visual ratios automatically.
                </p>
              </div>
            </div>

            {/* 2. Center Stage Canvas */}
            <div className="lg:col-span-6 bg-[#0E0E0E] p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-full flex items-center justify-between mb-4 text-[11px] font-mono text-white/50 border-b border-white/5 pb-2">
                <span>PREVIEW / {activeConfig?.name}</span>
                <span className="text-[#D4A72C] font-bold">{activeConfig?.resolution}</span>
              </div>

              <div
                ref={canvasContentRef}
                className="w-full max-h-[500px] overflow-y-auto flex items-center justify-center p-2"
              >
                {MockupComponent && (
                  <MockupComponent campaign={sampleCampaign} content={platformContent} />
                )}
              </div>
            </div>

            {/* 3. Studio Inspector & Metadata Panel */}
            <div className="lg:col-span-3 bg-[#141414] p-5 border-t lg:border-t-0 lg:border-l border-white/10 text-left space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] font-mono font-bold tracking-widest uppercase text-white/50">
                <span>INSPECTOR</span>
                <span className="text-[#D4A72C]">STUDIO ENGINE</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-white/50 tracking-wider">
                  TARGET SPEC
                </label>
                <p className="text-xs font-bold text-white font-mono">
                  {activeConfig?.name} · {activeConfig?.aspectRatio}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-white/50 tracking-wider">
                  CANVAS RESOLUTION
                </label>
                <p className="text-xs font-bold text-[#D4A72C] font-mono">
                  {activeConfig?.resolution}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="text-[10px] font-mono uppercase text-white/50 tracking-wider">
                  BRAND PALETTE ACCENT
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#D4A72C] border border-white/20 shrink-0" />
                  <span className="text-xs font-mono font-bold text-white">#D4A72C (Warm Gold)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
                  <span>Real-time Studio Sync</span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed font-normal">
                  Create your own event to edit headlines, adjust branding, and preview your campaign across all feeds.
                </p>
                <button
                  type="button"
                  onClick={onCreateCampaign}
                  className="w-full mt-2 py-2 rounded-lg bg-white/10 hover:bg-[#D4A72C] text-white hover:text-[#0A0A0A] font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  Create Your Campaign →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
