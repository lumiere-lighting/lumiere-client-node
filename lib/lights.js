/**
 * Manage lights
 */

// Dependencies
import { transitionPixels } from './pixels.js';

// Keep track of lights
let currentLights;

// Change lights
async function updateLights(lights) {

  // Make sure we got some lights
  if (!lights || !lights.id || !lights.colors || !lights.colors.length) {
    return;
  }

  // Don't update if the same lights
  if (currentLights && currentLights.id === lights.id) {
    return;
  }

  // Transition lights
  await transitionPixels(lights.colors, lights.id);

  // Update current lights
  currentLights = lights;
}

// Export
export { updateLights };