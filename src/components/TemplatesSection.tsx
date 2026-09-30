import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Layers, Layout } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TemplateCard {
  id: string;
  name: string;
  category: string;
  aspectClass: string;
  description: string;
  renderPreview: () => React.ReactNode;
}

interface TemplatesSectionProps {
  onSelectTemplate?: () => void;
}

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({ onSelectTemplate }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.templates-heading-word', {
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

      gsap.from('.template-grid-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 45,
        scale: 0.96,
        stagger: 0.1,
        duration: 0.75,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const templates: TemplateCard[] = [
    {
      id: 'classic',
      name: 'EDITORIAL CLASSIC',
      category: 'Conference & Symposium',
      aspectClass: 'md:col-span-7 min-h-[360px]',
      description: 'Balanced typographic rhythm designed for academic keynotes and formal organizational releases.',
      renderPreview: () => (
        <div className="w-full h-full bg-[#FAFAF8] p-6 rounded-2xl border border-[rgba(10,10,10,0.1)] flex flex-col justify-between text-left">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(10,10,10,0.08)]">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B6B67]">
              FORUM · 2026
            </span>
            <span className="text-[10px] font-mono font-bold text-[#D4A72C]">
              NO. 01 / EDITORIAL
            </span>
          </div>

          <div className="my-6 space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4A72C]">
              Special Keynote Address
            </p>
            <h4 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight leading-tight">
              AUTONOMOUS SYSTEMS & HUMAN AGENCY
            </h4>
            <p className="text-xs text-[#6B6B67] leading-relaxed max-w-md">
              A curated gathering of researchers, developers, and philosophers exploring machine agency.
            </p>
          </div>

          <div className="pt-3 border-t border-[rgba(10,10,10,0.08)] flex items-center justify-between text-[11px] font-mono text-[#0A0A0A]">
            <span>15 OCT · GRAND CONCOURSE</span>
            <span className="font-bold underline decoration-[#D4A72C]">SECURE PASS →</span>
          </div>
        </div>
      ),
    },
    {
      id: 'bold',
      name: 'HIGH IMPACT BOLD',
      category: 'Hackathon & Challenge',
      aspectClass: 'md:col-span-5 min-h-[360px]',
      description: 'Maximum contrast black canvas with warm gold typography built to stop the scroll.',
      renderPreview: () => (
        <div className="w-full h-full bg-[#0A0A0A] p-6 rounded-2xl border border-white/10 flex flex-col justify-between text-left text-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#D4A72C] bg-white/10 px-2 py-0.5 rounded">
              36 HOURS
            </span>
            <span className="text-[10px] font-mono text-white/50">BUILD SPRINT</span>
          </div>

          <div className="my-4">
            <p className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none text-white">
              BUILD WITH <br />
              <span className="text-[#D4A72C]">MODELS</span>
            </p>
            <p className="text-xs font-mono text-white/60 mt-3">
              $50,000 In Prizes · San Francisco
            </p>
          </div>

          <div className="w-full bg-[#D4A72C] text-[#0A0A0A] text-center font-bold font-mono text-xs py-2 rounded-lg">
            RSVP FOR SPRINT →
          </div>
        </div>
      ),
    },
    {
      id: 'minimal',
      name: 'TECHNICAL MINIMAL',
      category: 'Developer Workshop',
      aspectClass: 'md:col-span-5 min-h-[340px]',
      description: 'Stripped-down monospace design with clear code blocks and structured timestamps.',
      renderPreview: () => (
        <div className="w-full h-full bg-white p-6 rounded-2xl border border-[rgba(10,10,10,0.12)] flex flex-col justify-between text-left">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#6B6B67]">
            <span>// WORKSHOP_SPEC</span>
            <span className="text-[#0A0A0A] font-bold">V.2.4</span>
          </div>

          <div className="my-4 space-y-2 font-mono">
            <p className="text-sm font-bold text-[#0A0A0A]">
              &gt; npm run start:hackathon
            </p>
            <div className="p-3 rounded-lg bg-[#FAFAF8] border border-[rgba(10,10,10,0.08)] text-[11px] text-[#6B6B67] space-y-1">
              <p>date: "15 Oct 2026"</p>
              <p>venue: "RK University Quad"</p>
              <p className="text-[#D4A72C] font-bold">status: "registration_open"</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#0A0A0A]">
            <span>Hands-on Engineering</span>
            <span className="font-bold">Register Now →</span>
          </div>
        </div>
      ),
    },
    {
      id: 'event',
      name: 'FESTIVAL & SUMMIT',
      category: 'Community Showcase',
      aspectClass: 'md:col-span-7 min-h-[340px]',
      description: 'Dynamic gradient flow with multi-speaker slots and attendance badges.',
      renderPreview: () => (
        <div className="w-full h-full bg-gradient-to-br from-[#111111] via-[#0A0A0A] to-[#181818] p-6 rounded-2xl border border-white/10 flex flex-col justify-between text-left text-white">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#D4A72C]/20 text-[#D4A72C] border border-[#D4A72C]/30 font-bold">
              SUMMIT ARENA
            </span>
            <span className="text-white/60">OCTOBER 2026</span>
          </div>

          <div className="my-4 space-y-1">
            <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
              DESIGNERS & BUILDERS SUMMIT
            </h4>
            <p className="text-xs text-white/60 font-mono">
              24 Sessions · 12 Keynotes · 1,500 Attendees
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-white/70">Main Stage Passes</span>
            <span className="text-[#D4A72C] font-bold flex items-center gap-1">
              Claim Access <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="templates"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#FAFAF8] text-[#111111] relative overflow-hidden border-b border-[rgba(10,10,10,0.08)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(10,10,10,0.12)] text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#6B6B67] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
            <span>05 / CAMPAIGN PRESETS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0A0A0A] tracking-[-0.03em] leading-tight">
            <span className="block overflow-hidden">
              <span className="templates-heading-word inline-block mr-3">Articulated</span>
              <span className="templates-heading-word inline-block mr-3">styles</span>
              <span className="templates-heading-word inline-block">for</span>
            </span>
            <span className="block overflow-hidden text-[#D4A72C]">
              <span className="templates-heading-word inline-block mr-3">every</span>
              <span className="templates-heading-word inline-block">occasion.</span>
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6B6B67] max-w-xl font-normal leading-relaxed">
            Choose from distinct visual treatments. Each preset formats typography, negative space, and badges for instant feed recognition.
          </p>
        </div>

        {/* Asymmetrical 2x2 Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={onSelectTemplate}
              className={`template-grid-card ${tpl.aspectClass} cursor-pointer group transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="h-full flex flex-col justify-between">
                {tpl.renderPreview()}

                <div className="mt-3 flex items-center justify-between text-xs px-1">
                  <div>
                    <span className="font-bold text-[#0A0A0A] tracking-wide text-xs">
                      {tpl.name}
                    </span>
                    <span className="text-[#6B6B67] ml-2 text-[11px] font-mono">
                      · {tpl.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#D4A72C] font-bold group-hover:underline flex items-center gap-1">
                    Apply Preset →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
