import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { useSearchContext } from '@src/context/search-context';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type SearchTermProps = {
  block: ParsedBlock;
};

export const SearchTerm = ({ block }: SearchTermProps) => {
  const { searchTermState } = useSearchContext();
  const [searchTerm] = searchTermState;

  const htmlString = block.innerHTML;

  if (htmlString.includes('{{searchTerm}}')) {
    return <ReactHTMLParser html={htmlString.replace('{{searchTerm}}', searchTerm)} />;
  }

  // Get the classnames in the p tag and use it on the span
  const classNames = htmlString.match(/class="([^"]*)"/);

  return <span className={classNames && classNames[1] ? classNames[1] : ''}>{searchTerm}</span>;
};
