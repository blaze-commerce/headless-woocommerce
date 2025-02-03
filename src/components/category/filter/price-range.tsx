import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { useSiteContext } from '@src/context/site-context';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { Settings } from '@src/models/settings';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { PriceRangeSlider } from '@src/features/product/range/price-range-slider';
import { cn } from '@src/lib/helpers/helper';
import { TWidgetFilterProps } from '@src/lib/types/widget';

export const PriceRangeFilter = ({
  enableDisclosure = true,
  defaultShow = true,
}: TWidgetFilterProps) => {
  const { settings, currentCurrency } = useSiteContext();
  const taxonomyCtx = useTaxonomyContext();
  const { colors, shop } = settings as Settings;
  const [disclosureOpen, setDisclosureOpen] = useState(defaultShow);

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
            <span className={cn('filter-widget-title')}>Price</span>
            <ChevronUpIcon
              className={cn('open-filter', {
                open: !open,
                hidden: !enableDisclosure,
              })}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="filter-widget-content">
            <PriceRangeSlider
              disclosureProp={taxonomyCtx.priceFilter}
              color={shop?.layout?.priceRangeSlider?.color ?? colors?.background?.primary}
              min={Math.trunc(
                taxonomyCtx?.tsFetchedData?.priceRangeAmount?.minValue?.[currentCurrency] as number
              )}
              max={Math.trunc(
                taxonomyCtx?.tsFetchedData?.priceRangeAmount?.maxValue?.[currentCurrency] as number
              )}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
