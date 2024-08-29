import { BlockComponentProps } from '@src/components/blocks';
import { Search as SearchComponent } from '@src/components/header/search';
import { useSiteContext } from '@src/context/site-context';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

export const Search = ({ block }: BlockComponentProps) => {
  const { settings } = useSiteContext();

  if (block.blockName !== 'fibosearch/search') {
    return null;
  }

  const { search } = settings || {};

  if (!search?.input && !search?.results) {
    return null;
  }

  const { input, results } = search;
  const searchAttributes = {
    input,
    results,
  };
  const attribute = block.attrs as BlockAttributes;
  return (
    <div className={cn(`_${block.id} w-full`, attribute.className)}>
      <SearchComponent
        input={search.input}
        results={search.results}
      />
    </div>
  );
};
