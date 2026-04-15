import React from 'react';
import f1CarGifAsset from './Fuel GIFs - Find & Share on GIPHY.gif';

const TRANSITION_DURATION_MS = 2000;
const F1_CAR_GIF = f1CarGifAsset;

export default function PageTransition() {
  return (
    <div className="page-transition" aria-live="polite" aria-label="Loading next page">
      <div className="transition-loader">
          <img className="transition-car" src={F1_CAR_GIF} alt="Rotating F1 car" />
      </div>
    </div>
  );
}

export { TRANSITION_DURATION_MS };
