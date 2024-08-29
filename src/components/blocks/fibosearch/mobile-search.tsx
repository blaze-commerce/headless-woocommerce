import { FiSearch } from 'react-icons/fi';

import { useSiteContext } from '@src/context/site-context';
import { BlockComponentProps } from '@src/components/blocks';
import { find } from 'lodash';

export const MobileSearch = ({ block }: BlockComponentProps) => {
  const { setShowSearch } = useSiteContext();

  const attributes = block?.attrs as any;
  const color = find(attributes?.htmlAttributes, ['attribute', 'data-color']);

  return (
    <div
      className="full w-6 flex items-center justify-center"
      onClick={() => setShowSearch(true)}
    >
      <FiSearch
        style={{
          color: color.value || '#000',
        }}
        className="w-6 h-6 !fill-none"
      />
    </div>
  );
};
