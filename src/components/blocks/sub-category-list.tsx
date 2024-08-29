import { find, isEmpty, reduce } from 'lodash';

import { CategoryGrid } from '@src/components/category/category-grid';
import { CategoryGridItem } from '@src/components/category/category-grid-item';
import { PrefetchLink } from '@src/components/common/prefetch-link';
import { useSiteContext } from '@src/context/site-context';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { Homepage } from '@src/models/settings/homepage';
import { CategoryFilterItems } from '@src/lib/types/filters';
import { IFilterOptionData } from '@src/lib/types/taxonomy';

export const SubCategoryList = ({ title, filterSlug }: CategoryFilterItems) => {
  const { settings } = useSiteContext();
  const { font } = settings?.homepage as Homepage;
  const taxonomyCtx = useTaxonomyContext();
  const slugData = filterSlug?.split(',');
  const taxonomyOption = find(taxonomyCtx?.tsFetchedData?.taxonomyFilterOptions, ['parent', title]);

  if (isEmpty(slugData)) return null;
  if (isEmpty(taxonomyOption)) return null;

  const renderTitle = () => {
    if (!taxonomyOption?.permalink)
      return (
        <>
          {title} {taxonomyCtx.hero?.name}
        </>
      );
    return (
      <PrefetchLink
        unstyled
        href={(taxonomyOption?.permalink as string) ?? '#'}
      >
        <h2 className="font-bold text-lg text-black">
          {title} {taxonomyCtx.hero?.name}
        </h2>
      </PrefetchLink>
    );
  };

  if (isEmpty(slugData)) return null;
  const restructureData = reduce(
    slugData,
    (result: IFilterOptionData[], slug) => {
      const taxonomyOption = find(taxonomyCtx?.tsFetchedData?.taxonomyFilterOptions, [
        'slug',
        slug,
      ]);

      if (!isEmpty(taxonomyOption)) {
        result.push(taxonomyOption);
      }

      return result;
    },
    []
  );

  const hasSameTaxonomy = find(restructureData, ['parent', title]);

  const cardGroupStyle = {
    color: font?.featuredCategories?.color,
  };

  return (
    <>
      {typeof hasSameTaxonomy !== 'undefined' && <div className="mb-6">{renderTitle()}</div>}
      <CategoryGrid classNames={settings?.productCardGapClasses}>
        {restructureData.map((content, index) => {
          return (
            <CategoryGridItem
              key={index}
              content={content}
              cardGroupStyle={cardGroupStyle}
            />
          );
        })}
      </CategoryGrid>
    </>
  );
};
