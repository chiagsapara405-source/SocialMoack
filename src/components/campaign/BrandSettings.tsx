import React, { useState } from 'react';
import { ChevronDown, Palette, AtSign, Building2 } from 'lucide-react';

interface BrandSettingsProps {
  primaryColor: string;
  secondaryColor: string;
  organizationName: string;
  socialHandle: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  onSocialHandleChange: (handle: string) => void;
}

export const BrandSettings: React.FC<BrandSettingsProps> = ({
  primaryColor,
  secondaryColor,
  organizationName,
  socialHandle,
  onPrimaryColorChange,
  onSecondaryColorChange,
  onSocialHandleChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#E2E8F0] rounded-2xl bg-white overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#7C3AED] flex items-center justify-center border border-purple-100">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-[#0F172A] block">
              Brand Settings
            </span>
            <span className="text-xs text-[#64748B]">
              Customize colors and handles applied to all mockups
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Color preview dots */}
          <div className="flex items-center -space-x-1.5 mr-2">
            <span
              className="w-4 h-4 rounded-full border-2 border-white shadow-2xs inline-block"
              style={{ backgroundColor: primaryColor }}
              title="Primary Color"
            />
            <span
              className="w-4 h-4 rounded-full border-2 border-white shadow-2xs inline-block"
              style={{ backgroundColor: secondaryColor }}
              title="Secondary Color"
            />
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#7C3AED]' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
          {/* Colors row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary Color */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0F172A]">
                Primary Accent Color
              </label>
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-300 shadow-2xs shrink-0 cursor-pointer">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => onPrimaryColorChange(e.target.value)}
                    className="absolute -inset-2 w-14 h-14 cursor-pointer border-0 p-0"
                  />
                </div>
                <input
                  type="text"
                  value={primaryColor.toUpperCase()}
                  onChange={(e) => onPrimaryColorChange(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-mono rounded-xl border border-[#E2E8F0] focus:outline-hidden focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] uppercase"
                  placeholder="#7C3AED"
                  maxLength={7}
                />
              </div>
            </div>

            {/* Secondary Color */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0F172A]">
                Secondary Accent Color
              </label>
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-300 shadow-2xs shrink-0 cursor-pointer">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => onSecondaryColorChange(e.target.value)}
                    className="absolute -inset-2 w-14 h-14 cursor-pointer border-0 p-0"
                  />
                </div>
                <input
                  type="text"
                  value={secondaryColor.toUpperCase()}
                  onChange={(e) => onSecondaryColorChange(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-mono rounded-xl border border-[#E2E8F0] focus:outline-hidden focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] uppercase"
                  placeholder="#2563EB"
                  maxLength={7}
                />
              </div>
            </div>
          </div>

          {/* Organization & Social Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0F172A]">
                Organization Name
              </label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled
                  value={organizationName || 'Specified in organizer field'}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0F172A]">
                Social Media Handle (Optional)
              </label>
              <div className="relative">
                <AtSign className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={socialHandle}
                  onChange={(e) => onSocialHandleChange(e.target.value)}
                  placeholder="@techminds"
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-[#E2E8F0] focus:outline-hidden focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
