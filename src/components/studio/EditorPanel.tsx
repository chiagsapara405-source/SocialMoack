import React, { useState } from 'react';
import {
  PlatformId,
  InstagramContent,
  InstagramStoryContent,
  LinkedInContent,
  TwitterContent,
  FacebookContent,
  WhatsAppContent,
  CampaignDesign,
} from '../../types/campaign';
import { ContentEditor } from './ContentEditor';
import { DesignEditor } from './DesignEditor';
import { Save } from 'lucide-react';

interface EditorPanelProps {
  activePlatform: PlatformId;
  instagramContent: InstagramContent;
  storyContent: InstagramStoryContent;
  linkedinContent: LinkedInContent;
  twitterContent: TwitterContent;
  facebookContent: FacebookContent;
  whatsappContent: WhatsAppContent;
  design: CampaignDesign;
  hasPoster: boolean;
  hasLogo: boolean;
  onUpdateInstagram: (updated: Partial<InstagramContent>) => void;
  onUpdateStory: (updated: Partial<InstagramStoryContent>) => void;
  onUpdateLinkedIn: (updated: Partial<LinkedInContent>) => void;
  onUpdateTwitter: (updated: Partial<TwitterContent>) => void;
  onUpdateFacebook: (updated: Partial<FacebookContent>) => void;
  onUpdateWhatsApp: (updated: Partial<WhatsAppContent>) => void;
  onUpdateDesign: (updates: Partial<CampaignDesign>) => void;
  onUploadPoster?: (file: File) => void;
  onSaveManual: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  activePlatform,
  instagramContent,
  storyContent,
  linkedinContent,
  twitterContent,
  facebookContent,
  whatsappContent,
  design,
  hasPoster,
  hasLogo,
  onUpdateInstagram,
  onUpdateStory,
  onUpdateLinkedIn,
  onUpdateTwitter,
  onUpdateFacebook,
  onUpdateWhatsApp,
  onUpdateDesign,
  onUploadPoster,
  onSaveManual,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-white border-t lg:border-t-0 lg:border-l border-[#E5E7EB] flex flex-col h-full max-h-full select-none">
      {/* 1. Header with Tab Bar */}
      <div className="p-3 border-b border-[#E5E7EB] flex items-center justify-between">
        {/* Editorial Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'content'
                ? 'bg-white text-[#0B1020] shadow-2xs'
                : 'text-[#667085] hover:text-[#0B1020]'
            }`}
          >
            CONTENT
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('design')}
            className={`px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'design'
                ? 'bg-white text-[#0B1020] shadow-2xs'
                : 'text-[#667085] hover:text-[#0B1020]'
            }`}
          >
            DESIGN
          </button>
        </div>

        <button
          type="button"
          onClick={onSaveManual}
          className="text-xs text-[#7C3AED] hover:text-[#6D28D9] font-mono font-bold flex items-center gap-1 px-2 py-1 hover:bg-purple-50 rounded-md transition-colors cursor-pointer"
          title="Save changes now"
        >
          <Save className="w-3.5 h-3.5" />
          <span>SAVE</span>
        </button>
      </div>

      {/* 2. Scrollable Editorial Form */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'content' ? (
          <ContentEditor
            activePlatform={activePlatform}
            instagramContent={instagramContent}
            storyContent={storyContent}
            linkedinContent={linkedinContent}
            twitterContent={twitterContent}
            facebookContent={facebookContent}
            whatsappContent={whatsappContent}
            onUpdateInstagram={onUpdateInstagram}
            onUpdateStory={onUpdateStory}
            onUpdateLinkedIn={onUpdateLinkedIn}
            onUpdateTwitter={onUpdateTwitter}
            onUpdateFacebook={onUpdateFacebook}
            onUpdateWhatsApp={onUpdateWhatsApp}
          />
        ) : (
          <DesignEditor
            design={design}
            hasPoster={hasPoster}
            hasLogo={hasLogo}
            onUpdateDesign={onUpdateDesign}
            onUploadPoster={onUploadPoster}
          />
        )}
      </div>

      {/* 3. Footer Status Bar */}
      <div className="px-4 py-2.5 border-t border-slate-100 bg-[#F7F8FC] flex items-center justify-between text-[10px] font-mono text-[#667085]">
        <span>AUTO-SAVE ACTIVE</span>
        <button
          onClick={onSaveManual}
          className="font-bold text-[#7C3AED] hover:underline cursor-pointer uppercase"
        >
          SAVE CHANGES ✓
        </button>
      </div>
    </aside>
  );
};

