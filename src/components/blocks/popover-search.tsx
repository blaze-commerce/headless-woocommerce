import { FiSearch } from 'react-icons/fi';
import { BlockComponentProps } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { useRef, useState } from 'react';
import { find } from 'lodash';
import { useOnClickOutside } from 'usehooks-ts';
import { Search as SearchComponent } from '@src/components/header/search';
import { useSiteContext } from '@src/context/site-context';

export const PopoverSearchBlock = ({ block }: BlockComponentProps) => {
  const { settings } = useSiteContext();

  const { search } = settings || {};

  const [isOpen, setIsOpen] = useState(false);
  const searchPopoverRef = useRef(null);

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useOnClickOutside(searchPopoverRef, handleClickOutside);

  if (!search?.input && !search?.results) {
    return null;
  }

  const attributes = block?.attrs as any;
  const color = find(attributes?.htmlAttributes, ['attribute', 'data-color']);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="menu-item-account group cursor-pointer h-full focus:outline-none space-x-2 my-account-popup-button"
      >
        <FiSearch
          style={{
            color: color?.value || '#000',
          }}
          className="w-6 h-6 !fill-none"
        />
      </button>
      <div ref={searchPopoverRef}>
        {isOpen && (
          <div className="lg:absolute lg:z-10 lg:mt-3 lg:w-screen lg:max-w-[540px] lg:-translate-x-full lg:transform lg:px-2 fixed inset-x-10 px-0 z-20">
            <div className="rounded-sm shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative grid gap-6 bg-white sm:gap-8 sm:py-2.5 px-5 rounded-sm">
                <SearchComponent
                  input={search.input}
                  results={search.results}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
