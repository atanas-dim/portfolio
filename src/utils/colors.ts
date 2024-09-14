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

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string => {
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

  // Get the two colors we are interpolating between
  const [r1, g1, b1] = hexToRgb(colors[lowerIndex]);
  const [r2, g2, b2] = hexToRgb(colors[upperIndex]);

  // Interpolate each channel
  const r = Math.round(r1 + (r2 - r1) * localFactor);
  const g = Math.round(g1 + (g2 - g1) * localFactor);
  const b = Math.round(b1 + (b2 - b1) * localFactor);

  return rgbToHex(r, g, b);
}
