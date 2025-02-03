import { BlockComponentProps } from '@src/components/blocks';
import { Search as SearchComponent } from '@src/components/header/search';
import { SearchContextProvider } from '@src/context/search-context';
import { useSiteContext } from '@src/context/site-context';
import { isBlockA } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

export const Search = ({ block }: BlockComponentProps) => {
  const { settings } = useSiteContext();

  const allowedBlocks = ['fibosearch/search', 'core/search'];
  const isContainerSearch = isBlockA(block, 'Search');

  const allowedBlock =
    block.blockName && (!allowedBlocks.includes(block.blockName) || !isContainerSearch);

  if (!allowedBlock) {
    return null;
  }

  const { search } = settings || {};

  if (!search?.input && !search?.results) {
    return null;
  }

  return (
    <SearchContextProvider>
      <SearchComponent
        input={search.input}
        results={search.results}
        block={block}
      />
    </SearchContextProvider>
  );
};
