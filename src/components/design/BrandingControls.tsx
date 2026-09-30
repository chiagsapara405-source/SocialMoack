import React from 'react';

interface BrandingControlsProps {
  showOrganizer: boolean;
  showLogo: boolean;
  showSocialHandle: boolean;
  ctaStyle: 'filled' | 'outline' | 'minimal';
  hasLogo: boolean;
  onChange: (updates: {
    showOrganizer?: boolean;
    showLogo?: boolean;
    showSocialHandle?: boolean;
    ctaStyle?: 'filled' | 'outline' | 'minimal';
  }) => void;
}

export const BrandingControls: React.FC<BrandingControlsProps> = ({
  showOrganizer,
  showLogo,
  showSocialHandle,
  ctaStyle,
  hasLogo,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Toggles */}
      <div className="space-y-2.5">
        {/* Organizer */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
          <div>
            <p className="text-xs font-bold text-slate-800">Show Organizer</p>
            <p className="text-[10px] text-slate-500">Display host / club name</p>
          </div>
          <button
            type="button"
            onClick={() => onChange({ showOrganizer: !showOrganizer })}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
              showOrganizer ? 'bg-[#7C3AED]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                showOrganizer ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Logo Toggle */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
          <div>
            <p className="text-xs font-bold text-slate-800">Show Brand Logo</p>
            <p className="text-[10px] text-slate-500">
              {hasLogo ? 'Display uploaded mark' : 'No logo uploaded'}
            </p>
          </div>
          <button
            type="button"
            disabled={!hasLogo}
            onClick={() => onChange({ showLogo: !showLogo })}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer disabled:opacity-40 ${
              showLogo && hasLogo ? 'bg-[#7C3AED]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                showLogo && hasLogo ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Social Handle */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
          <div>
            <p className="text-xs font-bold text-slate-800">Show Social Handle</p>
            <p className="text-[10px] text-slate-500">e.g. @techminds footer tag</p>
          </div>
          <button
            type="button"
            onClick={() => onChange({ showSocialHandle: !showSocialHandle })}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
              showSocialHandle ? 'bg-[#7C3AED]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                showSocialHandle ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* CTA Button Style */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085]">
          CTA Button Style
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg">
          {(['filled', 'outline', 'minimal'] as const).map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => onChange({ ctaStyle: style })}
              className={`py-1.5 text-xs font-mono font-bold uppercase rounded-md transition-colors cursor-pointer ${
                ctaStyle === style
                  ? 'bg-white text-[#0A0A0A] shadow-2xs'
                  : 'text-slate-500 hover:text-black'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
