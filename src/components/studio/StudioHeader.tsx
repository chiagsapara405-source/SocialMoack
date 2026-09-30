import React from 'react';
import { ArrowLeft, Save, DownloadCloud, CheckCircle2, Clock } from 'lucide-react';

interface StudioHeaderProps {
  campaignName: string;
  activePlatformName?: string;
  isSaving: boolean;
  lastSavedAt: Date | null;
  onBackToCampaigns: () => void;
  onManualSave: () => void;
  onExport: () => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  campaignName,
  activePlatformName,
  isSaving,
  onBackToCampaigns,
  onManualSave,
  onExport,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 select-none">
      {/* Left: Back Navigation & Active Campaign Identity */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onBackToCampaigns}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0B1020] hover:text-[#7C3AED] transition-colors py-1 px-2 rounded-lg hover:bg-slate-100 cursor-pointer shrink-0 uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← Campaigns</span>
        </button>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-extrabold text-[#0B1020] truncate tracking-tight">
              {campaignName || 'Untitled Campaign'}
            </h1>
            <span className="hidden md:inline-block text-[10px] font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 font-semibold uppercase">
              STUDIO
            </span>
          </div>
          <p className="text-[10px] font-mono text-[#667085] flex items-center gap-1.5">
            <span>{activePlatformName ? `${activePlatformName} Workspace` : 'Multi-Channel Campaign'}</span>
            <span>·</span>
            {isSaving ? (
              <span className="text-amber-600 font-semibold inline-flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 animate-spin" />
                <span>Saving...</span>
              </span>
            ) : (
              <span className="text-emerald-600 font-semibold inline-flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>Saved</span>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Right: Studio Actions (Editorial button styling) */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <button
          onClick={onManualSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-[#0B1020] text-xs font-semibold rounded-lg border border-slate-300 shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5 text-slate-500" />
          <span>Save</span>
        </button>

        <button
          onClick={onExport}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B1020] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <DownloadCloud className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};
