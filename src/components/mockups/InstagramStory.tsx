import React from 'react';
import { Sparkles, Calendar, MapPin, ChevronUp, X, MoreVertical } from 'lucide-react';
import { Campaign, InstagramStoryContent, DEFAULT_CAMPAIGN_DESIGN } from '../../types/campaign';
import { getContrastTextColor, getContrastMutedColor } from '../../utils/contrast';

interface InstagramStoryProps {
  campaign: Campaign;
  content: InstagramStoryContent;
}

export const InstagramStory: React.FC<InstagramStoryProps> = ({ campaign, content }) => {
  const { event, assets, brand } = campaign;
  const design = campaign.design || DEFAULT_CAMPAIGN_DESIGN;

  const username = brand.socialHandle
    ? brand.socialHandle.replace(/^@/, '')
    : (event.organizer || 'socialmock').toLowerCase().replace(/\s+/g, '_');

  const textColor = getContrastTextColor(design.backgroundColor);
  const mutedTextColor = getContrastMutedColor(design.backgroundColor);

  const fontStyle = {
    fontFamily: `${design.fontFamily}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
  };

  const getHeadlineClasses = () => {
    let size = 'text-2xl sm:text-3xl';
    if (design.headlineSize === 'small') size = 'text-xl sm:text-2xl';
    if (design.headlineSize === 'large') size = 'text-3xl sm:text-4xl';

    let weight = 'font-bold';
    if (design.headlineWeight === 'regular') weight = 'font-normal';
    if (design.headlineWeight === 'bold') weight = 'font-black';

    let align = 'text-center';
    if (design.alignment === 'left') align = 'text-left';
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
      id="socialmock-instagram-story"
      className="w-full max-w-[340px] mx-auto bg-black rounded-3xl border border-slate-700/60 shadow-2xl overflow-hidden aspect-[9/16] relative flex flex-col justify-between select-none text-white text-left"
      style={fontStyle}
    >
      {/* Background Layer: Visual or Branded Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ backgroundColor: design.backgroundColor }}>
        {assets.poster ? (
          <div className="w-full h-full relative">
            <img src={assets.poster} alt={event.name} className={getImageClasses()} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85" />
          </div>
        ) : (
          <div
            className="w-full h-full relative"
            style={{
              background: `linear-gradient(160deg, #09090B 0%, #181434 35%, ${design.primaryColor} 85%, #000 100%)`,
            }}
          >
            <div
              className="absolute top-1/4 right-0 w-64 h-64 rounded-full blur-3xl opacity-40 pointer-events-none"
              style={{ backgroundColor: design.secondaryColor }}
            />
          </div>
        )}

        {/* Optional Overlay */}
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

      {/* 1. Story Header */}
      <div className="relative z-10 px-3.5 pt-3 pb-2 space-y-2.5">
        <div className="grid grid-cols-3 gap-1 w-full">
          <div className="h-0.5 rounded-full bg-white" />
          <div className="h-0.5 rounded-full bg-white/40" />
          <div className="h-0.5 rounded-full bg-white/40" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shrink-0">
              <div className="w-full h-full rounded-full bg-black p-0.5 flex items-center justify-center">
                {design.showLogo && assets.logo ? (
                  <img src={assets.logo} alt="Logo" className="w-full h-full object-contain rounded-full" />
                ) : (
                  <div
                    className="w-full h-full rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                    style={{ backgroundColor: design.primaryColor }}
                  >
                    {(event.organizer ? event.organizer.slice(0, 2) : 'SM').toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0">
              <span className="text-xs font-bold truncate block">{username}</span>
              {design.showSocialHandle && brand.socialHandle && (
                <p className="text-[10px] text-white/70 truncate">{brand.socialHandle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 text-white/80">
            <MoreVertical className="w-4 h-4 cursor-pointer" />
            <X className="w-4 h-4 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* 2. Story Center Content Display */}
      <div className="relative z-10 px-6 my-auto space-y-4">
        {design.showOrganizer && event.organizer && (
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-black/50 backdrop-blur-md border border-white/20"
            style={{ color: '#D4A72C' }}
          >
            {event.organizer}
          </span>
        )}

        <div className="space-y-2">
          <h2 className={`${getHeadlineClasses()} text-white drop-shadow-md uppercase`}>
            {content.headline || event.name}
          </h2>
          <p className="text-xs text-white/80 line-clamp-3 leading-relaxed drop-shadow">
            {content.subheadline || event.description}
          </p>
        </div>

        {/* Date and Venue Badge */}
        <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-white/90 bg-black/40 backdrop-blur-xs py-2 px-3 rounded-xl border border-white/10">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>{event.date || 'OCT 2026'}</span>
          </span>
          {event.venue && (
            <span className="flex items-center gap-1 truncate max-w-[140px]">
              <MapPin className="w-3.5 h-3.5 text-white/70" />
              <span className="truncate">{event.venue}</span>
            </span>
          )}
        </div>
      </div>

      {/* 3. Story Footer & Swipe Up / CTA */}
      <div className="relative z-10 px-4 pb-5 pt-2 flex flex-col items-center gap-2">
        <ChevronUp className="w-4 h-4 text-white/80 animate-bounce" />

        {/* CTA Button with ctaStyle */}
        <div
          className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center cursor-pointer shadow-lg transition-all ${
            design.ctaStyle === 'outline'
              ? 'bg-transparent text-white border-2 border-white'
              : design.ctaStyle === 'minimal'
              ? 'bg-transparent text-[#D4A72C] underline'
              : 'text-white'
          }`}
          style={{
            backgroundColor:
              design.ctaStyle === 'filled' ? design.primaryColor : undefined,
          }}
        >
          {content.cta || 'SWIPE UP TO REGISTER'}
        </div>
      </div>
    </div>
  );
};
