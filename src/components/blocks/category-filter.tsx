import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { cn } from '@src/lib/helpers/helper';
import { find, includes, isEmpty, reduce, uniq } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { CategoryFilterOptions } from '@src/components/category/filter/category-filter-options';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { CategoryFilterProps } from '@src/lib/types/filters';
import { IFilterOptionData } from '@src/lib/types/taxonomy';

export const CategoryFilter = (props: CategoryFilterProps) => {
  const { filters, enableDisclosure = true, defaultShow = true } = props;
  const taxonomyCtx = useTaxonomyContext();
  const { query } = useRouter();
  const [disclosureOpen, setDisclosureOpen] = taxonomyCtx.categoryFilter;
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [categoryQueryState] = taxonomyCtx.queryVarsCategoryData;

  useEffect(() => {
    if (!enableDisclosure) setDisclosureOpen(true);
    if (enableDisclosure) setDisclosureOpen(defaultShow);
  }, [enableDisclosure, setDisclosureOpen, defaultShow]);

  if (!taxonomyCtx?.tsFetchedData?.taxonomyFilterOptions) return null;

  return (
    <>
      {filters?.map((filterItem) => {
        const { classes, title, filterSlug } = filterItem;

        const slugData = filterSlug?.split(',');

        if (isEmpty(slugData)) return null;

        const restructureFilterOptions = reduce(
          slugData,
          (result: IFilterOptionData[], slug) => {
            taxonomyCtx?.tsFetchedData?.taxonomyFilterOptions?.map((option) => {
              const isSlugValid =
                !includes(query?.taxonomyItemSlug, option.slug) && slug === option.slug;
              const currentQuery = find(categoryQueryState, ['label', option.label]);
              const hasParentSlug = includes(query?.taxonomyItemSlug, option.parentSlug);

              if ((isSlugValid || hasParentSlug) && typeof currentQuery !== 'undefined') {
                result.push(currentQuery as IFilterOptionData);
              }
            });

            return uniq(result);
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
              disclosureProp={taxonomyCtx.categoryFilter}
              title={title}
            />
          );
        };

        return (
          <>
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
                    <span className={cn('filter-widget-title', classes)}>{title}</span>
                    <ChevronUpIcon
                      className={cn('open-filter', {
                        open: !open,
                        hidden: !enableDisclosure,
                      })}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="filter-widget-content">
                    <fieldset className="fieldset">
                      {restructureFilterOptions
                        ?.slice(0, 5)
                        .map((option) => renderFilterOptions(option))}
                      {isMoreOptionsOpen &&
                        restructureFilterOptions
                          ?.slice(5)
                          .map((option) => renderFilterOptions(option))}
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
          </>
        );
      })}
    </>
  );
};
