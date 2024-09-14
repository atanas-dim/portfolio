// Function to convert Hex to RGB
export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  hex = hex.replace(/^#/, "");

  // Handle 3-digit hex code (#RGB)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (hex.length !== 6) {
    return null; // Invalid hex code
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}

// Function to convert RGB to HSL
export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { hue: number; saturation: number; lightness: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;
  let saturation = 0;
  const lightness = (max + min) / 2;

  if (delta !== 0) {
    if (max === r) {
      hue = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
    } else if (max === g) {
      hue = ((b - r) / delta + 2) * 60;
    } else {
      hue = ((r - g) / delta + 4) * 60;
    }

    saturation = delta / (1 - Math.abs(2 * lightness - 1));
  }

  return {
    hue: Math.round(hue),
    saturation: Math.round(saturation * 100),
    lightness: Math.round(lightness * 100),
  };
}

// Function to convert Hex directly to HSL
export function hexToHsl(
  hex: string
): { hue: number; saturation: number; lightness: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null; // Invalid hex code

  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

// Helper function to convert a number to a 2-digit hex string
function toHex(value: number): string {
  const hex = Math.round(value).toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

// Function to convert HSL to RGB
function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // Adjust RGB values to 0-255 range
  r = (r + m) * 255;
  g = (g + m) * 255;
  b = (b + m) * 255;

  return { r, g, b };
}

// Function to convert HSL to Hex
export function hslToHex(h: number, s: number, l: number): string {
  const { r, g, b } = hslToRgb(h, s, l);

  // Convert RGB to hex
  const hexR = toHex(r);
  const hexG = toHex(g);
  const hexB = toHex(b);

  return `#${hexR}${hexG}${hexB}`;
}

export const adjustColorLightness = (color: string, lightness: number) => {
  const hsl = hexToHsl(color);
  if (!hsl) return color;

  return hslToHex(hsl.hue, hsl.saturation, lightness);
};

// Convert RGB to hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

export function interpolateColor(
  colors: string[], // Array of colors
  factor: number // Factor between 0 and 1
): string {
  // Ensure the factor is within the 0 to 1 range
  factor = Math.max(0, Math.min(1, factor));

  // Calculate the segment in the color array we are interpolating between
  const numColors = colors.length;
  const scaledFactor = factor * (numColors - 1);
  const lowerIndex = Math.floor(scaledFactor); // Get the lower index of the color to interpolate
  const upperIndex = Math.min(lowerIndex + 1, numColors - 1); // Ensure the upper index doesn't exceed array length
  const localFactor = scaledFactor - lowerIndex; // Factor between the two selected colors

  // Convert hex to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  // Get the two colors we are interpolating between
  const [r1, g1, b1] = hexToRgb(colors[lowerIndex]);
  const [r2, g2, b2] = hexToRgb(colors[upperIndex]);

  // Interpolate each channel
  const r = Math.round(r1 + (r2 - r1) * localFactor);
  const g = Math.round(g1 + (g2 - g1) * localFactor);
  const b = Math.round(b1 + (b2 - b1) * localFactor);

  return rgbToHex(r, g, b);
}

export const MAX_LIGHTNESS = 80;
