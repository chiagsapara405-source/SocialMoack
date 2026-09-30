/**
 * Utility to calculate color luminance and ensure readable contrast
 */

export function getLuminance(hexColor: string): number {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16) || 0;

  // Relative luminance formula (sRGB)
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function isLightColor(hexColor: string): boolean {
  return getLuminance(hexColor) > 0.55;
}

export function getContrastTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#0A0A0A' : '#FFFFFF';
}

export function getContrastMutedColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#6B6B67' : 'rgba(255, 255, 255, 0.7)';
}
