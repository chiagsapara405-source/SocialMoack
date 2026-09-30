import React, { useState } from 'react';
import {
  InstagramTemplate,
  CampaignDesign,
  DEFAULT_CAMPAIGN_DESIGN,
} from '../../types/campaign';
import { TemplateSelector } from '../design/TemplateSelector';
import { ColorControls } from '../design/ColorControls';
import { TypographyControls } from '../design/TypographyControls';
import { ImageControls } from '../design/ImageControls';
import { BrandingControls } from '../design/BrandingControls';
import { ResetDialog } from '../design/ResetDialog';
import {
  Layout,
  Palette,
  Type,
  Image as ImageIcon,
  ShieldCheck,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';

interface DesignEditorProps {
  design: CampaignDesign;
  hasPoster: boolean;
  hasLogo: boolean;
  onUpdateDesign: (updates: Partial<CampaignDesign>) => void;
  onUploadPoster?: (file: File) => void;
}

type SectionKey = 'layout' | 'colors' | 'typography' | 'image' | 'branding';

export const DesignEditor: React.FC<DesignEditorProps> = ({
  design,
  hasPoster,
  hasLogo,
  onUpdateDesign,
  onUploadPoster,
}) => {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    layout: true,
    colors: false,
    typography: false,
    image: false,
    branding: false,
  });

  const [isResetOpen, setIsResetOpen] = useState(false);

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleResetConfirm = () => {
    onUpdateDesign(DEFAULT_CAMPAIGN_DESIGN);
    setIsResetOpen(false);
  };

  return (
    <div className="space-y-4 text-left select-none">
      {/* 1. LAYOUT SECTION */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('layout')}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#0A0A0A]">
              LAYOUT
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              openSections.layout ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.layout && (
          <div className="p-4 border-t border-slate-200">
            <TemplateSelector
              currentTemplate={design.template}
              onSelectTemplate={(template: InstagramTemplate) =>
                onUpdateDesign({ template })
              }
            />
          </div>
        )}
      </div>

      {/* 2. COLORS SECTION */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('colors')}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#0A0A0A]">
              COLORS
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              openSections.colors ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.colors && (
          <div className="p-4 border-t border-slate-200">
            <ColorControls
              primaryColor={design.primaryColor}
              secondaryColor={design.secondaryColor}
              backgroundColor={design.backgroundColor}
              onChangeColor={(updates) => onUpdateDesign(updates)}
            />
          </div>
        )}
      </div>

      {/* 3. TYPOGRAPHY SECTION */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('typography')}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#0A0A0A]">
              TYPOGRAPHY
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              openSections.typography ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.typography && (
          <div className="p-4 border-t border-slate-200">
            <TypographyControls
              fontFamily={design.fontFamily}
              headlineSize={design.headlineSize}
              headlineWeight={design.headlineWeight}
              alignment={design.alignment}
              onChange={(updates) => onUpdateDesign(updates)}
            />
          </div>
        )}
      </div>

      {/* 4. IMAGE SECTION */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('image')}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#0A0A0A]">
              IMAGE
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              openSections.image ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.image && (
          <div className="p-4 border-t border-slate-200">
            <ImageControls
              hasImage={hasPoster}
              imagePosition={design.imagePosition}
              imageFit={design.imageFit}
              overlayEnabled={design.overlayEnabled}
              overlayStrength={design.overlayStrength}
              onChange={(updates) => onUpdateDesign(updates)}
              onUploadImage={onUploadPoster}
            />
          </div>
        )}
      </div>

      {/* 5. BRANDING SECTION */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('branding')}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#0A0A0A]">
              BRANDING
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              openSections.branding ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.branding && (
          <div className="p-4 border-t border-slate-200">
            <BrandingControls
              showOrganizer={design.showOrganizer}
              showLogo={design.showLogo}
              showSocialHandle={design.showSocialHandle}
              ctaStyle={design.ctaStyle}
              hasLogo={hasLogo}
              onChange={(updates) => onUpdateDesign(updates)}
            />
          </div>
        )}
      </div>

      {/* Reset Design Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setIsResetOpen(true)}
          className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/50 text-slate-600 hover:text-rose-700 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Design to Default</span>
        </button>
      </div>

      {/* Custom Reset Dialog */}
      <ResetDialog
        isOpen={isResetOpen}
        onConfirm={handleResetConfirm}
        onCancel={() => setIsResetOpen(false)}
      />
    </div>
  );
};
