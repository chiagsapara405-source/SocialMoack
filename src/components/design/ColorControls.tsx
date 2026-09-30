import React from 'react';

interface ColorControlsProps {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  onChangeColor: (updates: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
  }) => void;
}

const PRESET_PALETTES = [
  { name: 'Purple', primary: '#7C3AED', secondary: '#2563EB', background: '#FFFFFF' },
  { name: 'Blue', primary: '#2563EB', secondary: '#0284C7', background: '#F8FAFC' },
  { name: 'Midnight', primary: '#D4A72C', secondary: '#E7C45A', background: '#0A0A0A' },
  { name: 'Sunset', primary: '#E11D48', secondary: '#F59E0B', background: '#FFF1F2' },
  { name: 'Mono', primary: '#18181B', secondary: '#71717A', background: '#FAFAFA' },
];

export const ColorControls: React.FC<ColorControlsProps> = ({
  primaryColor,
  secondaryColor,
  backgroundColor,
  onChangeColor,
}) => {
  return (
    <div className="space-y-4">
      {/* Preset Palettes Swatches */}
      <div>
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085] mb-2">
          Color Presets
        </label>
        <div className="grid grid-cols-5 gap-2">
          {PRESET_PALETTES.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() =>
                onChangeColor({
                  primaryColor: preset.primary,
                  secondaryColor: preset.secondary,
                  backgroundColor: preset.background,
                })
              }
              className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-400 bg-white flex flex-col items-center gap-1 transition-all cursor-pointer group"
              title={preset.name}
            >
              <div className="flex -space-x-1">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                  style={{ backgroundColor: preset.primary }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                  style={{ backgroundColor: preset.secondary }}
                />
              </div>
              <span className="text-[9px] font-mono text-slate-500 group-hover:text-black">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Color Picker */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085]">
          Primary Color
        </label>
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-300 shadow-2xs shrink-0 cursor-pointer">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => onChangeColor({ primaryColor: e.target.value })}
              className="absolute -inset-2 w-12 h-12 cursor-pointer border-0 p-0"
            />
          </div>
          <input
            type="text"
            value={primaryColor.toUpperCase()}
            onChange={(e) => onChangeColor({ primaryColor: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs font-mono font-bold text-[#0B1020] bg-slate-50 border border-slate-200 rounded-lg focus:border-[#7C3AED] focus:outline-hidden uppercase"
            maxLength={7}
          />
        </div>
      </div>

      {/* Secondary Color Picker */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085]">
          Secondary Color
        </label>
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-300 shadow-2xs shrink-0 cursor-pointer">
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => onChangeColor({ secondaryColor: e.target.value })}
              className="absolute -inset-2 w-12 h-12 cursor-pointer border-0 p-0"
            />
          </div>
          <input
            type="text"
            value={secondaryColor.toUpperCase()}
            onChange={(e) => onChangeColor({ secondaryColor: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs font-mono font-bold text-[#0B1020] bg-slate-50 border border-slate-200 rounded-lg focus:border-[#7C3AED] focus:outline-hidden uppercase"
            maxLength={7}
          />
        </div>
      </div>

      {/* Background Color Picker */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085]">
          Canvas Background
        </label>
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-300 shadow-2xs shrink-0 cursor-pointer">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onChangeColor({ backgroundColor: e.target.value })}
              className="absolute -inset-2 w-12 h-12 cursor-pointer border-0 p-0"
            />
          </div>
          <input
            type="text"
            value={backgroundColor.toUpperCase()}
            onChange={(e) => onChangeColor({ backgroundColor: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs font-mono font-bold text-[#0B1020] bg-slate-50 border border-slate-200 rounded-lg focus:border-[#7C3AED] focus:outline-hidden uppercase"
            maxLength={7}
          />
        </div>
      </div>
    </div>
  );
};
