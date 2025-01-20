import { ParsedBlock } from '@src/components/blocks';
import { getBlockName } from '@src/lib/block';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { useSiteContext } from '@src/context/site-context';
import { useContentContext } from '@src/context/content-context';

type HasCartItemsContainerProps = {
  block: ParsedBlock;
};

export const HasCartItemsContainer = ({ block }: HasCartItemsContainerProps) => {
  const { cart } = useSiteContext();
  const { type, data } = useContentContext();
  const blockName = getBlockName(block);
  if ('HasCartItemsContainer' !== blockName && block.innerBlocks) {
    return null;
  }
  const hasCartItems = cart !== null && cart?.products?.length > 0 ? true : false;
  if (!hasCartItems) {
    return null;
  }
  const attributes = block.attrs as BlockAttributes;

  return (
    <div className={attributes.className}>
      <Content
        type={type}
        globalData={data}
        content={block.innerBlocks}
      />
    </div>
  );
};
