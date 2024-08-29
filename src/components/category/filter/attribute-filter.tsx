import { Disclosure } from '@headlessui/react';
import { useSiteContext } from '@src/context/site-context';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { ContentBlock } from '@src/types';
import { isArray, isEmpty } from 'lodash';

import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { cn } from '@src/lib/helpers/helper';
import { ColorFilter } from '@src/components/category/filter/color-filter';

export const AttributeFilter = (props: ContentBlock) => {
  const { currentCountry } = useSiteContext();
  const taxonomyCtx = useTaxonomyContext();

  const attributeFilters = isArray(props.metaData) ? props.metaData : [];

  const attributFilterOptions = taxonomyCtx.tsFetchedData?.attributeFilterOptions;
  if (isEmpty(attributFilterOptions)) {
    return null;
  }
  return (
    <div>
      {attributeFilters.map((attributeFilter, index) => {
        const filterConfig = !isEmpty(attributeFilter[currentCountry])
          ? attributeFilter[currentCountry]
          : null;

        if (!filterConfig) {
          return null;
        }

        const availableOptions = taxonomyCtx.tsFetchedData?.attributeFilterOptions.filter(
          (attributeOption) => attributeOption.type === filterConfig.attributeType
        );

        if (!availableOptions) {
          return null;
        }

        return (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="border-t border-brand-second-gray">
                <Disclosure.Button className="flex items-center w-full justify-between text-left focus:outline-none focus-visible:ring focus-visible:ring-brand-primary-light focus-visible:ring-opacity-75 py-5">
                  <span className={cn('uppercase text-base font-normal')}>
                    {filterConfig.title}
                  </span>
                  <ChevronUpIcon
                    className={cn('h-5 w-5 text-[#3F3F46]', {
                      'rotate-180 transform': !open,
                    })}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm text-gray-500 pb-5">
                  {availableOptions.map((option, index) => {
                    if ('color' === option.componentType) {
                      return (
                        <ColorFilter
                          {...option}
                          key={index}
                        />
                      );
                    }

                    return null;
                  })}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
};
