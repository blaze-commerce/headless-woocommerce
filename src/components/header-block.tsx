import HEADER_DATA from '@public/header.json';
import { Content } from '@src/components/blocks/content';
import { useSiteContext } from '@src/context/site-context';
import { FiX } from 'react-icons/fi';
import { Search as SearchInput } from '@src/components/header/search';
import { Search as SearchProps } from '@src/models/settings/search';
import { WishList } from '@src/features/wish-list';
import { cn } from '@src/lib/helpers/helper';

export const Header = () => {
  const { showSearch, setShowSearch, settings } = useSiteContext();
  const { input, results } = settings?.search as SearchProps;
  const searchAttributes = {
    input,
    results,
  };

  return (
    <>
      <div id="top"></div>
      <header
        className={cn('w-full bg-white shadow-lg', {
          'sticky top-0 z-10 !max-w-[100%]': settings?.isHeaderSticky,
        })}
      >
        <Content content={HEADER_DATA} />
      </header>
      {showSearch && (
        <div className="search absolute w-full top-0 bg-white z-10">
          <div className="p-4 pb-0 border-b">
            <FiX
              className="text-brand-font ml-auto h-6 w-6 mb-4"
              onClick={() => setShowSearch(false)}
            />
          </div>
          <div className="p-4 bg-white shadow">
            <SearchInput {...searchAttributes} />
          </div>
        </div>
      )}
      <WishList />
    </>
  );
};
