export type ClassMapping = {
  [key: string]: string; // Key is string, value is string
};

export const JUSTIFY: ClassMapping = {
  'flex-start': 'justify-start',
  center: 'justify-center',
  'flex-end': 'justify-end',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
};

export const FLEX_DIRECTION: ClassMapping = {
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
};

export const ALIGN_ITEMS: ClassMapping = {
  baseline: 'items-baseline',
  stretch: 'items-stretch',
  'flex-end': 'items-end',
  center: 'items-center',
  'flex-start': 'items-start',
};

export const GRID_V_ALIGNMENT: ClassMapping = {
  'flex-start': 'items-start',
  center: 'items-center',
  'flex-end': 'items-end',
};

export const GRID_H_ALIGNMENT: ClassMapping = {
  'flex-start': 'justify-start',
  center: 'justify-center',
  'flex-end': 'justify-end',
};

export const FLEX_WRAP: ClassMapping = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
};

export const TEXT_ALIGN: ClassMapping = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

export const BACKGROUND_SIZE: ClassMapping = {
  cover: 'bg-cover',
  contain: 'bg-contain',
};

export const BACKGROUND_REPEAT: ClassMapping = {
  repeat: 'bg-repeat',
  'no-repeat': 'bg-no-repeat',
  'repeat-x': 'bg-repeat-x',
  'repeat-y': 'bg-repeat-y',
};

export const BACKGROUND_POSITION: ClassMapping = {
  'top left': 'bg-left-top',
  'top center': 'bg-top',
  'top right': 'bg-right-top',
  'center left': 'bg-left',
  'center center': 'bg-center',
  'center right': 'bg-right',
  'bottom left': 'bg-left-bottom',
  'bottom center': 'bg-bottom',
  'bottom right': 'bg-right-bottom',
};
