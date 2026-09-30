import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  FileArchive,
  Image,
  Share2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface ExportPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportPostModal: React.FC<ExportPostModalProps> = ({ isOpen, onClose }) => {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([
    'instagram',
    'story',
    'linkedin',
    'twitter',
  ]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  if (!isOpen) return null;

  const toggleFormat = (id: string) => {
    setSelectedFormats((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStartExport = () => {
    setIsExporting(true);
    setExportComplete(false);

    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);

      // Trigger synthetic download of mock asset package
      const element = document.createElement('a');
      const file = new Blob(
        [
          `SocialMock AI - Export Package\nCampaign: AI ARENA 2026\nDate: 01 OCT · RKU\n\nFormats Included:\n- Instagram Post (1080x1080)\n- Instagram Story (1080x1920)\n- LinkedIn Post (1200x627)\n- X Post (1200x675)\n\nCaptions:\nJoin us at AI Arena 2026! Hackathon, keynotes, and live AI demos. #AIArena #Hackathon #AutonomousAI`,
        ],
        { type: 'text/plain' }
      );
      element.href = URL.createObjectURL(file);
      element.download = 'AI_Arena_2026_Campaign_Export.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1200);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(
      '🚨 Registration is officially open for AI ARENA 2026! 🚀\n\nJoin student developers, researchers, and creators at RKU Grand Auditorium on October 1st for 36 hours of autonomous agent building, keynotes, and $50k in prizes.\n\n👉 Reserve your seat: https://techminds.org/arena\n\n#AIArena2026 #Hackathon #GenerativeAI #TechMinds'
    );
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2200);
  };

  const formatList = [
    {
      id: 'instagram',
      name: 'Instagram Feed Post',
      spec: '1080 × 1080 px · 1:1 PNG',
      size: '2.4 MB',
    },
    {
      id: 'story',
      name: 'Instagram Story',
      spec: '1080 × 1920 px · 9:16 PNG',
      size: '3.1 MB',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Announcement',
      spec: '1200 × 627 px · 1.91:1 PNG',
      size: '2.8 MB',
    },
    {
      id: 'twitter',
      name: 'X (Twitter) Card',
      spec: '1200 × 675 px · 16:9 PNG',
      size: '1.9 MB',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#111111] text-white border border-white/15 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A72C]" />
            <h3 className="font-bold text-sm tracking-wide text-white uppercase font-mono">
              Part 4 · Export Campaign Post
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Summary Banner */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-[#D4A72C] font-bold">
                CAMPAIGN BATCH
              </p>
              <h4 className="text-sm font-bold text-white mt-0.5">
                AI ARENA 2026 · Ready to Export
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#D4A72C]/20 text-[#D4A72C] font-mono text-xs font-bold border border-[#D4A72C]/30">
              {selectedFormats.length} Formats Selected
            </span>
          </div>

          {/* Formats Checklist */}
          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase tracking-wider text-white/50 font-bold">
              Select Output Formats
            </p>
            <div className="space-y-1.5">
              {formatList.map((f) => {
                const isSelected = selectedFormats.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleFormat(f.id)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-white/10 border-[#D4A72C] text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected
                            ? 'bg-[#D4A72C] border-[#D4A72C] text-[#0A0A0A]'
                            : 'border-white/30'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{f.name}</p>
                        <p className="text-[10px] font-mono text-white/50">{f.spec}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-white/40">{f.size}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Copy Caption Utility */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Platform Captions & Hashtags</p>
              <p className="text-[10px] font-mono text-white/50">
                Formatted with line breaks & tag cluster
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyCaption}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer border border-white/15"
            >
              {copiedCaption ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D4A72C]" />
                  <span>Copy Caption</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#141414] border-t border-white/10 flex items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-white/50 hidden sm:block">
            {exportComplete ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Package downloaded
              </span>
            ) : (
              'Studio format export: PNG & ZIP'
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white/70 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              disabled={isExporting || selectedFormats.length === 0}
              onClick={handleStartExport}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4A72C] hover:bg-[#E7C45A] disabled:opacity-50 text-[#0A0A0A] font-bold text-xs transition-colors cursor-pointer shadow-sm"
            >
              {isExporting ? (
                <span>Packing Assets...</span>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Post Assets</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
