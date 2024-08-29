import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { find, includes, isEmpty, reduce } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 } from 'uuid';

import { CategoryFilterOptions } from '@src/components/category/filter/category-filter-options';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { CategoryFilterProps } from '@src/lib/types/filters';
import { IFilterOptionData } from '@src/lib/types/taxonomy';

export const RefinedSelection = ({ filters }: CategoryFilterProps) => {
  const taxonomyCtx = useTaxonomyContext();
  const { query } = useRouter();
  const [disclosureOpen, setDisclosureOpen] = taxonomyCtx.refinedSelection;
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [refinedSelectionQueryState] = taxonomyCtx.queryVarsRefinedSelectionData;
  const [previousSelectedFilterState] = taxonomyCtx.previouslySelectedFilter;
  const [, , categoryFilterState] = taxonomyCtx.categoryFilter;
  const [, , saleFilterState] = taxonomyCtx.saleFilter;
  const [, , newFilterState] = taxonomyCtx.newFilter;
  const [, , brandsFilterState] = taxonomyCtx.brandsFilter;
  const [, , availabilityFilterState] = taxonomyCtx.availabilityFilter;

  const isOtherFilterStateEmpty =
    isEmpty(categoryFilterState) &&
    isEmpty(saleFilterState) &&
    isEmpty(newFilterState) &&
    isEmpty(brandsFilterState) &&
    isEmpty(availabilityFilterState);

  return (
    <div className="flex flex-col">
      {filters?.map((filterItem) => {
        const { classes, title, filterSlug } = filterItem;
        const slugData = filterSlug?.split(',');

        if (isEmpty(slugData)) return null;

        const restructureFilterOptions = reduce(
          slugData,
          (result: IFilterOptionData[], slug) => {
            taxonomyCtx?.tsFetchedData?.refinedSelectionOptions?.map((option) => {
              const isSlugValid =
                !includes(query?.taxonomyItemSlug, option.slug) && slug === option.slug;
              const currentQuery = find(refinedSelectionQueryState, ['label', option.label]);
              const hasSameTitle = title === previousSelectedFilterState;

              if (isSlugValid && hasSameTitle && isOtherFilterStateEmpty) {
                result.push(option);
              } else if (isSlugValid && typeof currentQuery !== 'undefined') {
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
              disclosureProp={taxonomyCtx.refinedSelection}
              title={title}
            />
          );
        };

        return (
          <>
            <Disclosure defaultOpen={disclosureOpen}>
              {({ open }) => (
                <div className="border-t border-brand-second-gray  mx-2.5">
                  <Disclosure.Button
                    onClick={() => setDisclosureOpen((prev) => !prev)}
                    className="flex items-center w-full justify-between text-left focus:outline-none focus-visible:ring focus-visible:ring-brand-primary-light focus-visible:ring-opacity-75 py-3"
                  >
                    <span
                      className={classNames(
                        'uppercase text-base font-bold text-brand-primary',
                        classes
                      )}
                    >
                      {title}
                    </span>
                    <ChevronUpIcon
                      className={classNames('h-5 w-5 text-[#3F3F46]', {
                        'rotate-180 transform': !open,
                      })}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-sm text-gray-500 pb-5">
                    <fieldset className="border-t border-brand-second-gray py-5">
                      {restructureFilterOptions
                        ?.slice(0, 5)
                        .map((option) => renderFilterOptions(option))}
                      {isMoreOptionsOpen &&
                        restructureFilterOptions
                          ?.slice(5)
                          .map((option) => renderFilterOptions(option))}
                      {restructureFilterOptions.length > 5 && !isMoreOptionsOpen && (
                        <button
                          type="button"
                          className="mt-2.5 text-xs font-normal text-[#0A0A0A]"
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
          </>
        );
      })}
    </div>
  );
};
