import React from 'react';
import { Calendar, Clock, MapPin, Users, Building, ArrowUpRight, Sparkles } from 'lucide-react';
import { CampaignFormData } from '../../types/campaign';

interface CampaignPreviewProps {
  formData: CampaignFormData;
}

export const CampaignPreview: React.FC<CampaignPreviewProps> = ({ formData }) => {
  const {
    name,
    description,
    date,
    time,
    venue,
    organizer,
    audience,
    cta,
    posterDataUrl,
    logoDataUrl,
    primaryColor,
    secondaryColor,
    socialHandle,
  } = formData;

  const hasEventInfo = name || description || date || venue || organizer;

  return (
    <div className="sticky top-24 space-y-4">
      {/* Top Header Label */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Live Campaign Preview
          </span>
        </div>
        <span className="text-xs text-[#64748B] bg-slate-100 px-2.5 py-0.5 rounded-full font-medium">
          Updates instantly
        </span>
      </div>

      {/* Main Campaign Card */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl overflow-hidden transition-all duration-300">
        {/* Poster / Visual Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
          {posterDataUrl ? (
            <img
              src={posterDataUrl}
              alt="Event Poster"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
            />
          ) : (
            <div
              className="w-full h-full p-6 flex flex-col justify-between text-white relative"
              style={{
                background: `linear-gradient(135deg, #09090B 0%, #1E1B4B 50%, ${primaryColor} 100%)`,
              }}
            >
              {/* Subtle background glow */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-2xl opacity-40 pointer-events-none"
                style={{ backgroundColor: secondaryColor }}
              />

              <div className="flex items-start justify-between relative z-10">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15">
                  <Sparkles className="w-3 h-3 text-purple-300" />
                  <span>Official Event</span>
                </span>

                {logoDataUrl && (
                  <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={logoDataUrl}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="relative z-10">
                <p className="text-xs font-medium text-slate-300 tracking-wider uppercase mb-1">
                  {organizer || 'Host Organization'}
                </p>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight line-clamp-2">
                  {name || 'AI Hackathon 2026'}
                </h3>
              </div>
            </div>
          )}

          {/* Social Handle Watermark if provided */}
          {socialHandle && (
            <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90">
              {socialHandle}
            </div>
          )}
        </div>

        {/* Card Content Details */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Organizer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3 min-w-0">
              {logoDataUrl ? (
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={logoDataUrl}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div
                  className="w-9 h-9 rounded-xl text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  {(organizer ? organizer.slice(0, 2) : 'EV').toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#0F172A] truncate">
                  {organizer || 'Tech Minds Club'}
                </p>
                <p className="text-[11px] text-[#64748B]">
                  Campaign Host {socialHandle ? `· ${socialHandle}` : ''}
                </p>
              </div>
            </div>

            {audience && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-medium shrink-0">
                <Users className="w-3 h-3 text-slate-500" />
                <span>{audience}</span>
              </span>
            )}
          </div>

          {/* Title & Description */}
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
              {name || 'Your Event Title Will Appear Here'}
            </h2>
            <p className="mt-2 text-sm text-[#64748B] leading-relaxed line-clamp-3">
              {description ||
                'Tell us what this event is about... The description and key highlights will show here and inform platform-tailored post captions.'}
            </p>
          </div>

          {/* Event Meta Badges / Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50/80 rounded-xl p-2.5 border border-slate-100">
              <Calendar
                className="w-4 h-4 shrink-0"
                style={{ color: primaryColor }}
              />
              <span className="truncate font-medium">
                {date || '15 October 2026'}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50/80 rounded-xl p-2.5 border border-slate-100">
              <Clock
                className="w-4 h-4 shrink-0"
                style={{ color: primaryColor }}
              />
              <span className="truncate font-medium">
                {time || '10:00 AM'}
              </span>
            </div>

            <div className="sm:col-span-2 flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50/80 rounded-xl p-2.5 border border-slate-100">
              <MapPin
                className="w-4 h-4 shrink-0"
                style={{ color: primaryColor }}
              />
              <span className="truncate font-medium">
                {venue || 'RK University, Silicon Valley Campus'}
              </span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              type="button"
              className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-default pointer-events-none"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 4px 14px 0 ${primaryColor}40`,
              }}
            >
              <span>{cta || 'Register Now'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer info in preview */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#64748B]">
          <span>Single Campaign Foundation</span>
          <span className="font-semibold text-slate-700">Pre-generation stage</span>
        </div>
      </div>
    </div>
  );
};
