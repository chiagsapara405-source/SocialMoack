import React from 'react';
import { InstagramPost } from '../mockups/InstagramPost';
import { InstagramStory } from '../mockups/InstagramStory';
import { LinkedInPost } from '../mockups/LinkedInPost';
import { XPost } from '../mockups/XPost';
import { FacebookPost } from '../mockups/FacebookPost';
import { WhatsAppMessage } from '../mockups/WhatsAppMessage';
import { Campaign, PlatformId } from '../../types/campaign';

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  badge?: string;
  isAvailable: boolean;
  aspectRatio: string;
  resolution: string;
  component: React.ComponentType<{
    campaign: Campaign;
    content: any;
  }> | null;
}

export const platformRegistry: Record<PlatformId, PlatformConfig> = {
  instagram: {
    id: 'instagram',
    name: 'Instagram Post',
    aspectRatio: '1:1',
    resolution: '1080 × 1080',
    isAvailable: true,
    component: InstagramPost,
  },
  instagramStory: {
    id: 'instagramStory',
    name: 'Instagram Story',
    aspectRatio: '9:16',
    resolution: '1080 × 1920',
    isAvailable: true,
    component: InstagramStory,
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn Post',
    aspectRatio: '1.91:1',
    resolution: '1200 × 627',
    isAvailable: true,
    component: LinkedInPost,
  },
  twitter: {
    id: 'twitter',
    name: 'X (Twitter)',
    aspectRatio: '16:9',
    resolution: '1200 × 675',
    isAvailable: true,
    component: XPost,
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook Event',
    aspectRatio: '16:9',
    resolution: '1200 × 630',
    isAvailable: true,
    component: FacebookPost,
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp Message',
    aspectRatio: '9:16',
    resolution: 'Chat Feed',
    isAvailable: true,
    component: WhatsAppMessage,
  },
};
