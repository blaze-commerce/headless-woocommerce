import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { isEmpty } from 'lodash';

import { SingleFilterOptions } from '@src/components/category/filter/single-filter-options';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { CategoryFilterItems } from '@src/lib/types/filters';
import { IFilterOptionData } from '@src/lib/types/taxonomy';
import { cn } from '@src/lib/helpers/helper';
import { useEffect } from 'react';

export const AvailabilityFilter = (props: CategoryFilterItems) => {
  const { classes, title, enableDisclosure = true, defaultShow = true } = props;
  const taxonomyCtx = useTaxonomyContext();
  const [disclosureOpen, setDisclosureOpen] = taxonomyCtx.saleFilter;
  const [availabilityQueryState] = taxonomyCtx.queryVarsAvailabilityData;

  useEffect(() => {
    if (!enableDisclosure) setDisclosureOpen(true);

    if (enableDisclosure) {
      setDisclosureOpen(defaultShow);
    }
  }, [enableDisclosure, setDisclosureOpen, defaultShow]);

  if (isEmpty(availabilityQueryState)) return null;

  const name = title ?? 'Availability';

  return (
    <Disclosure
      defaultOpen={disclosureOpen}
      as={'div'}
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
            <span className={cn('filter-widget-title', classes)}>{name}</span>
            <ChevronUpIcon
              className={cn('open-filter', {
                open: !open,
                hidden: !enableDisclosure,
              })}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="filter-widget-content">
            <SingleFilterOptions
              name={name}
              options={availabilityQueryState as IFilterOptionData[]}
              disclosureProp={taxonomyCtx?.availabilityFilter}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
