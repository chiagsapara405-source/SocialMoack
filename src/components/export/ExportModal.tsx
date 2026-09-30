import React, { useState, useEffect } from 'react';
import { X, Download, Check, AlertCircle, Sparkles } from 'lucide-react';
import { toPng, toJpeg } from 'html-to-image';
import gsap from 'gsap';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  mockupElementId: string;
  eventName: string;
  platformName: string;
  defaultWidth?: number;
  defaultHeight?: number;
  onExportSuccess: (message: string) => void;
  onExportError: (error: string) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  mockupElementId,
  eventName,
  platformName,
  defaultWidth = 1080,
  defaultHeight = 1080,
  onExportSuccess,
  onExportError,
}) => {
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [resolution, setResolution] = useState<'standard' | 'high' | 'original'>('standard');
  const [status, setStatus] = useState<'idle' | 'preparing' | 'exporting' | 'downloaded'>('idle');

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      gsap.fromTo(
        '.export-modal-box',
        { opacity: 0, scale: 0.94, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const targetWidth = resolution === 'high' ? defaultWidth * 1.5 : defaultWidth;
  const targetHeight = resolution === 'high' ? defaultHeight * 1.5 : defaultHeight;

  const handleExport = async () => {
    const node = document.getElementById(mockupElementId);
    if (!node) {
      onExportError('Mockup preview element not found. Please try again.');
      return;
    }

    try {
      setStatus('preparing');
      await new Promise((r) => setTimeout(r, 250));

      setStatus('exporting');

      // Calculate pixel ratio to guarantee target resolution regardless of current screen zoom
      const currentClientWidth = node.clientWidth || 400;
      const pixelRatio = targetWidth / currentClientWidth;

      const exportOptions = {
        quality: 0.95,
        pixelRatio: Math.max(pixelRatio, 2),
        backgroundColor: undefined,
        style: {
          transform: 'none',
          transformOrigin: 'top left',
        },
      };

      const dataUrl =
        format === 'png'
          ? await toPng(node, exportOptions)
          : await toJpeg(node, exportOptions);

      // Clean sanitized filename
      const cleanEvent = eventName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'campaign';
      const cleanPlatform = platformName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const filename = `${cleanEvent}-${cleanPlatform}.${format === 'png' ? 'png' : 'jpg'}`;

      // Trigger download
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setStatus('downloaded');
      onExportSuccess(`${platformName} exported successfully ✓`);

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      console.error('Export failed:', err);
      setStatus('idle');
      onExportError('Export failed. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none"
      role="dialog"
      aria-modal="true"
    >
      <div className="export-modal-box bg-white rounded-2xl max-w-sm w-full border border-slate-200 shadow-2xl overflow-hidden text-left">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <h3 className="font-bold text-xs uppercase font-mono tracking-wider text-[#0A0A0A]">
              Export {platformName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Format Selection */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormat('png')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold font-mono transition-colors cursor-pointer flex items-center justify-between ${
                  format === 'png'
                    ? 'border-[#7C3AED] bg-purple-50 text-[#7C3AED]'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span>PNG (Lossless)</span>
                {format === 'png' && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setFormat('jpeg')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold font-mono transition-colors cursor-pointer flex items-center justify-between ${
                  format === 'jpeg'
                    ? 'border-[#7C3AED] bg-purple-50 text-[#7C3AED]'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span>JPG (Compact)</span>
                {format === 'jpeg' && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Resolution Selection */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Target Resolution
            </label>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => setResolution('standard')}
                className={`w-full py-2 px-3 rounded-lg border text-xs font-mono transition-colors cursor-pointer flex items-center justify-between ${
                  resolution === 'standard'
                    ? 'border-[#7C3AED] bg-purple-50 text-[#7C3AED] font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span>Standard Native ({defaultWidth} × {defaultHeight})</span>
                {resolution === 'standard' && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setResolution('high')}
                className={`w-full py-2 px-3 rounded-lg border text-xs font-mono transition-colors cursor-pointer flex items-center justify-between ${
                  resolution === 'high'
                    ? 'border-[#7C3AED] bg-purple-50 text-[#7C3AED] font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span>Retina 1.5× ({Math.round(defaultWidth * 1.5)} × {Math.round(defaultHeight * 1.5)})</span>
                {resolution === 'high' && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Clean Quality Info */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-500">
            Exports isolated asset without studio UI or canvas zoom distortion.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2">
          <button
            type="button"
            disabled={status !== 'idle'}
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-black cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={status !== 'idle'}
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            {status === 'idle' && (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export Image</span>
              </>
            )}
            {status === 'preparing' && <span>Preparing...</span>}
            {status === 'exporting' && <span>Exporting...</span>}
            {status === 'downloaded' && (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Downloaded ✓</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
