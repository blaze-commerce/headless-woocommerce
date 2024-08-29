import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { isEmpty } from 'lodash';

import { SingleFilterOptions } from '@src/components/category/filter/single-filter-options';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { CategoryFilterItems } from '@src/lib/types/filters';
import { IFilterOptionData } from '@src/lib/types/taxonomy';
import { cn } from '@src/lib/helpers/helper';

export const AvailabilityFilter = ({ classes, title }: CategoryFilterItems) => {
  const taxonomyCtx = useTaxonomyContext();
  const [disclosureOpen, setDisclosureOpen] = taxonomyCtx.saleFilter;
  const [availabilityQueryState] = taxonomyCtx.queryVarsAvailabilityData;

  if (isEmpty(availabilityQueryState)) return null;

  const name = title ?? 'Availability';

  return (
    <Disclosure defaultOpen={disclosureOpen}>
      {({ open }) => (
        <div className="border-t border-brand-second-gray">
          <Disclosure.Button
            onClick={() => setDisclosureOpen((prev) => !prev)}
            className="flex items-center w-full justify-between text-left focus:outline-none focus-visible:ring focus-visible:ring-brand-primary-light focus-visible:ring-opacity-75 py-5"
          >
            <span className={cn('uppercase text-base font-normal', classes)}>{name}</span>
            <ChevronUpIcon
              className={cn('h-5 w-5 text-[#3F3F46]', {
                'rotate-180 transform': !open,
              })}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="text-sm text-gray-500 pb-5">
            <SingleFilterOptions
              name={name}
              options={availabilityQueryState as IFilterOptionData[]}
              disclosureProp={taxonomyCtx?.availabilityFilter}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
