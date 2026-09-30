import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import {
  Campaign,
  PlatformId,
  InstagramContent,
  InstagramStoryContent,
  LinkedInContent,
  TwitterContent,
  FacebookContent,
  WhatsAppContent,
  CampaignDesign,
  DEFAULT_CAMPAIGN_DESIGN,
} from '../types/campaign';
import { getCampaignById, updateCampaign } from '../utils/storage';
import { StudioHeader } from '../components/studio/StudioHeader';
import { PlatformSidebar } from '../components/studio/PlatformSidebar';
import { PreviewCanvas } from '../components/studio/PreviewCanvas';
import { EditorPanel } from '../components/studio/EditorPanel';
import { platformRegistry } from '../components/studio/platformRegistry';
import { ExportModal } from '../components/export/ExportModal';
import { Toast } from '../components/ui/Toast';
import { FolderX, ArrowLeft } from 'lucide-react';

interface CampaignStudioProps {
  campaignId: string | null;
  onBackToCampaigns: () => void;
}

export const CampaignStudio: React.FC<CampaignStudioProps> = ({
  campaignId,
  onBackToCampaigns,
}) => {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [activePlatform, setActivePlatform] = useState<PlatformId>('instagram');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info' | 'error'>('success');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const studioContainerRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // 1. Load Campaign from localStorage
  useEffect(() => {
    if (!campaignId) {
      setCampaign(null);
      return;
    }

    const loaded = getCampaignById(campaignId);
    setCampaign(loaded);
    setIsSaving(false);
    setLastSavedAt(new Date());
  }, [campaignId]);

  // 2. GSAP Entrance Animation
  useEffect(() => {
    if (!campaign || !studioContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.studio-column', {
        opacity: 0,
        y: 12,
        stagger: 0.08,
        duration: 0.45,
        ease: 'power2.out',
      });
    }, studioContainerRef);

    return () => ctx.revert();
  }, [campaign?.id]);

  // 3. Debounced Auto-Save
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!campaign) return;

    setIsSaving(true);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      updateCampaign(campaign);
      setIsSaving(false);
      setLastSavedAt(new Date());
    }, 700);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [campaign]);

  // Handlers
  const handleSwitchPlatform = useCallback((platformId: PlatformId) => {
    setActivePlatform(platformId);
  }, []);

  const handleManualSave = useCallback(() => {
    if (!campaign) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    setIsSaving(true);
    updateCampaign(campaign);
    setIsSaving(false);
    setLastSavedAt(new Date());

    setToastType('success');
    setToastMessage('Campaign changes saved successfully');
  }, [campaign]);

  const handleOpenExport = useCallback(() => {
    setIsExportModalOpen(true);
  }, []);

  const handleUpdateDesign = useCallback((updated: Partial<CampaignDesign>) => {
    setCampaign((prev) => {
      if (!prev) return null;
      const currentDesign = prev.design || DEFAULT_CAMPAIGN_DESIGN;
      const newDesign = {
        ...currentDesign,
        ...updated,
      };

      return {
        ...prev,
        brand: {
          ...prev.brand,
          primaryColor: newDesign.primaryColor,
          secondaryColor: newDesign.secondaryColor,
        },
        design: newDesign,
      };
    });
  }, []);

  const handleUploadPoster = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setCampaign((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          assets: {
            ...prev.assets,
            poster: dataUrl,
          },
        };
      });
      setToastType('success');
      setToastMessage('Event image uploaded successfully ✓');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleUpdateInstagram = useCallback((updated: Partial<InstagramContent>) => {
    setCampaign((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        content: {
          ...prev.content,
          instagram: {
            ...prev.content.instagram,
            ...updated,
          },
        },
      };
    });
  }, []);

  const handleUpdateStory = useCallback((updated: Partial<InstagramStoryContent>) => {
    setCampaign((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        content: {
          ...prev.content,
          instagramStory: {
            ...prev.content.instagramStory,
            ...updated,
          },
        },
      };
    });
  }, []);

  const handleUpdateLinkedIn = useCallback((updated: Partial<LinkedInContent>) => {
    setCampaign((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        content: {
          ...prev.content,
          linkedin: {
            ...prev.content.linkedin,
            ...updated,
          },
        },
      };
    });
  }, []);

  const handleUpdateTwitter = useCallback((updated: Partial<TwitterContent>) => {
    setCampaign((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        content: {
          ...prev.content,
          twitter: {
            ...prev.content.twitter,
            ...updated,
          },
        },
      };
    });
  }, []);

  const handleUpdateFacebook = useCallback((updated: Partial<FacebookContent>) => {
    setCampaign((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        content: {
          ...prev.content,
          facebook: {
            ...prev.content.facebook,
            ...updated,
          },
        },
      };
    });
  }, []);

  const handleUpdateWhatsApp = useCallback((updated: Partial<WhatsAppContent>) => {
    setCampaign((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        content: {
          ...prev.content,
          whatsapp: {
            ...prev.content.whatsapp,
            ...updated,
          },
        },
      };
    });
  }, []);

  // Fallback state if campaign is missing or invalid
  if (!campaign) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto border border-rose-100">
            <FolderX className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#0F172A]">Campaign not found</h2>
          <p className="text-sm text-[#64748B]">
            The requested campaign does not exist or may have been cleared from local storage.
          </p>
          <button
            onClick={onBackToCampaigns}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Campaigns</span>
          </button>
        </div>
      </div>
    );
  }

  const exportElementId =
    activePlatform === 'instagramStory'
      ? 'socialmock-instagram-story'
      : 'socialmock-instagram-post';

  const exportWidth = 1080;
  const exportHeight = activePlatform === 'instagramStory' ? 1920 : 1080;

  return (
    <div
      ref={studioContainerRef}
      className="h-screen w-screen flex flex-col bg-[#F8FAFC] overflow-hidden"
    >
      {/* 1. Compact Studio Header */}
      <StudioHeader
        campaignName={campaign.event.name}
        activePlatformName={platformRegistry[activePlatform]?.name}
        isSaving={isSaving}
        lastSavedAt={lastSavedAt}
        onBackToCampaigns={onBackToCampaigns}
        onManualSave={handleManualSave}
        onExport={handleOpenExport}
      />

      {/* 2. Main Studio 3-Column Work Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Platform Sidebar */}
        <div className="studio-column">
          <PlatformSidebar
            activePlatform={activePlatform}
            onSwitchPlatform={handleSwitchPlatform}
          />
        </div>

        {/* Center: Social Mockup Canvas */}
        <div className="studio-column flex-1 flex flex-col overflow-hidden">
          <PreviewCanvas
            campaign={campaign}
            activePlatform={activePlatform}
          />
        </div>

        {/* Right: Content & Design Editor Panel */}
        <div className="studio-column">
          <EditorPanel
            activePlatform={activePlatform}
            instagramContent={campaign.content.instagram}
            storyContent={campaign.content.instagramStory}
            linkedinContent={campaign.content.linkedin}
            twitterContent={campaign.content.twitter}
            facebookContent={campaign.content.facebook}
            whatsappContent={campaign.content.whatsapp}
            design={campaign.design || DEFAULT_CAMPAIGN_DESIGN}
            hasPoster={Boolean(campaign.assets.poster)}
            hasLogo={Boolean(campaign.assets.logo)}
            onUpdateInstagram={handleUpdateInstagram}
            onUpdateStory={handleUpdateStory}
            onUpdateLinkedIn={handleUpdateLinkedIn}
            onUpdateTwitter={handleUpdateTwitter}
            onUpdateFacebook={handleUpdateFacebook}
            onUpdateWhatsApp={handleUpdateWhatsApp}
            onUpdateDesign={handleUpdateDesign}
            onUploadPoster={handleUploadPoster}
            onSaveManual={handleManualSave}
          />
        </div>
      </div>

      {/* 3. Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        mockupElementId={exportElementId}
        eventName={campaign.event.name}
        platformName={platformRegistry[activePlatform]?.name || 'Instagram'}
        defaultWidth={exportWidth}
        defaultHeight={exportHeight}
        onExportSuccess={(msg) => {
          setToastType('success');
          setToastMessage(msg);
        }}
        onExportError={(err) => {
          setToastType('error');
          setToastMessage(err);
        }}
      />

      {/* 4. Floating Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};
