import { useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { find, isEmpty, reduce } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 } from 'uuid';
import { cn } from '@src/lib/helpers/helper';

import { CategoryFilterOptions } from '@src/components/category/filter/category-filter-options';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { CategoryFilterItems } from '@src/lib/types/filters';
import { IFilterOptionData } from '@src/lib/types/taxonomy';

export const BrandsFilter = (props: CategoryFilterItems) => {
  const { classes, filterSlug, title, enableDisclosure = true, defaultShow = true } = props;
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

  useEffect(() => {
    if (!enableDisclosure) setDisclosureOpen(true);
    if (enableDisclosure) setDisclosureOpen(defaultShow);
  }, [enableDisclosure, setDisclosureOpen, defaultShow]);

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

  return (
    <Disclosure
      defaultOpen={disclosureOpen}
      as="div"
      className={'filter-widget'}
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            onClick={() => setDisclosureOpen((prev) => !prev)}
            className={cn('filter-widget-header', {
              'cursor-pointer': enableDisclosure,
            })}
            disabled={!enableDisclosure}
            as="h3"
          >
            <span className={cn('filter-widget-title', classes)}>{title ?? 'Brand'}</span>

            <ChevronUpIcon
              className={cn('open-filter', {
                open: !open,
                hidden: !enableDisclosure,
              })}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="filter-widget-content">
            <fieldset className="fieldset">
              {restructureFilterOptions?.slice(0, 5).map((option) => renderFilterOptions(option))}
              {isMoreOptionsOpen &&
                restructureFilterOptions?.slice(5).map((option) => renderFilterOptions(option))}
            </fieldset>
            {restructureFilterOptions.length > 5 && !isMoreOptionsOpen && (
              <button
                type="button"
                className="more-options"
                onClick={() => setIsMoreOptionsOpen(true)}
              >
                show more + {restructureFilterOptions.length - 5}
              </button>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
