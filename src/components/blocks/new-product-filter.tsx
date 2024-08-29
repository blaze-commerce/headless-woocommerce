import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';

import { SingleFilterOptions } from '@src/components/category/filter/single-filter-options';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { CategoryFilterItems } from '@src/lib/types/filters';
import { IFilterOptionData } from '@src/lib/types/taxonomy';

export const NewProductFilter = ({ classes, title }: CategoryFilterItems) => {
  const taxonomyCtx = useTaxonomyContext();
  const { asPath } = useRouter();
  const [disclosureOpen, setDisclosureOpen] = taxonomyCtx.newFilter;
  const [newQueryState] = taxonomyCtx.queryVarsNewData;

  const pathIndex = asPath.split('/');

  if (pathIndex[1] === 'products' && pathIndex[2] === 'new') {
    return null;
  }

  if (isEmpty(taxonomyCtx?.tsFetchedData?.newProductsFilter?.items)) {
    return null;
  }

  if (isEmpty(newQueryState)) {
    return null;
  }

  const name = title ?? 'New';

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
            <SingleFilterOptions
              name={name}
              options={newQueryState as IFilterOptionData[]}
              disclosureProp={taxonomyCtx.newFilter}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
