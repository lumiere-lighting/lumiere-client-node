
// Dependencies
import Color from 'color';


function hexToPixel(hex = '') {
  const color = Color(hex);
  return rgbToPixel(color.rgb().array());
}

function rgbToPixel(rgb = []) {
  return (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
}

// Export
export { hexToPixel, rgbToPixel };