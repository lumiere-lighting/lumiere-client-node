
// Dependencies
import Color from 'color';
import { isArray } from 'lodash-es';


function rgbToHex(rgb = '') {
  const color = isArray(rgb) ? Color.rgb(rgb) : Color(rgb);
  return color.hex();
}

function hexToPixel(hex = '') {
  const color = Color(hex);
  return rgbToPixel(color.rgb().array());
}

function rgbToPixel(rgb = []) {
  const color = isArray(rgb) ? Color.rgb(rgb) : Color(rgb);
  const rgbArray = color.rgb().array();
  return (rgbArray[0] << 16) | (rgbArray[1] << 8) | rgbArray[2];
}

// Export
export { hexToPixel, rgbToPixel, rgbToHex };