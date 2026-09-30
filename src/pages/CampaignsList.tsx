import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Calendar, MapPin, Layers, ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { Campaign } from '../types/campaign';
import { getCampaigns } from '../utils/storage';

interface CampaignsListProps {
  onBackToHome: () => void;
  onCreateNew: () => void;
  onOpenCampaign: (campaignId: string) => void;
}

export const CampaignsList: React.FC<CampaignsListProps> = ({
  onBackToHome,
  onCreateNew,
  onOpenCampaign,
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    setCampaigns(getCampaigns());
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FC] pb-24">
      {/* Top Studio Header Bar */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0B1020] hover:text-[#7C3AED] transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Landing Page</span>
            </button>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-[#0B1020] tracking-tight">
                CAMPAIGNS
              </span>
              <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-semibold uppercase">
                WORKSPACE
              </span>
            </div>
          </div>

          <button
            onClick={onCreateNew}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0B1020] hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>New Campaign</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 text-left">
        {/* Editorial Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-[#7C3AED] bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200/60 mb-2">
              <span>CAMPAIGNS / DIRECTORY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1020] tracking-tight">
              Your Creative Workspace
            </h1>
            <p className="text-sm text-[#667085] mt-1">
              Select any campaign to launch the Studio, edit captions, and preview Instagram mockups.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500 bg-white border border-[#E5E7EB] px-3 py-1.5 rounded-lg shadow-2xs">
            {campaigns.length} {campaigns.length === 1 ? 'CAMPAIGN' : 'CAMPAIGNS'} STORED
          </div>
        </div>

        {/* Empty State vs Campaign Cards */}
        {campaigns.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-[#E5E7EB] shadow-xs text-center max-w-xl mx-auto space-y-6 my-10">
            {/* Visual Campaign Flow Miniature */}
            <div className="w-full max-w-xs mx-auto p-4 bg-[#F7F8FC] rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>FLOW</span>
                <span>EVENT → MULTI-CHANNEL</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-slate-700">
                <span className="p-1.5 bg-white rounded border border-slate-200">Event</span>
                <span className="text-[#7C3AED]">→</span>
                <span className="p-1.5 bg-white rounded border border-slate-200">Post</span>
                <span className="text-[#7C3AED]">→</span>
                <span className="p-1.5 bg-white rounded border border-slate-200">Story</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-slate-400">
                STATUS / EMPTY
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1020] mt-1">
                YOUR CAMPAIGN WORKSPACE IS EMPTY
              </h2>
              <p className="text-xs sm:text-sm text-[#667085] mt-2 max-w-sm mx-auto leading-relaxed">
                Create your first event campaign to generate tailored social content and publication mockups.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onCreateNew}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1020] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#7C3AED]" />
                <span>+ Create Campaign</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="group bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#7C3AED]/50 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
                onClick={() => onOpenCampaign(camp.id)}
              >
                <div>
                  {/* Image-First Campaign Thumbnail Banner */}
                  <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                    {camp.assets.poster ? (
                      <img
                        src={camp.assets.poster}
                        alt={camp.event.name}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                    ) : (
                      <div
                        className="w-full h-full p-5 flex flex-col justify-between text-white"
                        style={{
                          background: `linear-gradient(135deg, #0B1020 0%, #1A1636 50%, ${camp.brand.primaryColor} 100%)`,
                        }}
                      >
                        <span className="text-[10px] font-mono tracking-wider text-purple-200 bg-white/10 px-2 py-0.5 rounded self-start font-bold uppercase">
                          STUDIO READY
                        </span>
                        <h3 className="text-base font-black leading-tight uppercase line-clamp-2">
                          {camp.event.name}
                        </h3>
                      </div>
                    )}

                    {/* Format count tag */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] font-mono font-bold text-white border border-white/15">
                      06 FORMATS
                    </div>
                  </div>

                  {/* Body Content Details */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h2 className="text-base font-extrabold text-[#0B1020] group-hover:text-[#7C3AED] transition-colors truncate">
                        {camp.event.name}
                      </h2>
                      <p className="text-xs text-[#667085] line-clamp-2 mt-1 leading-relaxed">
                        {camp.event.description}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs font-mono text-slate-500 pt-2 border-t border-slate-100">
                      {camp.event.date && (
                        <div className="flex items-center gap-1.5 truncate">
                          <Calendar className="w-3 h-3 text-[#7C3AED] shrink-0" />
                          <span className="truncate">{camp.event.date}</span>
                        </div>
                      )}
                      {camp.event.venue && (
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{camp.event.venue}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 py-3 bg-[#F7F8FC] border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Instagram · LinkedIn · X +3
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#7C3AED] group-hover:translate-x-0.5 transition-transform">
                    <span>Open Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
