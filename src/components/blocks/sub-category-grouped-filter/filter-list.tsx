import { CategoryFilterOptions } from '@src/components/category/filter/category-filter-options';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { CategoryFilterItems } from '@src/lib/types/filters';
import { IFilterOptionData } from '@src/lib/types/taxonomy';
import { find, includes, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 } from 'uuid';

export const FilterList = ({ title, filterSlug }: CategoryFilterItems) => {
  const slugData = filterSlug?.split(',');
  const { query } = useRouter();
  const taxonomyCtx = useTaxonomyContext();
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [categoryQueryState] = taxonomyCtx.queryVarsCategoryData;

  if (isEmpty(slugData)) return null;

  const groupedCategories: { [key: string]: IFilterOptionData[] } = {};

  taxonomyCtx?.tsFetchedData?.taxonomyFilterOptions.forEach((option) => {
    const isSlugValid = !includes(query?.taxonomyItemSlug, option.slug);
    const currentQuery = find(categoryQueryState, ['label', option.label]);
    const hasParentSlug = !isEmpty(option.parentSlug) && typeof option.parentSlug !== 'undefined';
    if (isSlugValid && hasParentSlug && typeof currentQuery !== 'undefined') {
      const parentSlug = option.parentSlug as string;
      if (option.parentSlug && !groupedCategories[parentSlug]) {
        groupedCategories[parentSlug] = [];
      }

      groupedCategories[parentSlug].push(option);
    }
  });

  const renderFilterOptions = (option: IFilterOptionData) => {
    return (
      <CategoryFilterOptions
        key={v4()}
        name={option?.label}
        option={option}
        disclosureProp={taxonomyCtx.categoryFilter}
        title={title}
      />
    );
  };

  return (
    <div>
      {Object.keys(groupedCategories).map((key) => {
        const category = find(taxonomyCtx?.tsFetchedData?.taxonomyFilterOptions, ['slug', key]);
        return (
          <div key={v4()}>
            <div className="text-[#393939] font-bold">{category?.label}</div>
            <fieldset className="mb-4">
              {groupedCategories[key]?.slice(0, 5)?.map((option) => renderFilterOptions(option))}
              {isMoreOptionsOpen &&
                groupedCategories[key]?.slice(5).map((option) => renderFilterOptions(option))}
              {groupedCategories[key].length > 5 && !isMoreOptionsOpen && (
                <button
                  type="button"
                  className="ml-2.5 mt-2.5 text-xs font-normal text-[#0A0A0A]"
                  onClick={() => setIsMoreOptionsOpen(true)}
                >
                  + {groupedCategories[key].length - 5} more
                </button>
              )}
            </fieldset>
          </div>
        );
      })}
    </div>
  );
};
