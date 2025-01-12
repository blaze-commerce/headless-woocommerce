import Color from 'color';

export const hexToHslValue = (hexColor: string, separator = ' '): string => {
  const [h, s, l] = hexToHslArray(hexColor);

  return `${h}${separator}${s}%${separator}${l}%`;
};

export const hexToHslArray = (hexColor: string): number[] => {
  const color = Color(hexColor).hsl(); // Get the HSL object

  const h = Math.round(color.hue()); // Hue
  const s = Math.round(color.saturationl()); // Saturation
  const l = Math.round(color.lightness()); // Lightness

  return [h, s, l];
};

export const percentageToDecimal = (percentage: number): number => {
  if (percentage < 0 || percentage > 100) {
    // eslint-disable-next-line no-console
    console.error('Percentage must be between 0 and 100.');
    return 0;
  }
  return percentage / 100;
};
