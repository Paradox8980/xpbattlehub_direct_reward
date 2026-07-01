'use client';

import { useEffect } from 'react';

const RewadPopup = ({showRewardAd}: {showRewardAd: any}) => {

  useEffect(() => {
    (window as any).googletag = (window as any).googletag || { cmd: [] };
    const googletag = (window as any).googletag;

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
  }, []);

  return (
    <>  
    <div className="fc-message-root">
      <div id="fc-focus-trap-pre-div"></div>
      <div className="fc-monetization-dialog-container">
        <div className="fc-dialog-overlay"></div>
        <div className="fc-monetization-dialog fc-dialog" id="fc-monetization-dialog" role="dialog" aria-label="Unlock Premium Library FREE">
          <div className="fc-dialog-content">
            <div className="fc-header">
              <div className="fc-header-image-container fc-header">
                {/* <img className="fc-header-image" id="fc-header-image" alt="Welcome" src="/ad-logo.png" /> */}
                <h1 className="logo-header">H5 Strikers</h1>
              </div>
            </div>
            <div className="fc-dialog-headline">
              <h1 className="fc-dialog-headline-text">Unlock more content</h1>
              <div className="fc-dialog-body">
                <p className="fc-dialog-body-text">Take action to continue accessing the content on this site</p>
              </div>
            </div>
            <div className="fc-list-container">
              <button role="button" className="fc-list-item-button fc-rewarded-ad-button" onClick={() => showRewardAd()}>
                <div className="fc-list-item-text-container">
                  <span className="fc-list-item-text fc-rewarded-ad-option-text" id="fc-list-item-text">View a short ad</span>
                  <div className="fc-list-item-subtext-container">
                    <div className="fc-list-item-subtext fc-rewarded-ad-option-subtext" id="fc-list-item-subtext">Site-wide access for 1 hours</div>
                  </div>
                </div>
                <div className="fc-list-item-image-container">
                  <span className="notranslate fc-choice-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" className=" NMm5M">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path>
                    </svg>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="fc-focus-trap-post-div"></div>
    </div>
    </>
  ); // No visual DOM element needed
};

export default RewadPopup;
