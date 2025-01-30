import { ParsedBlock } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { Product } from '@src/models/product';
import { PinterestSaveButton } from '@src/features/pinterest-save-button';
import siteData from '@public/site.json';

type Props = {
  block: ParsedBlock;
};

export const SaveToPinterest = ({ block }: Props) => {
  const { type, data } = useContentContext();
  if (type !== 'product' || !data) {
    return null;
  }

  const blockName = getBlockName(block);
  if ('SaveToPinterest' !== blockName) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;
  const product = data as Product;
  return (
    <PinterestSaveButton
      className={attributes.className}
      src={product?.thumbnail?.src}
    />
  );
};
