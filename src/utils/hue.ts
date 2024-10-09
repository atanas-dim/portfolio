/**
 * Converts a hex color to an HSL color
 * @param hex - The hex color value (e.g., "#ff5733")
 * @returns HSL representation of the color
 */
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove the hash if present
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find the maximum and minimum values to get lightness
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    let delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }

    h = Math.round(h * 60);
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Converts an HSL color to a hex color
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns Hexadecimal color value
 */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  let hex =
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0");

  return hex;
}

/**
 * Shifts the hue of a hex color by a certain degree
 * @param hex - The hex color value (e.g., "#ff5733")
 * @param degree - The amount to shift the hue (e.g., 30)
 * @returns The new hex color with the hue shifted
 */
export function shiftHue(hex: string, degree: number): string {
  // Convert hex to HSL
  let hsl = hexToHSL(hex);

  // Shift the hue, ensuring it stays within 0-360
  let newHue = (hsl.h + degree) % 360;
  if (newHue < 0) newHue += 360;

  // Convert back to hex
  return hslToHex(newHue, hsl.s, hsl.l);
}
