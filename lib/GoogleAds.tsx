'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    googletag: any;
  }
}

const GoogleAds = () => {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    (window as any).googletag = (window as any).googletag || { cmd: [] };
    const googletag = (window as any).googletag;

    try {
      googletag.cmd.push(() => {
        const pubads = googletag.pubads();
        const anchorSlot = googletag.defineOutOfPageSlot('/23334516659/h5_4', googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR).addService(pubads);
        googletag.enableServices();
        if (anchorSlot) {
          googletag.display(anchorSlot);
        } else {
          console.warn("Anchor ad slot could not be created.");
        }
      });
    } catch (error) {
      console.warn("Anchor ad slot could not be created: "+ error);
    }
    
  }, []);

  return null; // No visual DOM element needed
};

export default GoogleAds;
