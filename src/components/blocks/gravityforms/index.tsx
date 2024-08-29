import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { NewsLetter } from '@src/components/blocks/gravityforms/news-letter';
import { BlockAttributes } from '@src/lib/block/types';

type FormProps = {
  block: ParsedBlock;
};

export const Form = ({ block }: FormProps) => {
  if ('gravityforms/form' !== block.blockName) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;
  if (attribute.metadata?.name && attribute.metadata.name.startsWith('NewLetter')) {
    return <NewsLetter block={block} />;
  }

  // @TODO: Think of a way to get the form data from api and show it properly
  return null;
};
