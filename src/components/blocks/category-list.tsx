import { PlusIcon } from '@heroicons/react/20/solid';
import { isEmpty } from 'lodash';
import { Fragment, useState } from 'react';

import { CategoryGrid } from '@src/components/category/category-grid';
import { CategoryGridItem } from '@src/components/category/category-grid-item';
import { useSiteContext } from '@src/context/site-context';
import { SubCategory } from '@src/schemas/taxonomy-schema';
import { cn } from '@src/lib/helpers/helper';
import { useIsMobile } from '@src/lib/hooks';

export const CategoryList = ({ subCategories }: { subCategories: SubCategory[] }) => {
  const { settings } = useSiteContext();
  const [showAll, setShowAll] = useState(false);

  const isMobile = useIsMobile();

  const restructureCategories = () => {
    return subCategories ?? [];
  };
  const categories = restructureCategories();

  const visibleCategories = isMobile && !showAll ? categories.slice(0, 3) : categories;
  if (isEmpty(visibleCategories)) return null;

  return (
    <Fragment>
      <div className="mb-6 text-zinc-900 text-base font-semibold leading-normal">OUR RANGE</div>
      <CategoryGrid classNames={settings?.productCardGapClasses}>
        {visibleCategories?.map((category, index) => {
          return (
            <CategoryGridItem
              key={index}
              content={category}
            />
          );
        })}
      </CategoryGrid>

      <div
        className={cn('flex justify-center lg:hidden', {
          hidden: categories.length <= 3 || (categories.length > 3 && showAll),
        })}
      >
        <button
          className="items-center py-2.5 px-10 font-semibold text-sm flex gap-x-1 uppercase text-[#8D8D8D]"
          onClick={() => setShowAll(true)}
        >
          <span>Show more</span>
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
    </Fragment>
  );
};
