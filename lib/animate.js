
// Dependencies
import { frameRate } from './config.js';


// Basic animate function
async function animate(timeLength, callback, easing, animationframeRate) {
  animationframeRate = animationframeRate || frameRate
  let timeBetweenFrames = 1000 / animationframeRate;
  let start = +(new Date());
  let end = start + timeLength;

  return new Promise((resolve, reject) => {
    let timeout = setInterval(() => {
      try {
        let now = +(new Date());
        let normalized = (now - start) / (end - start);
        let easedNormalized = easing ? easing(normalized) : normalized;

        callback(easedNormalized, { now, rawT: normalized });

        if (now + timeBetweenFrames > end) {
          clearTimeout(timeout);

          // Last time to call the 100%/1
          setTimeout(() => {
            let n = 1;
            let e = easing ? easing(n) : n;
            callback(e, { now: +(new Date()), rawT: n });
            resolve();
          }, Math.min(timeBetweenFrames, end - now));
        }
      }
      catch (e) {
        reject(e);
      }
    }, timeBetweenFrames);
  });
}

export { animate };