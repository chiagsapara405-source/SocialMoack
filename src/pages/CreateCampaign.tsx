import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle2, Sparkles, ArrowRight, RefreshCw, Calendar, Clock, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { Campaign, CampaignFormData } from '../types/campaign';
import { EventForm } from '../components/campaign/EventForm';
import { CampaignPreview } from '../components/campaign/CampaignPreview';
import { saveCampaign } from '../utils/storage';
import { generateMockContent } from '../utils/contentGenerator';

interface CreateCampaignProps {
  onBack: () => void;
  onOpenStudio: (campaignId: string) => void;
}

const INITIAL_FORM_DATA: CampaignFormData = {
  name: '',
  description: '',
  date: '',
  time: '',
  venue: '',
  organizer: '',
  audience: '',
  cta: 'Register Now',
  posterFile: null,
  posterDataUrl: null,
  posterFileName: null,
  posterFileSize: null,
  logoFile: null,
  logoDataUrl: null,
  logoFileName: null,
  logoFileSize: null,
  primaryColor: '#7C3AED',
  secondaryColor: '#2563EB',
  socialHandle: '',
};

export const CreateCampaign: React.FC<CreateCampaignProps> = ({
  onBack,
  onOpenStudio,
}) => {
  const [formData, setFormData] = useState<CampaignFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [createdCampaign, setCreatedCampaign] = useState<Campaign | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formColumnRef = useRef<HTMLDivElement>(null);
  const previewColumnRef = useRef<HTMLDivElement>(null);
  const successStateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(headerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
      });

      tl.from(
        formColumnRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.55,
        },
        '-=0.3'
      );

      tl.from(
        previewColumnRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.55,
        },
        '-=0.35'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleUpdateField = <K extends keyof CampaignFormData>(
    field: K,
    value: CampaignFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { name?: string; description?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Event name is required.';
      const el = document.getElementById('field-name');
      if (el) {
        gsap.fromTo(el, { x: -6 }, { x: 6, duration: 0.08, repeat: 4, yoyo: true, ease: 'sine.inOut' });
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required.';
      const el = document.getElementById('field-description');
      if (el) {
        gsap.fromTo(el, { x: -6 }, { x: 6, duration: 0.08, repeat: 4, yoyo: true, ease: 'sine.inOut' });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsGenerating(true);

    const campaignId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `camp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const eventData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      date: formData.date.trim(),
      time: formData.time.trim(),
      venue: formData.venue.trim(),
      organizer: formData.organizer.trim(),
      audience: formData.audience.trim(),
      cta: formData.cta.trim() || 'Register Now',
    };

    const brandData = {
      primaryColor: formData.primaryColor,
      secondaryColor: formData.secondaryColor,
      socialHandle: formData.socialHandle.trim(),
    };

    const newCampaign: Campaign = {
      id: campaignId,
      event: eventData,
      assets: {
        poster: formData.posterDataUrl,
        logo: formData.logoDataUrl,
      },
      brand: brandData,
      content: generateMockContent(eventData, brandData),
      createdAt: new Date().toISOString(),
    };

    const saveResult = saveCampaign(newCampaign);

    setTimeout(() => {
      setIsGenerating(false);
      if (saveResult.success) {
        setCreatedCampaign(newCampaign);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(saveResult.error || 'Failed to save campaign to browser storage.');
      }
    }, 600);
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setCreatedCampaign(null);
    setErrors({});
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F7F8FC] pb-24 text-left">
      {/* Top Bar with Back Button */}
      <div className="border-b border-[#E5E7EB] bg-white sticky top-0 z-30 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0B1020] hover:text-[#7C3AED] transition-colors py-1 cursor-pointer uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Overview</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
            <span className="text-[11px] font-mono text-[#667085] uppercase">
              CAMPAIGN GENERATOR
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* Campaign Ready / Saved State */}
        {createdCampaign ? (
          <div
            ref={successStateRef}
            className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E7EB] shadow-lg text-center space-y-8 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-2xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                CAMPAIGN SAVED ✓
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1020] mt-3 tracking-tight">
                Campaign information saved.
              </h2>
              <p className="text-sm text-[#667085] mt-1">
                Your social campaign is ready to generate in the Studio.
              </p>
            </div>

            {/* Campaign Summary snippet */}
            <div className="bg-[#F7F8FC] rounded-2xl p-5 border border-slate-200 text-left space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-mono text-slate-500 uppercase">Event Title</span>
                <span className="text-xs font-bold text-[#0B1020] truncate max-w-[240px]">
                  {createdCampaign.event.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-1.5 truncate">
                  <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span className="truncate">{createdCampaign.event.date || 'Date not set'}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span className="truncate">{createdCampaign.event.venue || 'Venue not set'}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>ID: {createdCampaign.id.substring(0, 16)}...</span>
                <span>PERSISTED IN STORAGE</span>
              </div>
            </div>

            {/* Next actions */}
            <div className="space-y-3">
              <button
                onClick={() => onOpenStudio(createdCampaign.id)}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#0B1020] hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Continue to Campaign Studio</span>
                <ArrowRight className="w-4 h-4 text-[#7C3AED]" />
              </button>

              <div className="flex items-center justify-center gap-4 pt-2 text-xs font-mono">
                <button
                  onClick={handleResetForm}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#0B1020] transition-colors py-1.5 px-2 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Create Another</span>
                </button>
                <span className="text-slate-300">·</span>
                <button
                  onClick={onBack}
                  className="text-slate-600 hover:text-[#0B1020] transition-colors py-1.5 px-2 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  Return to Overview
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Page Header */}
            <div ref={headerRef} className="max-w-3xl mb-10 text-left">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-[#7C3AED] bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200/60 mb-3">
                <span>✦ EVENT INITIALIZATION / 01</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] tracking-tight leading-tight">
                Create Your Campaign
              </h1>
              <p className="mt-3 text-base text-[#667085] leading-relaxed">
                Tell us about your event and we'll prepare everything you need for your social media campaign.
              </p>
            </div>

            {/* Desktop Two-Column Layout (50% Form, 50% Live Preview) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Event Details Form */}
              <div ref={formColumnRef} className="lg:col-span-7">
                <EventForm
                  formData={formData}
                  errors={errors}
                  isGenerating={isGenerating}
                  onUpdateField={handleUpdateField}
                  onSubmit={handleSubmit}
                />
              </div>

              {/* Right Column: Live Generic Campaign Preview */}
              <div ref={previewColumnRef} className="lg:col-span-5">
                <CampaignPreview formData={formData} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
