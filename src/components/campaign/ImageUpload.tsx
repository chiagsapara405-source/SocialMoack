import React, { useRef, useState } from 'react';
import { UploadCloud, X, RefreshCw, AlertCircle, FileCheck } from 'lucide-react';
import gsap from 'gsap';
import { validateImageFile, formatFileSize, fileToDataUrl } from '../../utils/image';

interface ImageUploadProps {
  label: string;
  helperText?: string;
  aspectRatioClass?: string;
  currentImage: string | null;
  fileName: string | null;
  fileSize: number | null;
  onImageSelected: (dataUrl: string, file: File, fileName: string, fileSize: number) => void;
  onImageRemoved: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  helperText = 'PNG, JPG or WEBP · Max 5MB',
  aspectRatioClass = 'aspect-[16/9]',
  currentImage,
  fileName,
  fileSize,
  onImageSelected,
  onImageRemoved,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (file: File) => {
    setError(null);
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      onImageSelected(dataUrl, file, file.name, file.size);

      // Animate preview on selection
      if (previewRef.current) {
        gsap.fromTo(
          previewRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
        );
      }
    } catch {
      setError('Could not process this image file.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-[#0F172A]">
          {label}
        </label>
        {fileName && (
          <span className="text-xs text-[#64748B] flex items-center gap-1">
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            {fileSize ? formatFileSize(fileSize) : ''}
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={handleInputChange}
      />

      {currentImage ? (
        <div
          ref={previewRef}
          className={`relative rounded-xl border border-[#E2E8F0] overflow-hidden bg-slate-900 group shadow-xs ${aspectRatioClass}`}
        >
          <img
            src={currentImage}
            alt={label}
            className="w-full h-full object-cover"
          />

          {/* Overlay info & controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-800 text-xs font-semibold backdrop-blur-xs transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                title="Replace image"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="text-[11px]">Replace</span>
              </button>
              <button
                type="button"
                onClick={onImageRemoved}
                className="p-1.5 rounded-lg bg-rose-500/90 hover:bg-rose-600 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
                <span className="text-[11px]">Remove</span>
              </button>
            </div>

            {fileName && (
              <div className="text-white text-xs truncate max-w-full font-medium">
                {fileName}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? 'border-[#7C3AED] bg-purple-50/50 scale-[0.99]'
              : 'border-slate-300 hover:border-[#7C3AED] hover:bg-slate-50/80 bg-white'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center border border-purple-100">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#0F172A]">
              Click to upload or drag & drop
            </p>
            <p className="text-[11px] text-[#64748B] mt-0.5">{helperText}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
