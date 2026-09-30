import React from 'react';
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Globe,
  Star,
  Calendar,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Campaign, FacebookContent } from '../../types/campaign';

interface FacebookPostProps {
  campaign: Campaign;
  content: FacebookContent;
}

export const FacebookPost: React.FC<FacebookPostProps> = ({ campaign, content }) => {
  const { event, assets, brand } = campaign;
  const pageName = event.organizer || 'Event Organizer';

  // Parse month and day for the classic Facebook event date block
  const dateStr = event.date || 'OCT 15';
  const monthMatch = dateStr.match(/[a-zA-Z]+/);
  const dayMatch = dateStr.match(/\d+/);
  const monthAbbr = monthMatch ? monthMatch[0].slice(0, 3).toUpperCase() : 'OCT';
  const dayNumber = dayMatch ? dayMatch[0] : '15';

  return (
    <div className="w-full max-w-[500px] mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden select-none text-[#0F172A] text-left">
      {/* 1. Page Header */}
      <div className="p-4 pb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
            {assets.logo ? (
              <img
                src={assets.logo}
                alt={pageName}
                className="w-full h-full object-contain rounded-full"
              />
            ) : (
              <div
                className="w-full h-full rounded-full text-white font-bold text-xs flex items-center justify-center"
                style={{ backgroundColor: brand.primaryColor }}
              >
                {pageName.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0 leading-tight">
            <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] hover:underline cursor-pointer truncate">
              {pageName}
            </h4>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
              <span>Yesterday at 2:45 PM</span>
              <span>·</span>
              <Globe className="w-3 h-3 text-slate-400" />
            </p>
          </div>
        </div>

        <button
          type="button"
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Post Primary Copy */}
      <div className="px-4 pb-3">
        <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-normal">
          {content.primaryText}
        </p>
      </div>

      {/* 3. Official Facebook Event Card Embed */}
      <div className="border-t border-b border-slate-200 bg-slate-50 overflow-hidden">
        {/* Poster Image Canvas */}
        <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
          {assets.poster ? (
            <img
              src={assets.poster}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full p-5 flex flex-col justify-between text-white relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #0B1020 0%, #161F38 50%, ${brand.primaryColor} 100%)`,
              }}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 backdrop-blur-md text-[10px] font-mono uppercase font-bold text-white">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Facebook Event</span>
                </span>
                <span className="text-[10px] font-mono text-purple-200">
                  {pageName}
                </span>
              </div>

              <div>
                <p className="text-[10px] uppercase font-mono tracking-widest text-slate-300 mb-0.5">
                  Official Gathering
                </p>
                <h3 className="text-xl font-black uppercase tracking-tight leading-snug line-clamp-2">
                  {content.eventTitle || event.name || 'AI Hackathon 2026'}
                </h3>
              </div>

              <div className="pt-2 border-t border-white/15 text-[11px] text-slate-300 flex items-center justify-between">
                <span>{event.audience || 'Public Community Event'}</span>
                <span className="font-bold text-white uppercase font-mono text-xs">
                  RSVP OPEN →
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Event Detail Metadata Box with Date Block */}
        <div className="p-3.5 bg-slate-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Classic Facebook Red/White Date Box */}
            <div className="w-11 h-12 rounded-lg bg-white border border-slate-300 shadow-2xs overflow-hidden flex flex-col text-center shrink-0">
              <span className="bg-rose-600 text-white font-black text-[9px] uppercase tracking-wider py-0.5">
                {monthAbbr}
              </span>
              <span className="text-[#0F172A] font-extrabold text-base leading-none my-auto">
                {dayNumber}
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wide truncate">
                {content.eventTimeLocation || `${event.date || 'Upcoming'} · ${event.venue || 'Event Venue'}`}
              </p>
              <h5 className="text-xs sm:text-sm font-bold text-[#0F172A] truncate">
                {content.eventTitle || event.name}
              </h5>
              <p className="text-[11px] text-slate-500 truncate">
                {content.interestedCount} people interested · {Math.round(content.interestedCount * 0.35)} going
              </p>
            </div>
          </div>

          {/* Interested / Going CTA Button */}
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#0F172A] text-xs font-bold border border-slate-300 shadow-2xs shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{content.cta || 'Interested'}</span>
          </button>
        </div>
      </div>

      {/* 4. Social Reactions Bar */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            <span className="w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[9px]">
              👍
            </span>
            <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[9px]">
              ❤️
            </span>
          </div>
          <span>{content.reactions}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span>{content.comments} comments</span>
          <span>{content.shares} shares</span>
        </div>
      </div>

      {/* 5. Actions Bar */}
      <div className="px-3 py-1 grid grid-cols-3 gap-1 text-slate-600 font-semibold text-xs text-center">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 py-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Like</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 py-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Comment</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 py-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};
