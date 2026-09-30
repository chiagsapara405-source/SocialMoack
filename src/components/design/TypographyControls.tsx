import React from 'react';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface TypographyControlsProps {
  fontFamily: string;
  headlineSize: 'small' | 'medium' | 'large';
  headlineWeight: 'regular' | 'medium' | 'bold';
  alignment: 'left' | 'center' | 'right';
  onChange: (updates: {
    fontFamily?: string;
    headlineSize?: 'small' | 'medium' | 'large';
    headlineWeight?: 'regular' | 'medium' | 'bold';
    alignment?: 'left' | 'center' | 'right';
  }) => void;
}

const FONTS = ['Inter', 'Poppins', 'Space Grotesk', 'DM Sans'];

export const TypographyControls: React.FC<TypographyControlsProps> = ({
  fontFamily,
  headlineSize,
  headlineWeight,
  alignment,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Font Family */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085]">
          Font Family
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {FONTS.map((font) => (
            <button
              key={font}
              type="button"
              onClick={() => onChange({ fontFamily: font })}
              className={`px-3 py-2 rounded-lg text-xs border text-left transition-colors cursor-pointer ${
                fontFamily === font
                  ? 'border-[#7C3AED] bg-purple-50 text-[#7C3AED] font-bold'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              {font}
            </button>
          ))}
        </div>
      </div>

      {/* Headline Size */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085]">
          Headline Size
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onChange({ headlineSize: size })}
              className={`py-1.5 text-xs font-mono font-bold uppercase rounded-md transition-colors cursor-pointer ${
                headlineSize === size
                  ? 'bg-white text-[#0A0A0A] shadow-2xs'
                  : 'text-slate-500 hover:text-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Headline Weight */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085]">
          Headline Weight
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg">
          {(['regular', 'medium', 'bold'] as const).map((weight) => (
            <button
              key={weight}
              type="button"
              onClick={() => onChange({ headlineWeight: weight })}
              className={`py-1.5 text-xs font-mono font-bold uppercase rounded-md transition-colors cursor-pointer ${
                headlineWeight === weight
                  ? 'bg-white text-[#0A0A0A] shadow-2xs'
                  : 'text-slate-500 hover:text-black'
              }`}
            >
              {weight}
            </button>
          ))}
        </div>
      </div>

      {/* Alignment */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085]">
          Alignment
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => onChange({ alignment: 'left' })}
            className={`py-1.5 flex items-center justify-center rounded-md transition-colors cursor-pointer ${
              alignment === 'left'
                ? 'bg-white text-[#0A0A0A] shadow-2xs'
                : 'text-slate-500 hover:text-black'
            }`}
            title="Left Align"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onChange({ alignment: 'center' })}
            className={`py-1.5 flex items-center justify-center rounded-md transition-colors cursor-pointer ${
              alignment === 'center'
                ? 'bg-white text-[#0A0A0A] shadow-2xs'
                : 'text-slate-500 hover:text-black'
            }`}
            title="Center Align"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onChange({ alignment: 'right' })}
            className={`py-1.5 flex items-center justify-center rounded-md transition-colors cursor-pointer ${
              alignment === 'right'
                ? 'bg-white text-[#0A0A0A] shadow-2xs'
                : 'text-slate-500 hover:text-black'
            }`}
            title="Right Align"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
