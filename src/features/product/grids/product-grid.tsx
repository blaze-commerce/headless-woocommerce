import { isEmpty } from 'lodash';
import React from 'react';

import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';
import { cn } from '@src/lib/helpers/helper';

type Props = {
  children: React.ReactNode;
  className?: string;
  productColumns?: string;
};

export const ProductGrid = ({ children, className, productColumns }: Props) => {
  const { settings } = useSiteContext();
  const { shop } = settings as Settings;
  const productColumnGaps = productColumns === '3' || productColumns === '4';
  const gridStyle = {
    columnGap: `${shop?.layout?.productCards?.cardPadding}`,
  };

  return (
    <div
      className={cn(
        'cinta grid grid-cols-2 lg:grid-cols-3',
        settings?.productCardGapClasses,
        {
          'md:grid-cols-2': productColumns === '2',
          'lg:grid-cols-3': productColumns === '3',
          'xl:grid-cols-4': productColumns === '4',
          'gap-y-7': productColumns === '5',
          'gap-y-8': productColumnGaps,
        },
        className,
        'gap-x-6'
      )}
      style={!isEmpty(gridStyle) ? gridStyle : {}}
    >
      {children}
    </div>
  );
};
