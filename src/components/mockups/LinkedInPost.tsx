import React from 'react';
import {
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  MoreHorizontal,
  Globe,
  Sparkles,
  Calendar,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Campaign, LinkedInContent } from '../../types/campaign';

interface LinkedInPostProps {
  campaign: Campaign;
  content: LinkedInContent;
}

export const LinkedInPost: React.FC<LinkedInPostProps> = ({ campaign, content }) => {
  const { event, assets, brand } = campaign;
  const authorName = event.organizer || 'Host Organization';

  return (
    <div className="w-full max-w-[520px] mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden select-none text-[#0F172A] text-left">
      {/* 1. Header */}
      <div className="p-4 pb-3 flex items-start justify-between gap-3 border-b border-slate-100">
        <div className="flex items-start gap-3 min-w-0">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
            {assets.logo ? (
              <img
                src={assets.logo}
                alt={authorName}
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div
                className="w-full h-full rounded-lg text-white font-black text-sm flex items-center justify-center"
                style={{ backgroundColor: brand.primaryColor }}
              >
                {authorName.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-bold text-[#0F172A] hover:text-[#0A66C2] transition-colors truncate">
                {authorName}
              </span>
              <span className="text-xs text-slate-400">• 1st</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">
              Official Host & Event Organizer · 34,200 followers
            </p>
            <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
              <span>3d • Edited</span>
              <span>•</span>
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

      {/* 2. Post Body Text */}
      <div className="p-4 pt-3 space-y-3">
        <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-normal">
          {content.content}
        </p>

        {/* Hashtags */}
        {content.hashtags && content.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold text-[#0A66C2]">
            {content.hashtags.map((tag, idx) => (
              <span key={idx} className="hover:underline cursor-pointer">
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3. Link Card Embed (1.91:1 standard aspect ratio) */}
      <div className="border-y border-slate-200/90 overflow-hidden bg-slate-50">
        <div className="relative aspect-[1.91/1] w-full bg-slate-950 overflow-hidden">
          {assets.poster ? (
            <img
              src={assets.poster}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full p-6 flex flex-col justify-between text-white relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #0B1020 0%, #161B33 50%, ${brand.primaryColor} 100%)`,
              }}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider font-bold">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Keynote Forum</span>
                </span>
                <span className="font-mono text-[10px] text-purple-200">
                  {event.date || 'OCT 2026'}
                </span>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-1">
                  {authorName}
                </p>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase leading-tight line-clamp-2">
                  {event.name || 'AI Hackathon 2026'}
                </h3>
                {event.venue && (
                  <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#2563EB]" /> {event.venue}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/15">
                <span className="text-[11px] text-slate-300">Official Registration Live</span>
                <span
                  className="px-3 py-1 rounded-md text-white font-bold text-xs uppercase tracking-wider shadow-xs"
                  style={{ backgroundColor: brand.secondaryColor }}
                >
                  {content.cta || 'Register'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Link metadata card below image */}
        <div className="p-3 bg-slate-50 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wide truncate">
              {content.articleCardDomain || 'techhorizons.org'}
            </p>
            <p className="text-xs font-bold text-[#0F172A] truncate">
              {content.articleCardTitle || `${event.name} — Registration & Keynotes`}
            </p>
          </div>
          <span className="px-3 py-1 bg-white border border-slate-300 text-[#0A66C2] rounded-lg text-xs font-bold shadow-2xs shrink-0 flex items-center gap-1">
            <span>{content.cta || 'Learn More'}</span>
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* 4. Social Stats Bar */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            <span className="w-4 h-4 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-[9px]">
              👍
            </span>
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">
              👏
            </span>
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px]">
              💡
            </span>
          </div>
          <span className="font-medium text-slate-600">
            {content.reactions.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span>{content.comments} comments</span>
          <span>•</span>
          <span>{content.reposts} reposts</span>
        </div>
      </div>

      {/* 5. LinkedIn Action Buttons */}
      <div className="px-2 py-1.5 grid grid-cols-4 gap-1 text-slate-600 font-semibold text-xs">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="hidden sm:inline">Like</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Comment</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <Repeat2 className="w-4 h-4" />
          <span className="hidden sm:inline">Repost</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>
    </div>
  );
};
