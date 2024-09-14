export function setLightness(hex: string, targetLightness: number): string {
  // Ensure the target lightness is between 0 and 100
  targetLightness = Math.max(0, Math.min(100, targetLightness));

  // Remove the leading '#' if present
  hex = hex.replace(/^#/, "");

  // Convert hex to RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Calculate the current lightness
  const currentLightness =
    ((Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255) * 100;

  console.log(currentLightness);

  // Calculate blend amount based on the target lightness
  const blendAmount = (targetLightness - currentLightness) / 100;

  // Blend color with white to achieve the target lightness
  const blendColor = (amount: number, baseColor: number) =>
    Math.round(baseColor + amount * (255 - baseColor));

  const newR = blendColor(blendAmount, r);
  const newG = blendColor(blendAmount, g);
  const newB = blendColor(blendAmount, b);

  // Convert adjusted RGB back to hex
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  const newHex = `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;

  console.log({ hex, newHex });

  return newHex;
}

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
