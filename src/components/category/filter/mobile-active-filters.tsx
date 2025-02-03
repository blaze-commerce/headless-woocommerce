import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';

import { ActiveFilters } from './active-filters';
import { Shop } from '@src/models/settings/shop';

type TProps = {
  resetFilterAction: () => void;
  isFilterSet: boolean;
};

export const MobileActiveFilters = (props: TProps) => {
  const { resetFilterAction, isFilterSet } = props;
  const { settings } = useSiteContext();
  const { shop } = settings as Settings;

  const { layout } = shop as Shop;

  if (!isFilterSet) return null;

  return (
    <div className="display-active-filters">
      <div className="active-filters">
        <ActiveFilters {...layout?.activeFilters} />
        <button
          className="clear-button-holder"
          onClick={resetFilterAction}
        >
          Clear all
        </button>
      </div>
    </div>
  );
};
