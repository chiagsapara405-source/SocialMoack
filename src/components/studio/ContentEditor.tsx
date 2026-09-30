import React from 'react';
import {
  PlatformId,
  InstagramContent,
  InstagramStoryContent,
  LinkedInContent,
  TwitterContent,
  FacebookContent,
  WhatsAppContent,
} from '../../types/campaign';

interface ContentEditorProps {
  activePlatform: PlatformId;
  instagramContent: InstagramContent;
  storyContent: InstagramStoryContent;
  linkedinContent: LinkedInContent;
  twitterContent: TwitterContent;
  facebookContent: FacebookContent;
  whatsappContent: WhatsAppContent;
  onUpdateInstagram: (updated: Partial<InstagramContent>) => void;
  onUpdateStory: (updated: Partial<InstagramStoryContent>) => void;
  onUpdateLinkedIn: (updated: Partial<LinkedInContent>) => void;
  onUpdateTwitter: (updated: Partial<TwitterContent>) => void;
  onUpdateFacebook: (updated: Partial<FacebookContent>) => void;
  onUpdateWhatsApp: (updated: Partial<WhatsAppContent>) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  activePlatform,
  instagramContent,
  storyContent,
  linkedinContent,
  twitterContent,
  facebookContent,
  whatsappContent,
  onUpdateInstagram,
  onUpdateStory,
  onUpdateLinkedIn,
  onUpdateTwitter,
  onUpdateFacebook,
  onUpdateWhatsApp,
}) => {
  // 1. INSTAGRAM POST EDITOR
  if (activePlatform === 'instagram') {
    const hashtagsText = (instagramContent.hashtags || []).join(' ');

    const handleHashtagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const parsed = raw
        .split(/[\s,]+/)
        .map((tag) => tag.trim())
        .filter(Boolean)
        .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));
      onUpdateInstagram({ hashtags: parsed });
    };

    const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      if (val.length <= 500) {
        onUpdateInstagram({ caption: val });
      }
    };

    return (
      <div className="space-y-6 text-left">
        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            HEADLINE
          </label>
          <input
            type="text"
            value={instagramContent.headline || ''}
            onChange={(e) => onUpdateInstagram({ headline: e.target.value })}
            placeholder="AI Arena 2026 is Here 🚀"
            className="w-full py-2 text-xs font-semibold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#7C3AED] focus:ring-0 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
              CAPTION
            </label>
            <span
              className={`text-[10px] font-mono ${
                (instagramContent.caption || '').length >= 500
                  ? 'text-amber-600 font-bold'
                  : 'text-slate-400'
              }`}
            >
              {(instagramContent.caption || '').length} / 500
            </span>
          </div>
          <textarea
            rows={4}
            value={instagramContent.caption || ''}
            onChange={handleCaptionChange}
            placeholder="Describe the keynote, challenges, and timeline..."
            maxLength={500}
            className="w-full py-2 text-xs text-[#0B1020] leading-relaxed bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#7C3AED] focus:ring-0 focus:outline-hidden transition-colors resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            CALL TO ACTION (CTA)
          </label>
          <input
            type="text"
            value={instagramContent.cta || ''}
            onChange={(e) => onUpdateInstagram({ cta: e.target.value })}
            placeholder="Register Now"
            className="w-full py-2 text-xs font-semibold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#7C3AED] focus:ring-0 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            HASHTAGS
          </label>
          <input
            type="text"
            defaultValue={hashtagsText}
            onChange={handleHashtagsChange}
            placeholder="#AIArena #TechMinds #Innovation"
            className="w-full py-2 text-xs font-mono text-[#7C3AED] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#7C3AED] focus:ring-0 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              LIKES
            </label>
            <input
              type="number"
              min={0}
              value={instagramContent.likes ?? 142}
              onChange={(e) =>
                onUpdateInstagram({ likes: Math.max(0, parseInt(e.target.value, 10) || 0) })
              }
              className="w-full py-1 text-xs font-mono font-bold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#7C3AED] focus:ring-0 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              COMMENTS
            </label>
            <input
              type="number"
              min={0}
              value={instagramContent.comments ?? 18}
              onChange={(e) =>
                onUpdateInstagram({ comments: Math.max(0, parseInt(e.target.value, 10) || 0) })
              }
              className="w-full py-1 text-xs font-mono font-bold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#7C3AED] focus:ring-0 focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    );
  }

  // 2. INSTAGRAM STORY EDITOR
  if (activePlatform === 'instagramStory') {
    return (
      <div className="space-y-6 text-left">
        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            STORY HEADLINE
          </label>
          <input
            type="text"
            value={storyContent.headline || ''}
            onChange={(e) => onUpdateStory({ headline: e.target.value })}
            placeholder="AI ARENA 2026"
            className="w-full py-2 text-xs font-bold uppercase text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#7C3AED] focus:ring-0 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            HOOK / SUBHEADLINE
          </label>
          <textarea
            rows={3}
            value={storyContent.subheadline || ''}
            onChange={(e) => onUpdateStory({ subheadline: e.target.value })}
            placeholder="24 Hours of Innovation. Build with AI."
            className="w-full py-2 text-xs text-[#0B1020] leading-relaxed bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#7C3AED] focus:ring-0 focus:outline-hidden transition-colors resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            SWIPE UP BUTTON TEXT
          </label>
          <input
            type="text"
            value={storyContent.cta || ''}
            onChange={(e) => onUpdateStory({ cta: e.target.value })}
            placeholder="REGISTER NOW"
            className="w-full py-2 text-xs font-bold uppercase text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#7C3AED] focus:ring-0 focus:outline-hidden transition-colors"
          />
        </div>
      </div>
    );
  }

  // 3. LINKEDIN POST EDITOR
  if (activePlatform === 'linkedin') {
    const hashtagsText = (linkedinContent.hashtags || []).join(' ');

    const handleHashtagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const parsed = raw
        .split(/[\s,]+/)
        .map((tag) => tag.trim())
        .filter(Boolean)
        .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));
      onUpdateLinkedIn({ hashtags: parsed });
    };

    return (
      <div className="space-y-6 text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
              POST CONTENT (BODY)
            </label>
            <span className="text-[10px] font-mono text-slate-400">
              {(linkedinContent.content || '').length} chars
            </span>
          </div>
          <textarea
            rows={6}
            value={linkedinContent.content || ''}
            onChange={(e) => onUpdateLinkedIn({ content: e.target.value })}
            placeholder="We are thrilled to announce..."
            className="w-full py-2 text-xs text-[#0B1020] leading-relaxed bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#0A66C2] focus:ring-0 focus:outline-hidden transition-colors resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            ARTICLE / CARD TITLE
          </label>
          <input
            type="text"
            value={linkedinContent.articleCardTitle || ''}
            onChange={(e) => onUpdateLinkedIn({ articleCardTitle: e.target.value })}
            placeholder="AI Hackathon 2026 — Registration & Keynotes"
            className="w-full py-2 text-xs font-semibold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#0A66C2] focus:ring-0 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
              CARD DOMAIN
            </label>
            <input
              type="text"
              value={linkedinContent.articleCardDomain || ''}
              onChange={(e) => onUpdateLinkedIn({ articleCardDomain: e.target.value })}
              placeholder="techhorizons.org"
              className="w-full py-2 text-xs font-mono text-slate-700 bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#0A66C2] focus:ring-0 focus:outline-hidden transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
              CTA BUTTON
            </label>
            <input
              type="text"
              value={linkedinContent.cta || ''}
              onChange={(e) => onUpdateLinkedIn({ cta: e.target.value })}
              placeholder="Learn More"
              className="w-full py-2 text-xs font-semibold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#0A66C2] focus:ring-0 focus:outline-hidden transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            HASHTAGS
          </label>
          <input
            type="text"
            defaultValue={hashtagsText}
            onChange={handleHashtagsChange}
            placeholder="#Innovation #Leadership #TechEvent"
            className="w-full py-2 text-xs font-mono text-[#0A66C2] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#0A66C2] focus:ring-0 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
              REACTIONS
            </label>
            <input
              type="number"
              min={0}
              value={linkedinContent.reactions ?? 384}
              onChange={(e) =>
                onUpdateLinkedIn({ reactions: Math.max(0, parseInt(e.target.value, 10) || 0) })
              }
              className="w-full py-1 text-xs font-mono font-bold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#0A66C2] focus:ring-0 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
              COMMENTS
            </label>
            <input
              type="number"
              min={0}
              value={linkedinContent.comments ?? 42}
              onChange={(e) =>
                onUpdateLinkedIn({ comments: Math.max(0, parseInt(e.target.value, 10) || 0) })
              }
              className="w-full py-1 text-xs font-mono font-bold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#0A66C2] focus:ring-0 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
              REPOSTS
            </label>
            <input
              type="number"
              min={0}
              value={linkedinContent.reposts ?? 29}
              onChange={(e) =>
                onUpdateLinkedIn({ reposts: Math.max(0, parseInt(e.target.value, 10) || 0) })
              }
              className="w-full py-1 text-xs font-mono font-bold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#0A66C2] focus:ring-0 focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    );
  }

  // 4. X (TWITTER) POST EDITOR
  if (activePlatform === 'twitter') {
    const hashtagsText = (twitterContent.hashtags || []).join(' ');

    const handleHashtagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const parsed = raw
        .split(/[\s,]+/)
        .map((tag) => tag.trim())
        .filter(Boolean)
        .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));
      onUpdateTwitter({ hashtags: parsed });
    };

    const textLength = (twitterContent.text || '').length;

    return (
      <div className="space-y-6 text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
              POST TEXT
            </label>
            <span
              className={`text-[10px] font-mono font-bold ${
                textLength > 280
                  ? 'text-rose-600'
                  : textLength > 240
                  ? 'text-amber-600'
                  : 'text-slate-400'
              }`}
            >
              {textLength} / 280
            </span>
          </div>
          <textarea
            rows={4}
            value={twitterContent.text || ''}
            onChange={(e) => onUpdateTwitter({ text: e.target.value })}
            placeholder="🚨 ANNOUNCEMENT: AI Hackathon 2026 passes are live!"
            className="w-full py-2 text-xs text-[#0B1020] leading-relaxed bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1D9BF0] focus:ring-0 focus:outline-hidden transition-colors resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            HASHTAGS
          </label>
          <input
            type="text"
            defaultValue={hashtagsText}
            onChange={handleHashtagsChange}
            placeholder="#AIArena #Hackathon #Tech2026"
            className="w-full py-2 text-xs font-mono text-[#1D9BF0] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1D9BF0] focus:ring-0 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            TIMESTAMP & VIEWS
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={twitterContent.timestamp || '10:24 AM · Oct 15, 2026'}
              onChange={(e) => onUpdateTwitter({ timestamp: e.target.value })}
              placeholder="10:24 AM · Oct 15, 2026"
              className="w-full py-1 text-xs font-mono text-slate-700 bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1D9BF0] focus:ring-0 focus:outline-hidden"
            />
            <input
              type="text"
              value={twitterContent.views || '16.8K'}
              onChange={(e) => onUpdateTwitter({ views: e.target.value })}
              placeholder="16.8K views"
              className="w-full py-1 text-xs font-mono text-slate-700 bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1D9BF0] focus:ring-0 focus:outline-hidden"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
              LIKES
            </label>
            <input
              type="number"
              min={0}
              value={twitterContent.likes ?? 218}
              onChange={(e) =>
                onUpdateTwitter({ likes: Math.max(0, parseInt(e.target.value, 10) || 0) })
              }
              className="w-full py-1 text-xs font-mono font-bold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1D9BF0] focus:ring-0 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
              RETWEETS
            </label>
            <input
              type="number"
              min={0}
              value={twitterContent.retweets ?? 47}
              onChange={(e) =>
                onUpdateTwitter({ retweets: Math.max(0, parseInt(e.target.value, 10) || 0) })
              }
              className="w-full py-1 text-xs font-mono font-bold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1D9BF0] focus:ring-0 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
              REPLIES
            </label>
            <input
              type="number"
              min={0}
              value={twitterContent.replies ?? 16}
              onChange={(e) =>
                onUpdateTwitter({ replies: Math.max(0, parseInt(e.target.value, 10) || 0) })
              }
              className="w-full py-1 text-xs font-mono font-bold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1D9BF0] focus:ring-0 focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    );
  }

  // 5. FACEBOOK EVENT / POST EDITOR
  if (activePlatform === 'facebook') {
    return (
      <div className="space-y-6 text-left">
        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            POST PRIMARY COPY
          </label>
          <textarea
            rows={4}
            value={facebookContent.primaryText || ''}
            onChange={(e) => onUpdateFacebook({ primaryText: e.target.value })}
            placeholder="📢 Save the date! Our team is proud to present..."
            className="w-full py-2 text-xs text-[#0B1020] leading-relaxed bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1877F2] focus:ring-0 focus:outline-hidden transition-colors resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            EVENT CARD TITLE
          </label>
          <input
            type="text"
            value={facebookContent.eventTitle || ''}
            onChange={(e) => onUpdateFacebook({ eventTitle: e.target.value })}
            placeholder="AI Hackathon 2026"
            className="w-full py-2 text-xs font-semibold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1877F2] focus:ring-0 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            DATE & VENUE DISPLAY
          </label>
          <input
            type="text"
            value={facebookContent.eventTimeLocation || ''}
            onChange={(e) => onUpdateFacebook({ eventTimeLocation: e.target.value })}
            placeholder="OCT 15 · RK University"
            className="w-full py-2 text-xs font-mono text-slate-700 bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1877F2] focus:ring-0 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            BUTTON CTA
          </label>
          <input
            type="text"
            value={facebookContent.cta || ''}
            onChange={(e) => onUpdateFacebook({ cta: e.target.value })}
            placeholder="Interested"
            className="w-full py-2 text-xs font-semibold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1877F2] focus:ring-0 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="space-y-1">
            <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
              REACTIONS
            </label>
            <input
              type="number"
              min={0}
              value={facebookContent.reactions ?? 196}
              onChange={(e) =>
                onUpdateFacebook({ reactions: Math.max(0, parseInt(e.target.value, 10) || 0) })
              }
              className="w-full py-1 text-xs font-mono font-bold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1877F2] focus:ring-0 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
              COMMENTS
            </label>
            <input
              type="number"
              min={0}
              value={facebookContent.comments ?? 31}
              onChange={(e) =>
                onUpdateFacebook({ comments: Math.max(0, parseInt(e.target.value, 10) || 0) })
              }
              className="w-full py-1 text-xs font-mono font-bold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1877F2] focus:ring-0 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
              SHARES
            </label>
            <input
              type="number"
              min={0}
              value={facebookContent.shares ?? 18}
              onChange={(e) =>
                onUpdateFacebook({ shares: Math.max(0, parseInt(e.target.value, 10) || 0) })
              }
              className="w-full py-1 text-xs font-mono font-bold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1877F2] focus:ring-0 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
              INTERESTED
            </label>
            <input
              type="number"
              min={0}
              value={facebookContent.interestedCount ?? 312}
              onChange={(e) =>
                onUpdateFacebook({ interestedCount: Math.max(0, parseInt(e.target.value, 10) || 0) })
              }
              className="w-full py-1 text-xs font-mono font-bold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#1877F2] focus:ring-0 focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    );
  }

  // 6. WHATSAPP BROADCAST MESSAGE EDITOR
  if (activePlatform === 'whatsapp') {
    return (
      <div className="space-y-6 text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
              MESSAGE TEXT
            </label>
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              *bold* supported
            </span>
          </div>
          <textarea
            rows={5}
            value={whatsappContent.messageBody || ''}
            onChange={(e) => onUpdateWhatsApp({ messageBody: e.target.value })}
            placeholder="*Invitation: AI Hackathon 2026* 🚀&#10;&#10;You're invited to join..."
            className="w-full py-2 text-xs text-[#0B1020] leading-relaxed bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#128C7E] focus:ring-0 focus:outline-hidden transition-colors resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            LINK CARD TITLE
          </label>
          <input
            type="text"
            value={whatsappContent.cardTitle || ''}
            onChange={(e) => onUpdateWhatsApp({ cardTitle: e.target.value })}
            placeholder="AI Hackathon 2026 Official RSVP"
            className="w-full py-2 text-xs font-semibold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#128C7E] focus:ring-0 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
            LINK CARD DESCRIPTION
          </label>
          <textarea
            rows={2}
            value={whatsappContent.cardDescription || ''}
            onChange={(e) => onUpdateWhatsApp({ cardDescription: e.target.value })}
            placeholder="Hosted by Tech Minds Club. Click to view passes and agenda."
            className="w-full py-2 text-xs text-[#0B1020] leading-relaxed bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#128C7E] focus:ring-0 focus:outline-hidden transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
              ACTION BUTTON (CTA)
            </label>
            <input
              type="text"
              value={whatsappContent.ctaText || ''}
              onChange={(e) => onUpdateWhatsApp({ ctaText: e.target.value })}
              placeholder="Register Now"
              className="w-full py-2 text-xs font-semibold text-[#0B1020] bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#128C7E] focus:ring-0 focus:outline-hidden transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#667085]">
              TIME STAMP
            </label>
            <input
              type="text"
              value={whatsappContent.timestamp || '10:45 AM'}
              onChange={(e) => onUpdateWhatsApp({ timestamp: e.target.value })}
              placeholder="10:45 AM"
              className="w-full py-2 text-xs font-mono text-slate-700 bg-transparent border-0 border-b border-[#E5E7EB] focus:border-[#128C7E] focus:ring-0 focus:outline-hidden transition-colors"
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};
