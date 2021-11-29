
// Dependencies
import { pixelLength, dmaChannel, gpioChannel, brightness, stripType } from './config.js';
import { hexToPixel } from './utils.js';

// Import ws281x dynamially since it doesn't seem
// to install/build on a Mac
let ws281x;

// Light container
let pixels;

/**
 * Change pixels given an array of colors
 * 
 * @param {*} colors 
 */
async function transitionPixels(colors = []) {
  await initializePixels();

  for (var i = 0; i < pixelLength; i++) {
    pixels[i] = hexToPixel(colors[i % colors.length]);
  }

  ws281x.render(pixels);
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

    // Make pixel array
    pixels = new Uint32Array(pixelLength);
  }

  return pixels;
}

// Export
export { transitionPixels };