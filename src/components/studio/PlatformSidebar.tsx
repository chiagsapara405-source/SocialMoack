import React from 'react';
import { PlatformId } from '../../types/campaign';
import { platformRegistry } from './platformRegistry';

interface PlatformSidebarProps {
  activePlatform: PlatformId;
  onSwitchPlatform: (platform: PlatformId) => void;
}

const formatNumberList: { id: PlatformId; number: string; label: string }[] = [
  { id: 'instagram', number: '01', label: 'Instagram' },
  { id: 'instagramStory', number: '02', label: 'Story' },
  { id: 'linkedin', number: '03', label: 'LinkedIn' },
  { id: 'twitter', number: '04', label: 'X' },
  { id: 'facebook', number: '05', label: 'Facebook' },
  { id: 'whatsapp', number: '06', label: 'WhatsApp' },
];

export const PlatformSidebar: React.FC<PlatformSidebarProps> = ({
  activePlatform,
  onSwitchPlatform,
}) => {
  return (
    <aside className="w-full md:w-52 shrink-0 bg-white border-b md:border-b-0 md:border-r border-[#E5E7EB] p-3 sm:p-4 select-none">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
          FORMATS
        </span>
        <span className="text-[9px] font-mono font-bold text-[#7C3AED] bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
          6 SPECS
        </span>
      </div>

      {/* Numbered Compact Format List */}
      <nav
        className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-1 md:pb-0 scrollbar-none"
        aria-label="Format navigation"
      >
        {formatNumberList.map((item) => {
          const config = platformRegistry[item.id];
          const isActive = activePlatform === item.id;
          const isAvailable = config.isAvailable;

          return (
            <button
              key={item.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && onSwitchPlatform(item.id)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 md:shrink cursor-pointer text-left relative ${
                isActive
                  ? 'bg-purple-50/80 text-[#7C3AED] font-bold shadow-2xs border border-purple-200/80'
                  : isAvailable
                  ? 'text-[#0B1020] hover:bg-slate-50 border border-transparent'
                  : 'text-slate-400 opacity-50 cursor-not-allowed border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`font-mono text-[11px] ${
                    isActive ? 'text-[#7C3AED] font-black' : 'text-slate-400'
                  }`}
                >
                  {item.number}
                </span>
                <span className="whitespace-nowrap">{item.label}</span>
              </div>

              {isActive ? (
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              ) : !isAvailable ? (
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                  Soon
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
