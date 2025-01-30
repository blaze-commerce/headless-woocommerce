import { ContentBlock, ContentBlockMetaData } from '@src/types';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { get, isObject } from 'lodash';

import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { cn } from '@src/lib/helpers/helper';
import { CategoryFilterItems } from '@src/lib/types/filters';
import { FilterList } from '@src/components/blocks/sub-category-grouped-filter/filter-list';

type Props = {
  content: ContentBlock;
};

export const SubCategoryGroupedFilter = ({ content }: Props) => {
  const groupName = get(content, 'config.groupName', '');
  const rowClass = get(content, 'config.rowClass', '');
  const metaData: CategoryFilterItems[] = content.metaData.map((meta: ContentBlockMetaData) => {
    return isObject(meta) ? Object.values(meta)[0] : meta;
  });
  const taxonomyCtx = useTaxonomyContext();
  const [disclosureOpen, setDisclosureOpen] = taxonomyCtx.categoryFilter;
  return (
    <Disclosure defaultOpen={disclosureOpen}>
      {({ open }) => (
        <div className="border-t border-brand-second-gray">
          <Disclosure.Button
            onClick={() => setDisclosureOpen((prev) => !prev)}
            className="flex items-center w-full justify-between text-left focus:outline-none focus-visible:ring focus-visible:ring-brand-primary-light focus-visible:ring-opacity-75 py-5"
          >
            <span className={rowClass}>{groupName}</span>
            <ChevronUpIcon
              className={cn('h-5 w-5 text-[#3F3F46]', {
                'rotate-180 transform': !open,
              })}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="text-sm text-gray-500 pb-5">
            {metaData.map((filterItem) => (
              <FilterList
                key={filterItem.title}
                {...filterItem}
              />
            ))}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
