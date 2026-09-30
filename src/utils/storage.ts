import { Campaign } from '../types/campaign';
import { ensureCampaignContent } from './contentGenerator';

export const CAMPAIGNS_STORAGE_KEY = 'socialmock_campaigns';

/**
 * Retrieves all stored campaigns from localStorage.
 */
export function getCampaigns(): Campaign[] {
  try {
    const raw = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((c) => ensureCampaignContent(c));
  } catch (error) {
    console.error('Failed to load campaigns from localStorage:', error);
    return [];
  }
}

/**
 * Saves a new campaign to localStorage, prepending to existing campaigns.
 */
export function saveCampaign(newCampaign: Campaign): { success: boolean; error?: string } {
  try {
    const prepared = ensureCampaignContent(newCampaign);
    const existing = getCampaigns();
    const updated = [prepared, ...existing.filter((c) => c.id !== prepared.id)];
    localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(updated));
    return { success: true };
  } catch (error) {
    console.error('Failed to save campaign to localStorage:', error);
    return {
      success: false,
      error:
        error instanceof DOMException && error.name === 'QuotaExceededError'
          ? 'Browser storage is full. Please remove larger images or older campaigns.'
          : 'Unable to save campaign to browser storage.',
    };
  }
}

/**
 * Updates an existing campaign in localStorage.
 */
export function updateCampaign(updatedCampaign: Campaign): { success: boolean; error?: string } {
  try {
    const existing = getCampaigns();
    const index = existing.findIndex((c) => c.id === updatedCampaign.id);
    let updatedList: Campaign[];

    if (index >= 0) {
      updatedList = [...existing];
      updatedList[index] = updatedCampaign;
    } else {
      updatedList = [updatedCampaign, ...existing];
    }

    localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(updatedList));
    return { success: true };
  } catch (error) {
    console.error('Failed to update campaign in localStorage:', error);
    return {
      success: false,
      error: 'Unable to update campaign in browser storage.',
    };
  }
}

/**
 * Finds a specific campaign by ID.
 */
export function getCampaignById(id: string): Campaign | null {
  const campaigns = getCampaigns();
  const found = campaigns.find((c) => c.id === id);
  return found ? ensureCampaignContent(found) : null;
}
