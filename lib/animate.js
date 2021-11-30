

// Basic animate function
function animate(timeLength, callback, easing, frameRate = 60) {
  let timeBetweenFrames = 1000 / 60;
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
          resolve();
        }
      }
      catch (e) {
        reject(e);
      }
    }, timeBetweenFrames);
  });
}

export { animate };