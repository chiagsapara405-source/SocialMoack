import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ZoomIn, ZoomOut, Monitor, Smartphone, Sparkles } from 'lucide-react';
import { Campaign, PlatformId } from '../../types/campaign';
import { platformRegistry } from './platformRegistry';

interface PreviewCanvasProps {
  campaign: Campaign;
  activePlatform: PlatformId;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  campaign,
  activePlatform,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const mockupContainerRef = useRef<HTMLDivElement>(null);

  const activeConfig = platformRegistry[activePlatform];
  const MockupComponent = activeConfig?.component;

  // Exact resolution badges according to social spec
  const resolutionSpec = activeConfig?.resolution || '1080 × 1080';

  useEffect(() => {
    if (!mockupContainerRef.current) return;

    gsap.fromTo(
      mockupContainerRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out' }
    );
  }, [activePlatform]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 130));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 70));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  const platformContent = campaign.content?.[activePlatform];

  return (
    <div className="flex-1 flex flex-col bg-[#F7F8FC] canvas-grid overflow-hidden relative select-none">
      {/* 1. Canvas Control Header Bar */}
      <div className="px-4 py-2 bg-white/95 backdrop-blur-xs border-b border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Format & Dimensions label */}
        <div className="flex items-center gap-2 font-mono">
          <span className="font-bold uppercase tracking-wider text-[#0B1020] text-[11px]">
            PREVIEW
          </span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-700">
            {activeConfig.name}
          </span>
          <span className="text-[10px] text-[#7C3AED] bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold">
            {resolutionSpec}
          </span>
        </div>

        {/* Toolbar Zoom & Device switches */}
        <div className="flex items-center gap-3">
          {/* Zoom: [ - ] 100% [ + ] */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 70}
              className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="px-2 py-0.5 font-mono text-[11px] font-bold text-slate-700 hover:text-[#7C3AED] cursor-pointer"
              title="Reset Zoom"
            >
              {zoomLevel}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 130}
              className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Desktop Preview vs Mobile Preview */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                previewDevice === 'desktop'
                  ? 'bg-white text-[#0B1020] shadow-2xs font-bold'
                  : 'text-[#667085] hover:text-[#0B1020]'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                previewDevice === 'mobile'
                  ? 'bg-white text-[#0B1020] shadow-2xs font-bold'
                  : 'text-[#667085] hover:text-[#0B1020]'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Visual Center Stage */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center min-h-[460px]">
        <div
          ref={mockupContainerRef}
          className={`transition-all duration-200 flex flex-col items-center justify-center ${
            previewDevice === 'mobile' ? 'max-w-[390px] w-full' : 'w-full'
          }`}
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'center center',
          }}
        >
          {MockupComponent ? (
            <div className="flex flex-col items-center gap-3">
              <MockupComponent campaign={campaign} content={platformContent} />
              
              {/* Dimensions footer pill under mockup */}
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span>CANVAS RESOLUTION</span>
                <span>·</span>
                <span className="font-bold text-slate-600">{resolutionSpec} PX</span>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 max-w-sm">
              <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">
                {activeConfig.name} Spec
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Coming soon in Part 4.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
