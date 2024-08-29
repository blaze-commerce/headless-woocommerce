import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { find, isEmpty, reduce } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 } from 'uuid';

import { CategoryFilterOptions } from '@src/components/category/filter/category-filter-options';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { CategoryFilterItems } from '@src/lib/types/filters';
import { IFilterOptionData } from '@src/lib/types/taxonomy';

export const BrandsFilter = ({ classes, title, filterSlug }: CategoryFilterItems) => {
  const taxonomyCtx = useTaxonomyContext();
  const { asPath } = useRouter();
  const [disclosureOpen, setDisclosureOpen] = taxonomyCtx.brandsFilter;
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const slugData = filterSlug?.split(',');
  const [brandsQueryState] = taxonomyCtx.queryVarsBrandsData;
  const [previousSelectedFilterState] = taxonomyCtx.previouslySelectedFilter;
  const [, , categoryFilterState] = taxonomyCtx.categoryFilter;
  const [, , saleFilterState] = taxonomyCtx.saleFilter;
  const [, , newFilterState] = taxonomyCtx.newFilter;
  const [, , refinedSelectionFilterState] = taxonomyCtx.refinedSelection;
  const [, , availabilityFilterState] = taxonomyCtx.availabilityFilter;

  const isOtherFilterStateEmpty =
    isEmpty(categoryFilterState) &&
    isEmpty(saleFilterState) &&
    isEmpty(newFilterState) &&
    isEmpty(refinedSelectionFilterState) &&
    isEmpty(availabilityFilterState);

  const pathIndex = asPath.split('/');

  if (pathIndex[1] === 'brand') {
    return null;
  }

  if (isEmpty(slugData)) return null;

  const restructureFilterOptions = reduce(
    slugData,
    (result: IFilterOptionData[], slug) => {
      taxonomyCtx?.tsFetchedData?.brandsFilter?.map((option) => {
        const currentQuery: IFilterOptionData | undefined = find(brandsQueryState, [
          'label',
          option.label,
        ]);
        const hasSameSlug = slug === option.slug;
        const hasSameTitle = title === previousSelectedFilterState;

        if (hasSameSlug && hasSameTitle && isOtherFilterStateEmpty) {
          result.push(option);
        } else if (hasSameSlug && typeof currentQuery !== 'undefined') {
          result.push(currentQuery as IFilterOptionData);
        }
      });

      return result;
    },
    []
  );

  if (isEmpty(restructureFilterOptions)) return null;

  const renderFilterOptions = (option: IFilterOptionData) => {
    return (
      <CategoryFilterOptions
        key={v4()}
        name={option?.label}
        option={option}
        disclosureProp={taxonomyCtx?.brandsFilter}
        title={title}
      />
    );
  };

  const name = title ?? 'Brands';

  return (
    <Disclosure defaultOpen={disclosureOpen}>
      {({ open }) => (
        <div className="border-t border-brand-second-gray">
          <Disclosure.Button
            onClick={() => setDisclosureOpen((prev) => !prev)}
            className="flex items-center w-full justify-between text-left focus:outline-none focus-visible:ring focus-visible:ring-brand-primary-light focus-visible:ring-opacity-75 py-5"
          >
            <span
              className={classNames('uppercase text-base font-bold text-brand-primary', classes)}
            >
              {name}
            </span>
            <ChevronUpIcon
              className={classNames('h-5 w-5 text-[#3F3F46]', {
                'rotate-180 transform': !open,
              })}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="text-sm text-gray-500 pb-5">
            <fieldset className="">
              {restructureFilterOptions?.slice(0, 5).map((option) => renderFilterOptions(option))}
              {isMoreOptionsOpen &&
                restructureFilterOptions?.slice(5).map((option) => renderFilterOptions(option))}
              {restructureFilterOptions.length > 5 && !isMoreOptionsOpen && (
                <button
                  type="button"
                  className="ml-2.5 mt-2.5 text-xs font-normal text-[#0A0A0A]"
                  onClick={() => setIsMoreOptionsOpen(true)}
                >
                  + {restructureFilterOptions.length - 5} more
                </button>
              )}
            </fieldset>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
