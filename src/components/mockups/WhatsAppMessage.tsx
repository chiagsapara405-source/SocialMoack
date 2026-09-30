import React from 'react';
import {
  CheckCheck,
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Calendar,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Campaign, WhatsAppContent } from '../../types/campaign';

interface WhatsAppMessageProps {
  campaign: Campaign;
  content: WhatsAppContent;
}

export const WhatsAppMessage: React.FC<WhatsAppMessageProps> = ({ campaign, content }) => {
  const { event, assets, brand } = campaign;
  const contactName = event.organizer || 'Event Organizer';

  // Format WhatsApp markdown: replace *text* with <strong>text</strong>
  const formatWhatsAppText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <strong key={index} className="font-bold text-[#0F172A]">
            {part.slice(1, -1)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full max-w-[440px] mx-auto bg-[#EFEAE2] rounded-3xl border border-slate-300 shadow-2xl overflow-hidden select-none text-[#0F172A] text-left flex flex-col justify-between aspect-[9/14] sm:aspect-[9/13]">
      {/* 1. WhatsApp Top Contact Bar */}
      <div className="bg-[#075E54] text-white px-3.5 py-2.5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <ArrowLeft className="w-4 h-4 cursor-pointer" />
          <div className="w-9 h-9 rounded-full bg-white p-0.5 overflow-hidden shrink-0 flex items-center justify-center">
            {assets.logo ? (
              <img
                src={assets.logo}
                alt={contactName}
                className="w-full h-full object-contain rounded-full"
              />
            ) : (
              <div
                className="w-full h-full rounded-full text-white font-bold text-xs flex items-center justify-center"
                style={{ backgroundColor: brand.primaryColor }}
              >
                {contactName.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold truncate leading-tight">
              {contactName}
            </h4>
            <p className="text-[10px] text-emerald-100 truncate">
              Official Broadcast Channel
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-emerald-100">
          <Video className="w-4 h-4 cursor-pointer hover:text-white" />
          <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
          <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* 2. Chat Canvas Wallpaper with Bubble */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto flex flex-col justify-center space-y-3">
        {/* Date Stamp Pill */}
        <div className="self-center bg-white/80 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[10px] font-mono text-slate-500 shadow-2xs">
          TODAY
        </div>

        {/* Message Bubble (Incoming style with rich link preview) */}
        <div className="self-start max-w-[94%] bg-white rounded-2xl rounded-tl-xs p-2.5 shadow-sm border border-slate-200/60 space-y-2">
          {/* Rich Event Link Preview Card */}
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
            <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
              {assets.poster ? (
                <img
                  src={assets.poster}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full p-4 flex flex-col justify-between text-white"
                  style={{
                    background: `linear-gradient(135deg, #075E54 0%, #128C7E 60%, ${brand.primaryColor} 100%)`,
                  }}
                >
                  <span className="text-[9px] font-mono uppercase bg-black/40 px-2 py-0.5 rounded self-start">
                    INVITATION PASS
                  </span>
                  <div>
                    <h5 className="font-bold text-sm leading-tight uppercase line-clamp-1">
                      {event.name || 'AI Hackathon 2026'}
                    </h5>
                    <p className="text-[10px] text-emerald-100 mt-0.5">
                      {event.date || 'OCTOBER 2026'} · {event.venue || 'Virtual & Onsite'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-2.5 bg-slate-100/70 border-t border-slate-200">
              <p className="text-xs font-bold text-[#0F172A] truncate">
                {content.cardTitle || `${event.name} Official RSVP`}
              </p>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {content.cardDescription || `Click to view registration passes and schedule.`}
              </p>
              <p className="text-[10px] text-emerald-700 font-mono mt-1">
                https://events.rsvp/{contactName.toLowerCase().replace(/\s+/g, '')}
              </p>
            </div>
          </div>

          {/* Formatted Message Body Text */}
          <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed px-1">
            {formatWhatsAppText(content.messageBody)}
          </div>

          {/* Timestamp and Delivery Checkmarks */}
          <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 font-mono px-1">
            <span>{content.timestamp || '10:45 AM'}</span>
            <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
          </div>
        </div>

        {/* Quick Action Button Pill */}
        <div className="self-start pl-1">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <span>👉 {content.ctaText || 'Register Now'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 3. Bottom Input Mock Bar */}
      <div className="p-2 bg-[#F0F2F5] border-t border-slate-200 flex items-center gap-2 shrink-0">
        <button type="button" className="p-1 text-slate-500 hover:text-slate-700">
          <Smile className="w-5 h-5" />
        </button>
        <button type="button" className="p-1 text-slate-500 hover:text-slate-700">
          <Paperclip className="w-5 h-5" />
        </button>
        <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-slate-400 border border-slate-300 shadow-2xs">
          Type a message
        </div>
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-[#128C7E] text-white flex items-center justify-center shadow-xs"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
