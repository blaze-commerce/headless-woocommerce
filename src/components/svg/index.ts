export type Icon = {
  color: 'default' | 'success' | 'none';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'none';
  className?: string;
  fillColor?: string;
  strokeColor?: string;
};

export const COLOR_CLASSES = {
  none: '',
  default: 'fill-brand-primary',
  success: 'fill-green-500',
};

export const STROKE_COLOR_CLASSES = {
  none: '',
  default: 'stroke-brand-primary',
  success: 'stroke-green-500',
};

export const SIZE_CLASSES = {
  none: { height: 100, width: 100 },
  xs: { height: 7, width: 11 },
  sm: { height: 7, width: 11 },
  md: { height: 7, width: 11 },
  lg: { height: 7, width: 11 },
};
