export interface InstagramContent {
  headline: string;
  caption: string;
  cta: string;
  hashtags: string[];
  likes: number;
  comments: number;
  timestamp: string;
}

export interface InstagramStoryContent {
  headline: string;
  subheadline: string;
  cta: string;
}

export interface LinkedInContent {
  headline: string;
  content: string;
  cta: string;
  hashtags: string[];
  reactions: number;
  comments: number;
  reposts: number;
  articleCardTitle: string;
  articleCardDomain: string;
}

export interface TwitterContent {
  text: string;
  hashtags: string[];
  likes: number;
  retweets: number;
  replies: number;
  views: string;
  timestamp: string;
}

export interface FacebookContent {
  primaryText: string;
  eventTitle: string;
  eventTimeLocation: string;
  cta: string;
  reactions: number;
  comments: number;
  shares: number;
  interestedCount: number;
}

export interface WhatsAppContent {
  messageBody: string;
  cardTitle: string;
  cardDescription: string;
  ctaText: string;
  timestamp: string;
}

export interface CampaignContent {
  instagram: InstagramContent;
  instagramStory: InstagramStoryContent;
  linkedin: LinkedInContent;
  twitter: TwitterContent;
  facebook: FacebookContent;
  whatsapp: WhatsAppContent;
}

export type PlatformId =
  | 'instagram'
  | 'instagramStory'
  | 'linkedin'
  | 'twitter'
  | 'facebook'
  | 'whatsapp';

export type InstagramTemplate = 'classic' | 'bold' | 'minimal' | 'event';

export interface CampaignDesign {
  template: InstagramTemplate;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  headlineSize: 'small' | 'medium' | 'large';
  headlineWeight: 'regular' | 'medium' | 'bold';
  alignment: 'left' | 'center' | 'right';
  imagePosition: 'top' | 'center' | 'bottom';
  imageFit: 'cover' | 'contain';
  overlayEnabled: boolean;
  overlayStrength: number;
  showOrganizer: boolean;
  showLogo: boolean;
  showSocialHandle: boolean;
  ctaStyle: 'filled' | 'outline' | 'minimal';
}

export const DEFAULT_CAMPAIGN_DESIGN: CampaignDesign = {
  template: 'classic',
  primaryColor: '#7C3AED',
  secondaryColor: '#2563EB',
  backgroundColor: '#FFFFFF',
  fontFamily: 'Inter',
  headlineSize: 'medium',
  headlineWeight: 'bold',
  alignment: 'left',
  imagePosition: 'center',
  imageFit: 'cover',
  overlayEnabled: false,
  overlayStrength: 20,
  showOrganizer: true,
  showLogo: true,
  showSocialHandle: true,
  ctaStyle: 'filled',
};

export interface Campaign {
  id: string;

  event: {
    name: string;
    description: string;
    date: string;
    time: string;
    venue: string;
    organizer: string;
    audience: string;
    cta: string;
  };

  assets: {
    poster: string | null;
    logo: string | null;
  };

  brand: {
    primaryColor: string;
    secondaryColor: string;
    socialHandle: string;
  };

  content: CampaignContent;
  design?: CampaignDesign;

  createdAt: string;
}

export interface CampaignFormData {
  name: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  audience: string;
  cta: string;
  posterFile: File | null;
  posterDataUrl: string | null;
  posterFileName: string | null;
  posterFileSize: number | null;
  logoFile: File | null;
  logoDataUrl: string | null;
  logoFileName: string | null;
  logoFileSize: number | null;
  primaryColor: string;
  secondaryColor: string;
  socialHandle: string;
}
