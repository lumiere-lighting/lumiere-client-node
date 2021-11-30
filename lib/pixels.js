
// Dependencies
import Chance from 'chance';
import { clone } from 'lodash-es';
import { interpolate } from 'd3-interpolate';
import { pixelLength, dmaChannel, gpioChannel, brightness, stripType } from './config.js';
import { hexToPixel, rgbToPixel } from './utils.js';
import { animate } from './animate.js';

// Import ws281x dynamially since it doesn't seem
// to install/build on a Mac
let ws281x;

// Previous colors
let previousColors;

/**
 * Change pixels given an array of colors
 * 
 * @param {*} colors 
 */
async function transitionPixels(colors = [], id) {
  // Make sure pixels are ready
  await initializePixels();

  // Get end state
  let newColors = spreadColors(colors, id);

  // Animate
  if (previousColors) {
    await animatePixelsColorTransition(previousColors, newColors);
  }
  else {
    // Render as is
    ws281x.render(colorsToPixels(newColors));
  }

  // Keep reference to colors for next transition
  previousColors = clone(newColors);
}

// Animate
async function animatePixelsColorTransition(fromColors, toColors) {
  // Setup transition functions
  const transitions = interpolate({ colors: fromColors }, { colors: toColors });

  await animate(3000, (t) => {
    let colors = transitions(t);
    ws281x.render(colorsToPixels(colors.colors, rgbToPixel));
  });
}

// Spread pixels
function spreadColors(colors = [], id) {
  // Amount of spread
  let chance = new Chance(`${id}-spread`);
  let spread = colors.length > 1 ?
    chance.integer({ min: 1, max: 5 }) : 1;

  // Keep track of colors
  let fullColors = [];

  // Fill in colors.  Probably a more efficient way to do this.
  let spreadPlace = 1;
  let colorPlace = 0;
  for (var i = 0; i < pixelLength; i++) {
    fullColors[i] = colors[colorPlace];

    spreadPlace = spreadPlace === spread ? 1 : spreadPlace + 1;
    colorPlace = spreadPlace === 1 ? colorPlace + 1 : colorPlace;
    colorPlace = colorPlace >= colors.length - 1 ? 0 : colorPlace;
  }

  return fullColors;
}

// Colors to pixels
function colorsToPixels(colors = [], transform = hexToPixel) {
  return new Uint32Array(colors.map(transform));
}

// Initialize pixels
async function initializePixels() {
  // Get light manager
  if (!ws281x) {
    const { default: ws281xModule } = await import('rpi-ws281x');
    ws281x = ws281xModule;

    // Configure
    ws281x.configure({
      leds: pixelLength,
      dma: dmaChannel,
      brightness: brightness,
      gpio: gpioChannel,
      stripType: stripType
    });
  }
}

// Export
export { transitionPixels };