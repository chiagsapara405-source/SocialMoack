import React from 'react';
import { Sparkles, ArrowLeft, Layers, CheckCircle2 } from 'lucide-react';
import { getCampaignById } from '../utils/storage';

interface CampaignStudioPlaceholderProps {
  campaignId: string | null;
  onBackToHome: () => void;
  onCreateAnother: () => void;
}

export const CampaignStudioPlaceholder: React.FC<CampaignStudioPlaceholderProps> = ({
  campaignId,
  onBackToHome,
  onCreateAnother,
}) => {
  const campaign = campaignId ? getCampaignById(campaignId) : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto w-full my-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mx-auto border border-purple-100 shadow-2xs">
          <Layers className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
            Next Milestone
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-4 tracking-tight">
            Campaign Studio — Part 3
          </h1>
          <p className="text-sm text-[#64748B] mt-2 leading-relaxed">
            Campaign details and visual assets are securely structured and saved.
            Multi-platform mockups, AI caption generation, and export workflows will be built in Part 3.
          </p>
        </div>

        {campaign && (
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
            <div className="flex items-center justify-between font-semibold text-slate-700">
              <span>Ready Campaign:</span>
              <span className="text-[#7C3AED] font-bold">{campaign.event.name}</span>
            </div>
            <div className="text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Assets and brand configurations stored in localStorage</span>
            </div>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Landing Page</span>
          </button>
          <button
            onClick={onCreateAnother}
            className="w-full sm:w-auto inline-flex items-center justify-center py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Create Another
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 mt-6">
        SocialMock AI · Part 2 Completed
      </div>
    </div>
  );
};
