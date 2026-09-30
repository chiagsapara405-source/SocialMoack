import React, { useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageControlsProps {
  hasImage: boolean;
  imagePosition: 'top' | 'center' | 'bottom';
  imageFit: 'cover' | 'contain';
  overlayEnabled: boolean;
  overlayStrength: number;
  onChange: (updates: {
    imagePosition?: 'top' | 'center' | 'bottom';
    imageFit?: 'cover' | 'contain';
    overlayEnabled?: boolean;
    overlayStrength?: number;
  }) => void;
  onUploadImage?: (file: File) => void;
}

export const ImageControls: React.FC<ImageControlsProps> = ({
  hasImage,
  imagePosition,
  imageFit,
  overlayEnabled,
  overlayStrength,
  onChange,
  onUploadImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadImage) {
      onUploadImage(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Status / Trigger */}
      {!hasImage ? (
        <div className="p-3.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center text-center gap-2">
          <ImageIcon className="w-6 h-6 text-slate-400" />
          <div>
            <p className="text-xs font-bold text-slate-700">No event image uploaded</p>
            <p className="text-[10px] text-slate-500">
              Upload a poster to enable custom visual layouts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-[#0A0A0A] hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Image</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
          <span className="font-semibold">Event artwork active</span>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-bold text-emerald-700 underline hover:text-emerald-900 cursor-pointer"
          >
            Replace
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Image Position */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085]">
          Image Position
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg">
          {(['top', 'center', 'bottom'] as const).map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => onChange({ imagePosition: pos })}
              className={`py-1.5 text-xs font-mono font-bold uppercase rounded-md transition-colors cursor-pointer ${
                imagePosition === pos
                  ? 'bg-white text-[#0A0A0A] shadow-2xs'
                  : 'text-slate-500 hover:text-black'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      {/* Image Fit */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085]">
          Image Fit
        </label>
        <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-lg">
          {(['cover', 'contain'] as const).map((fit) => (
            <button
              key={fit}
              type="button"
              onClick={() => onChange({ imageFit: fit })}
              className={`py-1.5 text-xs font-mono font-bold uppercase rounded-md transition-colors cursor-pointer ${
                imageFit === fit
                  ? 'bg-white text-[#0A0A0A] shadow-2xs'
                  : 'text-slate-500 hover:text-black'
              }`}
            >
              {fit}
            </button>
          ))}
        </div>
      </div>

      {/* Image Overlay */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085]">
            Primary Color Overlay
          </label>
          <button
            type="button"
            onClick={() => onChange({ overlayEnabled: !overlayEnabled })}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
              overlayEnabled ? 'bg-[#7C3AED]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                overlayEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {overlayEnabled && (
          <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between text-xs font-mono text-slate-600">
              <span>Overlay Strength</span>
              <span className="font-bold text-[#7C3AED]">{overlayStrength}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={overlayStrength}
              onChange={(e) => onChange({ overlayStrength: Number(e.target.value) })}
              className="w-full accent-[#7C3AED] cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};
