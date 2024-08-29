import { CSSProperties, ReactNode } from 'react';

import { cn } from '@src/lib/helpers/helper';

type Props = {
  children: ReactNode;
  classNames?: string;
  style?: CSSProperties;
};

export const CategoryGrid = ({ classNames, children, style }: Props) => {
  return (
    <div
      className={cn('w-full h-full bg-white px-0 grid grid-cols-3 lg:grid-cols-6 mb-6', classNames)}
      style={style}
    >
      {children}
    </div>
  );
};
