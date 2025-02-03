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
        'product-grid',
        {
          'column-2': productColumns === '2',
          'column-3': productColumns === '3',
          'column-4': productColumns === '4',
          'column-5': productColumns === '5',
        },
        className
      )}
      style={!isEmpty(gridStyle) ? gridStyle : {}}
    >
      {children}
    </div>
  );
};
