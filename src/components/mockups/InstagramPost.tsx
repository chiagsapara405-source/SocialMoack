import React from 'react';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Campaign, InstagramContent, DEFAULT_CAMPAIGN_DESIGN } from '../../types/campaign';
import { getContrastTextColor, getContrastMutedColor, isLightColor } from '../../utils/contrast';

interface InstagramPostProps {
  campaign: Campaign;
  content: InstagramContent;
}

export const InstagramPost: React.FC<InstagramPostProps> = ({ campaign, content }) => {
  const { event, assets, brand } = campaign;
  const design = campaign.design || DEFAULT_CAMPAIGN_DESIGN;

  const username = brand.socialHandle
    ? brand.socialHandle.replace(/^@/, '')
    : (event.organizer || 'socialmock').toLowerCase().replace(/\s+/g, '_');

  const formattedHashtags = content.hashtags.map((tag) =>
    tag.startsWith('#') ? tag : `#${tag}`
  );

  const textColor = getContrastTextColor(design.backgroundColor);
  const mutedTextColor = getContrastMutedColor(design.backgroundColor);
  const isLightBg = isLightColor(design.backgroundColor);

  // Typography helpers
  const fontStyle = {
    fontFamily: `${design.fontFamily}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
  };

  const getHeadlineClasses = () => {
    let size = 'text-xl sm:text-2xl';
    if (design.headlineSize === 'small') size = 'text-base sm:text-lg';
    if (design.headlineSize === 'large') size = 'text-2xl sm:text-3xl';

    let weight = 'font-bold';
    if (design.headlineWeight === 'regular') weight = 'font-normal';
    if (design.headlineWeight === 'bold') weight = 'font-black';

    let align = 'text-left';
    if (design.alignment === 'center') align = 'text-center';
    if (design.alignment === 'right') align = 'text-right';

    return `${size} ${weight} ${align} leading-tight tracking-tight`;
  };

  const getImageClasses = () => {
    const fitClass = design.imageFit === 'contain' ? 'object-contain' : 'object-cover';
    let posClass = 'object-center';
    if (design.imagePosition === 'top') posClass = 'object-top';
    if (design.imagePosition === 'bottom') posClass = 'object-bottom';
    return `w-full h-full ${fitClass} ${posClass}`;
  };

  return (
    <div
      id="socialmock-instagram-post"
      className="w-full max-w-[440px] mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden select-none text-[#0F172A]"
      style={fontStyle}
    >
      {/* 1. Post Header */}
      <div className="flex items-center justify-between px-3.5 py-3 border-b border-slate-100 bg-white">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar with story ring */}
          <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0">
            <div className="w-full h-full rounded-full bg-white p-0.5 flex items-center justify-center">
              {design.showLogo && assets.logo ? (
                <img
                  src={assets.logo}
                  alt={event.organizer || 'Organizer'}
                  className="w-full h-full object-contain rounded-full"
                />
              ) : (
                <div
                  className="w-full h-full rounded-full text-white text-[11px] font-bold flex items-center justify-center"
                  style={{ backgroundColor: design.primaryColor }}
                >
                  {(event.organizer ? event.organizer.slice(0, 2) : 'SM').toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 text-left">
            <span className="text-xs font-bold text-[#0F172A] truncate block">
              {username}
            </span>
            {event.venue && (
              <p className="text-[10px] text-slate-500 truncate flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                <span className="truncate">{event.venue}</span>
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          aria-label="Post options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Media Canvas: 1:1 Template Rendering */}
      <div
        id="socialmock-instagram-canvas"
        className="relative aspect-square w-full overflow-hidden flex flex-col justify-between"
        style={{
          backgroundColor: design.backgroundColor,
          color: textColor,
        }}
      >
        {/* TEMPLATE 01: CLASSIC */}
        {design.template === 'classic' && (
          <div className="w-full h-full flex flex-col justify-between">
            {/* Top Event Image */}
            <div className="relative w-full h-[58%] bg-slate-900 overflow-hidden">
              {assets.poster ? (
                <img src={assets.poster} alt={event.name} className={getImageClasses()} />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${design.primaryColor} 0%, ${design.secondaryColor} 100%)`,
                  }}
                >
                  <p className="text-xs font-mono uppercase tracking-widest text-white/80">
                    {event.organizer || 'SocialMock Event'}
                  </p>
                  <h3 className="text-lg font-black text-white mt-1 uppercase tracking-tight">
                    {event.name}
                  </h3>
                </div>
              )}

              {/* Optional Color Overlay */}
              {design.overlayEnabled && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundColor: design.primaryColor,
                    opacity: design.overlayStrength / 100,
                  }}
                />
              )}
            </div>

            {/* Bottom Content Card */}
            <div className="p-4 flex-1 flex flex-col justify-between text-left">
              <div>
                {design.showOrganizer && event.organizer && (
                  <p
                    className="text-[10px] font-mono uppercase tracking-wider mb-1"
                    style={{ color: design.primaryColor }}
                  >
                    {event.organizer}
                  </p>
                )}
                <h3 className={getHeadlineClasses()}>{content.headline || event.name}</h3>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-black/10">
                <div className="text-[11px] font-mono flex items-center gap-1.5" style={{ color: mutedTextColor }}>
                  <Calendar className="w-3.5 h-3.5 text-[#D4A72C]" />
                  <span>{event.date || 'Upcoming'}</span>
                </div>

                <div
                  className="px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: design.ctaStyle === 'outline' ? 'transparent' : design.primaryColor,
                    color: design.ctaStyle === 'outline' ? design.primaryColor : '#FFFFFF',
                    border: `1px solid ${design.primaryColor}`,
                  }}
                >
                  {content.cta || event.cta || 'Register'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEMPLATE 02: BOLD */}
        {design.template === 'bold' && (
          <div className="w-full h-full p-6 flex flex-col justify-between text-left relative overflow-hidden">
            {/* Background block / accent glow */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-2xl opacity-40 pointer-events-none"
              style={{ backgroundColor: design.secondaryColor }}
            />

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <span
                className="px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-widest uppercase text-white"
                style={{ backgroundColor: design.primaryColor }}
              >
                {event.date || 'OCT 2026'}
              </span>
              {design.showSocialHandle && (
                <span className="text-[10px] font-mono" style={{ color: mutedTextColor }}>
                  {brand.socialHandle}
                </span>
              )}
            </div>

            {/* Massive Bold Headline */}
            <div className="my-auto relative z-10 py-4">
              {design.showOrganizer && event.organizer && (
                <p
                  className="text-xs font-mono font-bold tracking-widest uppercase mb-1"
                  style={{ color: design.primaryColor }}
                >
                  {event.organizer} PRESENTS
                </p>
              )}
              <h2 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight leading-[0.95] ${getHeadlineClasses()}`}>
                {content.headline || event.name}
              </h2>
            </div>

            {/* Bottom Block */}
            <div className="relative z-10 pt-3 border-t-2 flex items-center justify-between" style={{ borderColor: design.primaryColor }}>
              <div className="text-xs font-mono font-bold">
                <p>{event.venue || 'Event Center'}</p>
                <p className="text-[10px] font-normal" style={{ color: mutedTextColor }}>
                  {event.time || '10:00 AM'}
                </p>
              </div>

              <div
                className="px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider shadow-sm"
                style={{
                  backgroundColor: design.primaryColor,
                  color: '#FFFFFF',
                }}
              >
                {content.cta || 'CLAIM PASS →'}
              </div>
            </div>
          </div>
        )}

        {/* TEMPLATE 03: MINIMAL */}
        {design.template === 'minimal' && (
          <div className="w-full h-full p-8 flex flex-col justify-between text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: mutedTextColor }}>
                ANNOUNCEMENT · 01
              </span>
              <div className="w-6 h-0.5 bg-[#D4A72C] mt-1" />
            </div>

            <div className="my-auto py-4">
              <h2 className={`text-2xl sm:text-3xl font-light tracking-tight leading-snug ${getHeadlineClasses()}`}>
                {content.headline || event.name}
              </h2>
              <p className="text-xs mt-3 leading-relaxed font-light" style={{ color: mutedTextColor }}>
                {event.description?.slice(0, 120)}...
              </p>
            </div>

            <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono">
              <div>
                <p className="font-semibold">{event.date || 'TBA'}</p>
                <p className="text-[10px]" style={{ color: mutedTextColor }}>
                  {event.venue}
                </p>
              </div>

              <span className="font-bold underline" style={{ color: design.primaryColor }}>
                {content.cta || 'RSVP'}
              </span>
            </div>
          </div>
        )}

        {/* TEMPLATE 04: EVENT FOCUS */}
        {design.template === 'event' && (
          <div className="w-full h-full relative overflow-hidden flex flex-col justify-between text-white text-left">
            {/* Dominant Image Background */}
            <div className="absolute inset-0 z-0 bg-slate-950">
              {assets.poster ? (
                <img src={assets.poster} alt={event.name} className={getImageClasses()} />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(135deg, #09090B 0%, ${design.primaryColor} 100%)`,
                  }}
                />
              )}
              {/* Dark editorial gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/60" />
            </div>

            {/* Optional Overlay */}
            {design.overlayEnabled && (
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  backgroundColor: design.primaryColor,
                  opacity: design.overlayStrength / 100,
                }}
              />
            )}

            {/* Top Bar */}
            <div className="relative z-10 p-4 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4A72C] border border-white/10">
                LIVE RSVP
              </span>
              {design.showOrganizer && (
                <span className="text-[10px] font-mono text-white/80 bg-black/50 px-2 py-0.5 rounded">
                  {event.organizer}
                </span>
              )}
            </div>

            {/* Bottom Content Overlay */}
            <div className="relative z-10 p-5 space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A72C]">
                  {event.date} · {event.venue}
                </span>
                <h2 className={`text-2xl font-black uppercase text-white drop-shadow-md ${getHeadlineClasses()}`}>
                  {content.headline || event.name}
                </h2>
              </div>

              <div
                className="w-full py-2.5 rounded-xl font-bold text-xs uppercase text-center tracking-wider shadow-lg"
                style={{
                  backgroundColor: design.primaryColor,
                  color: '#FFFFFF',
                }}
              >
                {content.cta || 'GET TICKETS →'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Post Interaction Bar */}
      <div className="px-3.5 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-[#0F172A]">
        <div className="flex items-center gap-4">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 cursor-pointer" />
          <MessageCircle className="w-5 h-5 hover:text-slate-600 cursor-pointer" />
          <Send className="w-5 h-5 hover:text-slate-600 cursor-pointer" />
        </div>
        <Bookmark className="w-5 h-5 hover:text-slate-600 cursor-pointer" />
      </div>

      {/* 4. Post Engagement Metrics & Caption */}
      <div className="px-3.5 pb-4 text-left space-y-1.5 bg-white text-xs">
        <p className="font-bold text-[#0F172A]">{content.likes.toLocaleString()} likes</p>

        <p className="text-slate-800 leading-relaxed">
          <span className="font-bold mr-1.5 text-[#0F172A]">{username}</span>
          <span>{content.caption}</span>
        </p>

        {formattedHashtags.length > 0 && (
          <p className="text-[11px] font-medium text-blue-600 leading-relaxed">
            {formattedHashtags.join(' ')}
          </p>
        )}

        <p className="text-[10px] text-slate-400 uppercase pt-1 font-mono">
          {content.timestamp}
        </p>
      </div>
    </div>
  );
};
