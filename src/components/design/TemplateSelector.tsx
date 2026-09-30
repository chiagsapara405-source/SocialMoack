import React from 'react';
import { InstagramTemplate } from '../../types/campaign';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  currentTemplate: InstagramTemplate;
  onSelectTemplate: (template: InstagramTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  onSelectTemplate,
}) => {
  const templates: {
    id: InstagramTemplate;
    name: string;
    desc: string;
  }[] = [
    { id: 'classic', name: 'Classic', desc: 'Balanced layout with image focus' },
    { id: 'bold', name: 'Bold', desc: 'Heavy typography & high contrast' },
    { id: 'minimal', name: 'Minimal', desc: 'Clean editorial with whitespace' },
    { id: 'event', name: 'Event Focus', desc: 'Hero visual dominance & badge' },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2.5">
        {templates.map((tpl) => {
          const isSelected = currentTemplate === tpl.id;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onSelectTemplate(tpl.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between group ${
                isSelected
                  ? 'border-[#7C3AED] bg-purple-50/40 ring-1 ring-[#7C3AED]'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {/* Mini CSS Thumbnail Preview */}
              <div className="w-full aspect-[4/3] rounded-md border border-slate-200/80 bg-slate-50 mb-2 overflow-hidden p-1.5 flex flex-col justify-between">
                {tpl.id === 'classic' && (
                  <>
                    <div className="w-full h-1/2 bg-slate-300 rounded-2xs" />
                    <div className="space-y-1">
                      <div className="w-3/4 h-1.5 bg-[#0A0A0A] rounded-2xs" />
                      <div className="w-1/2 h-1 bg-[#7C3AED] rounded-2xs" />
                    </div>
                  </>
                )}
                {tpl.id === 'bold' && (
                  <div className="h-full flex flex-col justify-center space-y-1 bg-[#0A0A0A] p-1.5 rounded-2xs text-white">
                    <div className="w-4/5 h-2 bg-[#7C3AED] rounded-2xs" />
                    <div className="w-3/5 h-2 bg-white rounded-2xs" />
                    <div className="w-2/5 h-1 bg-white/60 rounded-2xs mt-1" />
                  </div>
                )}
                {tpl.id === 'minimal' && (
                  <div className="h-full flex flex-col justify-between p-1">
                    <div className="w-2/3 h-1.5 bg-[#0A0A0A] rounded-2xs" />
                    <div className="w-full h-px bg-slate-200 my-1" />
                    <div className="w-1/3 h-1 bg-slate-400 rounded-2xs" />
                  </div>
                )}
                {tpl.id === 'event' && (
                  <div className="h-full relative rounded-2xs overflow-hidden bg-slate-800 p-1 flex flex-col justify-between">
                    <div className="w-3 h-3 rounded-full bg-[#7C3AED] self-end" />
                    <div className="bg-black/60 p-1 rounded-2xs">
                      <div className="w-3/4 h-1.5 bg-white rounded-2xs" />
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Check */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0A0A0A]">{tpl.name}</span>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                {tpl.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
