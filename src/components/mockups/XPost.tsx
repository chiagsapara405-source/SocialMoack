import React from 'react';
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  CheckCircle2,
  MoreHorizontal,
  Calendar,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Campaign, TwitterContent } from '../../types/campaign';

interface XPostProps {
  campaign: Campaign;
  content: TwitterContent;
}

export const XPost: React.FC<XPostProps> = ({ campaign, content }) => {
  const { event, assets, brand } = campaign;
  const username = brand.socialHandle
    ? brand.socialHandle.replace(/^@/, '')
    : (event.organizer || 'techminds').toLowerCase().replace(/\s+/g, '');

  const displayName = event.organizer || 'Tech Minds Club';

  return (
    <div className="w-full max-w-[480px] mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden select-none text-[#0F172A] text-left">
      <div className="p-4 sm:p-5 space-y-3">
        {/* 1. Header: Avatar + Display Name + Handle + Verified Badge */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
              {assets.logo ? (
                <img
                  src={assets.logo}
                  alt={displayName}
                  className="w-full h-full object-contain rounded-full"
                />
              ) : (
                <div
                  className="w-full h-full rounded-full text-white font-bold text-xs flex items-center justify-center"
                  style={{ backgroundColor: brand.primaryColor }}
                >
                  {displayName.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="min-w-0 leading-tight">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-[#0F172A] truncate">
                  {displayName}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9BF0] shrink-0" />
              </div>
              <p className="text-xs text-slate-500 font-mono truncate">
                @{username}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Tweet Body Text */}
        <p className="text-sm text-slate-900 whitespace-pre-line leading-relaxed font-normal">
          {content.text}
        </p>

        {/* Hashtags */}
        {content.hashtags && content.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 text-xs font-mono font-medium text-[#1D9BF0]">
            {content.hashtags.map((tag, idx) => (
              <span key={idx} className="hover:underline cursor-pointer">
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        )}

        {/* 3. Media Embed (16:9 Aspect Ratio) */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-950 aspect-[16/9] relative">
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
                background: `linear-gradient(135deg, #0B1020 0%, #17182E 50%, ${brand.primaryColor} 100%)`,
              }}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 backdrop-blur-md text-[10px] font-mono uppercase font-bold text-purple-200">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Official Event</span>
                </span>
                <span className="font-mono text-[10px] text-slate-300">
                  {event.date || 'OCTOBER 2026'}
                </span>
              </div>

              <div>
                <p className="text-[10px] uppercase font-mono tracking-widest text-slate-300">
                  {displayName}
                </p>
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-snug line-clamp-2">
                  {event.name || 'AI Hackathon 2026'}
                </h3>
                {event.venue && (
                  <p className="text-[11px] text-slate-300 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#1D9BF0]" /> {event.venue}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs pt-1.5 border-t border-white/15">
                <span className="text-[10px] font-mono text-slate-400">
                  {event.audience || 'Registration Open'}
                </span>
                <span className="text-[10px] font-mono font-bold text-white bg-white/20 px-2 py-0.5 rounded">
                  {event.cta || 'RSVP'} →
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 4. Timestamp & Views Metric */}
        <div className="py-2 border-b border-slate-100 flex items-center gap-2 text-xs font-mono text-slate-500">
          <span>{content.timestamp || '10:24 AM · Oct 15, 2026'}</span>
          <span>·</span>
          <span className="font-bold text-slate-800">{content.views || '16.8K'}</span>
          <span>Views</span>
        </div>

        {/* 5. Metrics & Action Bar */}
        <div className="pt-1 flex items-center justify-between text-slate-500 text-xs">
          <button
            type="button"
            className="flex items-center gap-1.5 hover:text-[#1D9BF0] transition-colors cursor-pointer group"
          >
            <div className="p-1.5 rounded-full group-hover:bg-[#1D9BF0]/10 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span>{content.replies}</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-pointer group"
          >
            <div className="p-1.5 rounded-full group-hover:bg-emerald-500/10 transition-colors">
              <Repeat2 className="w-4 h-4" />
            </div>
            <span>{content.retweets}</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 hover:text-rose-500 transition-colors cursor-pointer group"
          >
            <div className="p-1.5 rounded-full group-hover:bg-rose-500/10 transition-colors">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </div>
            <span className="text-rose-600 font-semibold">{content.likes}</span>
          </button>

          <button
            type="button"
            className="hover:text-[#1D9BF0] transition-colors cursor-pointer p-1.5 rounded-full hover:bg-[#1D9BF0]/10"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="hover:text-[#1D9BF0] transition-colors cursor-pointer p-1.5 rounded-full hover:bg-[#1D9BF0]/10"
          >
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
