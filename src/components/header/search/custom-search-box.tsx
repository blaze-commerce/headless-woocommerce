import { useRouter } from 'next/router';
import { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSearchBox } from 'react-instantsearch-hooks-web';

import { useSiteContext } from '@src/context/site-context';
import { track } from '@src/lib/track';
import { Settings } from '@src/models/settings';
import { cn } from '@src/lib/helpers/helper';

//@TODO: to be removed because of SearchInput component that uses gutenber block
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomSearchBox = ({ onFocus, setSearchTerm, searchTerm, className, style }: any) => {
  const { settings } = useSiteContext();
  const router = useRouter();
  const { s } = router.query;
  const { search } = settings as Settings;
  const { refine } = useSearchBox();
  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(() => {
      refine(e.target.value);
      track.search(e.target.value);
      return e.target.value;
    });
  };

  useEffect(() => {
    if (s && typeof s === 'string') {
      setSearchTerm(s);
    }
  }, [s, setSearchTerm]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      /**
       * On enter redirect to search page
       */
      event.preventDefault();

      const destinationUrl = `/search-results?s=${encodeURIComponent(searchTerm)}`;
      if (router.asPath !== destinationUrl) {
        router.push(destinationUrl);
      }
    }
  };

  const inputClasses = cn(
    'appearance-none w-full py-2.5 pl-2.5 pr-10 placeholder-[#BFBFBF] rounded-sm text-sm',
    'focus:outline-none focus:ring-0 focus:border-[#BFBFBF] focus:placeholder-[#BFBFBF]',
    'text-base rounded-md',
    className
  );

  const searchIconStyle = {
    color: search?.input?.customColors?.iconColor,
  };

  return (
    <>
      <div className="relative">
        <input
          onChange={onSearchTermChange}
          name="search"
          placeholder="Search for products"
          className={inputClasses}
          type="text"
          onFocus={onFocus}
          style={style}
          onKeyDown={handleKeyDown}
          value={searchTerm}
        />
        <div
          className={cn(
            className,
            'pointer-events-none absolute top-0 right-0 h-full w-10 flex items-center justify-center rounded-sm',
            {
              'bg-gray-200': !search?.input?.customColors?.enabled,
            }
          )}
          style={{
            borderColor: style?.borderColor || undefined,
          }}
        >
          <FiSearch
            className="text-brand-font w-6 h-6"
            style={search?.input?.customColors?.enabled ? searchIconStyle : {}}
          />
        </div>
      </div>
    </>
  );
};
