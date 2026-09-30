import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FormatItem {
  id: string;
  number: string;
  name: string;
  type: string;
  aspect: string;
  resolution: string;
  description: string;
  previewHeadline: string;
  previewHook: string;
}

const formatList: FormatItem[] = [
  {
    id: 'instagram',
    number: '01',
    name: 'Instagram Post',
    type: 'Square Feed',
    aspect: '1:1',
    resolution: '1080 × 1080 px',
    description: 'High-contrast square composition with bold typography, event dates, and clustered hashtags.',
    previewHeadline: 'AI ARENA 2026: Official Announcement',
    previewHook: 'Join 1,200+ creators, students, and engineers in San Francisco this October. Registration is live.',
  },
  {
    id: 'story',
    number: '02',
    name: 'Instagram Story',
    type: 'Vertical Full-Frame',
    aspect: '9:16',
    resolution: '1080 × 1920 px',
    description: 'Full-bleed mobile format for countdown badges, keynote speaker announcements, and direct swipe-up actions.',
    previewHeadline: 'LIMITED TICKETS: 48 HOURS LEFT',
    previewHook: 'Swipe up to claim student registration before pass tiers sell out.',
  },
  {
    id: 'linkedin',
    number: '03',
    name: 'LinkedIn Post',
    type: 'Professional Article Card',
    aspect: '1.91:1',
    resolution: '1200 × 627 px',
    description: 'Polished B2B tone highlighting academic partnerships, keynote speakers, and organizational impact.',
    previewHeadline: 'Announcing Our 2026 Keynote Speaker Lineup',
    previewHook: 'Pleased to welcome visionary founders exploring the future of autonomous intelligence systems.',
  },
  {
    id: 'x',
    number: '04',
    name: 'X (Twitter)',
    type: 'Microblog Embed',
    aspect: '16:9',
    resolution: '1200 × 675 px',
    description: 'Punchy breaking announcements structured for live retweets, thread engagement, and immediate RSVP links.',
    previewHeadline: 'AI Arena passes just went live.',
    previewHook: '48 hours until regular registration closes. Reserve your seat 👇',
  },
  {
    id: 'facebook',
    number: '05',
    name: 'Facebook Event',
    type: 'Event Page & Group Feed',
    aspect: '16:9',
    resolution: '1200 × 630 px',
    description: 'Community-oriented invitations with RSVP actions, calendar date badge, and venue directions.',
    previewHeadline: 'Community Gathering: AI Arena 2026',
    previewHook: 'Join our local campus community for a weekend of rapid prototyping and hackathon demos.',
  },
  {
    id: 'whatsapp',
    number: '06',
    name: 'WhatsApp Broadcast',
    type: 'Direct Chat Link Card',
    aspect: 'Chat Feed',
    resolution: 'Native Link Card',
    description: 'Direct messaging cards with formatted invite text, one-click RSVP links, and attendee confirmation.',
    previewHeadline: 'Exclusive Priority Invitation',
    previewHook: 'Hi there! Your priority invitation code for AI Arena 2026 is confirmed.',
  },
];

export const Platforms: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<FormatItem>(formatList[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const previewBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.format-heading-word', {
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

      gsap.from('.format-nav-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 24,
        stagger: 0.07,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!previewBoxRef.current) return;
    gsap.fromTo(
      previewBoxRef.current,
      { opacity: 0.7, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.22, ease: 'power2.out' }
    );
  }, [selectedFormat.id]);

  return (
    <section
      id="platforms"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#FAFAF8] text-[#111111] relative overflow-hidden border-b border-[rgba(10,10,10,0.08)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(10,10,10,0.12)] text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#6B6B67] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
            <span>04 / SOCIAL FORMATS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0A0A0A] tracking-[-0.03em] leading-tight">
            <span className="block overflow-hidden">
              <span className="format-heading-word inline-block mr-3">Engineered</span>
              <span className="format-heading-word inline-block mr-3">for</span>
              <span className="format-heading-word inline-block">every</span>
            </span>
            <span className="block overflow-hidden text-[#D4A72C]">
              <span className="format-heading-word inline-block mr-3">native</span>
              <span className="format-heading-word inline-block">format.</span>
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6B6B67] max-w-xl font-normal leading-relaxed">
            Select any channel below to examine aspect ratios, character considerations, and visual layout.
          </p>
        </div>

        {/* Editorial Horizontal Format Grid + Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Format Selection List (6 items) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {formatList.map((item) => {
              const isSelected = selectedFormat.id === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedFormat(item)}
                  className={`format-nav-item p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-md'
                      : 'bg-white text-[#111111] border-[rgba(10,10,10,0.1)] hover:border-[#D4A72C]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#D4A72C] text-[#0A0A0A]'
                          : 'bg-[#FAFAF8] text-[#0A0A0A] border border-[rgba(10,10,10,0.1)]'
                      }`}
                    >
                      {item.number}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight">
                        {item.name}
                      </h4>
                      <p
                        className={`text-[11px] font-mono ${
                          isSelected ? 'text-white/60' : 'text-[#6B6B67]'
                        }`}
                      >
                        {item.type}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/10 text-[#D4A72C]'
                          : 'bg-[#FAFAF8] text-[#6B6B67] border border-[rgba(10,10,10,0.08)]'
                      }`}
                    >
                      {item.aspect}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Preview Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(10,10,10,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(10,10,10,0.08)] mb-6 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A72C]" />
                <span className="font-bold text-[#0A0A0A] uppercase">{selectedFormat.name} SPEC</span>
              </div>
              <span className="bg-[#FAFAF8] px-2.5 py-1 rounded text-[#0A0A0A] font-semibold border border-[rgba(10,10,10,0.08)]">
                {selectedFormat.resolution}
              </span>
            </div>

            <div ref={previewBoxRef} className="space-y-4">
              {/* Graphic Banner Simulation */}
              <div className="aspect-[16/9] rounded-2xl bg-[#0A0A0A] p-6 text-white flex flex-col justify-between border border-black/10 relative overflow-hidden">
                <div className="flex justify-between items-start text-[10px] font-mono text-white/70">
                  <span className="px-2 py-0.5 rounded bg-white/10">01 OCT · RKU GRAND HALL</span>
                  <span className="text-[#D4A72C] font-bold">PASS RELEASE</span>
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase text-[#D4A72C] tracking-widest mb-1">
                    KEYNOTE GATHERING
                  </p>
                  <p className="text-xl sm:text-2xl font-black tracking-tight leading-tight uppercase">
                    {selectedFormat.previewHeadline}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
                  <span>Student AI Consortium</span>
                  <span className="text-white font-bold">RSVP LIVE →</span>
                </div>
              </div>

              {/* Specification description */}
              <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[rgba(10,10,10,0.08)] space-y-2">
                <p className="text-xs text-[#111111] font-medium leading-relaxed">
                  {selectedFormat.previewHook}
                </p>
                <p className="text-[11px] text-[#6B6B67] leading-relaxed">
                  {selectedFormat.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#6B6B67]">
                <span>All 6 platforms available in Campaign Studio</span>
                <span className="text-[#0A0A0A] font-bold flex items-center gap-1">
                  100% Native Spec ✓
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
