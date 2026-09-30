import { Campaign, CampaignContent, DEFAULT_CAMPAIGN_DESIGN } from '../types/campaign';

function sanitizeTag(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Dynamically generates platform-tailored mock social media content
 * derived from the actual event information provided by the user.
 */
export function generateMockContent(
  event: Campaign['event'],
  brand: Campaign['brand']
): CampaignContent {
  const cleanName = sanitizeTag(event.name) || 'SpecialEvent';
  const cleanOrg = sanitizeTag(event.organizer) || 'Community';
  const eventName = event.name || 'Upcoming Event';

  // Base hashtags
  const hashtags = [
    `#${cleanName}`,
    ...(cleanOrg ? [`#${cleanOrg}`] : []),
    ...(event.audience ? [`#${sanitizeTag(event.audience)}`] : []),
    '#Innovation',
    '#JoinTheMovement',
  ].filter((tag, idx, self) => self.indexOf(tag) === idx);

  const dateVenueInfo = [event.date, event.time, event.venue]
    .filter(Boolean)
    .join(' · ');

  // 1. Instagram Post Copy
  const descLead =
    event.description.length > 200
      ? event.description.slice(0, 197) + '...'
      : event.description;

  const igCaption = `${descLead}

${dateVenueInfo ? `📍 ${dateVenueInfo}\n` : ''}${
    event.organizer ? `Hosted by ${event.organizer}. ` : ''
  }Spaces are limited, don't miss out!`;

  // 2. LinkedIn Post Copy (Professional, structured, B2B tone)
  const linkedinBody = `We're thrilled to officially announce ${eventName}!

${event.description}

Here is what you can expect:
• Direct engagement with industry leaders and builders
• Hands-on sessions, keynotes & interactive showcases
• Exclusive networking opportunities for ${event.audience || 'participants and founders'}

📅 Date: ${event.date || 'To be announced'}
📍 Venue: ${event.venue || 'Virtual & Onsite'}

${event.cta || 'Secure your seat today'}: Link in comments or preview card below.`;

  // 3. X (Twitter) Copy (Punchy, under 280 characters)
  const tweetText = `🚨 ANNOUNCEMENT: ${eventName} is officially scheduled!

${event.description.length > 90 ? event.description.slice(0, 87) + '...' : event.description}

🗓️ ${event.date || 'Coming soon'}${event.venue ? `\n📍 ${event.venue}` : ''}

Early registration is now open 👇`;

  // 4. Facebook Event Post
  const fbText = `📢 Save the date! ${event.organizer || 'Our team'} is proud to host ${eventName}.

${event.description}

Join us on ${event.date || 'the upcoming date'} at ${event.venue || 'our venue'}. Click 'Interested' or 'Going' to receive schedule reminders and speaker announcements!`;

  // 5. WhatsApp Broadcast Invitation
  const whatsappBody = `*Invitation: ${eventName}* 🚀

Hello! You're invited to join us for *${eventName}* hosted by *${event.organizer || 'our team'}*.

📌 *Overview:* ${event.description.slice(0, 120)}...
📅 *Date:* ${event.date || 'TBA'}${event.time ? ` at ${event.time}` : ''}
📍 *Location:* ${event.venue || 'TBA'}
👥 *Audience:* ${event.audience || 'Open to all'}

👉 *Reserve your spot here:* https://${cleanName.toLowerCase()}.events/rsvp`;

  const domain = `${cleanName.toLowerCase() || 'event'}.org`;

  return {
    instagram: {
      headline: `${eventName} is Officially Announced! 🚀`,
      caption: igCaption.trim(),
      cta: event.cta || 'Register Now',
      hashtags,
      likes: 142,
      comments: 18,
      timestamp: '2 hours ago',
    },
    instagramStory: {
      headline: eventName.toUpperCase(),
      subheadline: dateVenueInfo || 'Live Experience & Innovation Showcase',
      cta: event.cta ? event.cta.toUpperCase() : 'REGISTER NOW',
    },
    linkedin: {
      headline: `Announcing ${eventName} | Keynote Sessions & Registration`,
      content: linkedinBody.trim(),
      cta: event.cta || 'Register Now',
      hashtags: [`#${cleanName}`, '#Leadership', '#TechInnovation', '#Networking'],
      reactions: 384,
      comments: 42,
      reposts: 29,
      articleCardTitle: `${eventName} — Attendee Registration & Agenda`,
      articleCardDomain: domain,
    },
    twitter: {
      text: tweetText.trim(),
      hashtags: [`#${cleanName}`, '#Tech2026', '#LiveEvent'],
      likes: 218,
      retweets: 47,
      replies: 16,
      views: '16.8K',
      timestamp: '10:24 AM · Oct 15, 2026',
    },
    facebook: {
      primaryText: fbText.trim(),
      eventTitle: eventName,
      eventTimeLocation: `${event.date || 'Upcoming'} · ${event.venue || 'Event Center'}`,
      cta: event.cta || 'Interested',
      reactions: 196,
      comments: 31,
      shares: 18,
      interestedCount: 312,
    },
    whatsapp: {
      messageBody: whatsappBody.trim(),
      cardTitle: `${eventName} Official RSVP`,
      cardDescription: `Hosted by ${event.organizer || 'Community'}. Click to view passes and agenda.`,
      ctaText: event.cta || 'Register Now',
      timestamp: '10:45 AM',
    },
  };
}

/**
 * Ensures any existing campaign has valid content structures for all 6 platforms.
 * If any platform content is missing, automatically generates it from event data.
 */
export function ensureCampaignContent(campaign: Campaign): Campaign {
  const generated = generateMockContent(campaign.event, campaign.brand);

  const existingContent = campaign.content || ({} as Partial<CampaignContent>);

  return {
    ...campaign,
    content: {
      instagram: existingContent.instagram || generated.instagram,
      instagramStory: existingContent.instagramStory || generated.instagramStory,
      linkedin: existingContent.linkedin || generated.linkedin,
      twitter: existingContent.twitter || generated.twitter,
      facebook: existingContent.facebook || generated.facebook,
      whatsapp: existingContent.whatsapp || generated.whatsapp,
    },
    design: {
      ...DEFAULT_CAMPAIGN_DESIGN,
      primaryColor: campaign.brand?.primaryColor || DEFAULT_CAMPAIGN_DESIGN.primaryColor,
      secondaryColor: campaign.brand?.secondaryColor || DEFAULT_CAMPAIGN_DESIGN.secondaryColor,
      ...(campaign.design || {}),
    },
  };
}
