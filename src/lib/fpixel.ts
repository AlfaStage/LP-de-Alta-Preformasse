
const PLACEHOLDER_FB_PIXEL_ID = "YOUR_PRIMARY_FACEBOOK_PIXEL_ID";
const PLACEHOLDER_SECONDARY_FB_PIXEL_ID = "YOUR_SECONDARY_FACEBOOK_PIXEL_ID";

export function getActivePixelIds(primaryId?: string, secondaryId?: string): string[] {
  const ids: string[] = [];
  if (primaryId && primaryId.trim() !== "" && primaryId !== PLACEHOLDER_FB_PIXEL_ID) {
    ids.push(primaryId.trim());
  }
  if (secondaryId && secondaryId.trim() !== "" && secondaryId !== PLACEHOLDER_SECONDARY_FB_PIXEL_ID) {
    ids.push(secondaryId.trim());
  }
  return ids;
}

// For SPA navigations after initial load. The initial PageView is handled by the script in TrackingScriptsWrapper.
export const trackFbPageView = () => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'PageView'); // Global PageView for all initialized pixels
  } else {
    // console.warn('FB Pixel: fbq not found for PageView tracking.');
  }
};

// Track standard FB events to specific (or all active) pixel IDs
export const trackFbEvent = (eventName: string, eventData: Record<string, any> = {}, pixelIdsToTrack: string[]) => {
  if (typeof window !== 'undefined' && (window as any).fbq && pixelIdsToTrack.length > 0) {
    pixelIdsToTrack.forEach(id => {
      (window as any).fbq('trackSingle', id, eventName, eventData);
    });
  } else {
    // console.warn(`FB Pixel: fbq not found or no pixel IDs to track standard event: ${eventName}`);
  }
};

// Track custom FB events to specific (or all active) pixel IDs
export const trackFbCustomEvent = (eventName: string, eventData: Record<string, any> = {}, pixelIdsToTrack: string[]) => {
  if (typeof window !== 'undefined' && (window as any).fbq && pixelIdsToTrack.length > 0) {
    pixelIdsToTrack.forEach(id => {
      (window as any).fbq('trackSingleCustom', id, eventName, eventData);
    });
  } else {
    // console.warn(`FB Pixel: fbq not found or no pixel IDs to track custom event: ${eventName}`);
  }
};
    