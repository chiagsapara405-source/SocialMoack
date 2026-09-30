/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ProductShowcase } from './components/ProductShowcase';
import { Platforms } from './components/Platforms';
import { TemplatesSection } from './components/TemplatesSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { NotificationModal } from './components/NotificationModal';
import { ExportPostModal } from './components/ExportPostModal';
import { CreateCampaign } from './pages/CreateCampaign';
import { CampaignStudio } from './pages/CampaignStudio';
import { CampaignsList } from './pages/CampaignsList';

type ViewMode = 'landing' | 'create-campaign' | 'campaign-studio' | 'campaigns-list';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [activeCampaignId, setActiveCampaignId] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  const handleNavigateToCreateCampaign = () => {
    setCurrentView('create-campaign');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenCampaignsList = () => {
    setCurrentView('campaigns-list');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenStudio = (campaignId: string) => {
    setActiveCampaignId(campaignId);
    setCurrentView('campaign-studio');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenTemplates = () => {
    setModalState({
      isOpen: true,
      title: 'Campaign Templates',
      message: 'Select any preset below or start a new campaign from scratch.',
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleOpenExport = () => {
    setIsExportModalOpen(true);
  };

  // 1. Campaign Studio View
  if (currentView === 'campaign-studio') {
    return (
      <CampaignStudio
        campaignId={activeCampaignId}
        onBackToCampaigns={() => {
          setCurrentView('campaigns-list');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    );
  }

  // 2. Saved Campaigns List View
  if (currentView === 'campaigns-list') {
    return (
      <CampaignsList
        onBackToHome={() => {
          setCurrentView('landing');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onCreateNew={handleNavigateToCreateCampaign}
        onOpenCampaign={handleOpenStudio}
      />
    );
  }

  // 3. Create Campaign View
  if (currentView === 'create-campaign') {
    return (
      <CreateCampaign
        onBack={() => {
          setCurrentView('landing');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onOpenStudio={handleOpenStudio}
      />
    );
  }

  // 4. Landing Page View (Black + Warm Gold Editorial Redesign)
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#111111] flex flex-col selection:bg-[#D4A72C]/25 selection:text-[#0A0A0A]">
      {/* Sticky Navigation */}
      <Navbar
        onOpenTemplates={handleOpenTemplates}
        onOpenCampaigns={handleOpenCampaignsList}
        onCreateCampaign={handleNavigateToCreateCampaign}
      />

      {/* Main Content Flow: Off-white -> Off-white -> Black -> Off-white -> Off-white -> Black */}
      <main className="flex-1">
        {/* 1. Hero Section (Off-white) */}
        <Hero onCreateCampaign={handleNavigateToCreateCampaign} />

        {/* 2. Workflow / How It Works Section (Off-white) with Final Part 4 Export */}
        <HowItWorks onOpenExport={handleOpenExport} />

        {/* 3. Campaign Studio Product Showcase (Black #0A0A0A) */}
        <ProductShowcase
          onCreateCampaign={handleNavigateToCreateCampaign}
          onOpenExport={handleOpenExport}
        />

        {/* 4. Social Formats Matrix Section (Off-white) */}
        <Platforms />

        {/* 5. Campaign Presets & Templates Grid (Off-white) */}
        <TemplatesSection onSelectTemplate={handleNavigateToCreateCampaign} />

        {/* 6. High-Contrast Final CTA Section (Black #0A0A0A) */}
        <CtaSection onCreateCampaign={handleNavigateToCreateCampaign} />
      </main>

      {/* 7. Redesigned Multi-Column Footer with Ghost Watermark & Socials */}
      <Footer
        onOpenTemplates={handleOpenTemplates}
        onOpenCampaigns={handleOpenCampaignsList}
        onCreateCampaign={handleNavigateToCreateCampaign}
        onOpenExport={handleOpenExport}
      />

      {/* Notification Dialog */}
      <NotificationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        title={modalState.title}
        message={modalState.message}
      />

      {/* Part 4: Export Campaign Post Modal */}
      <ExportPostModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
