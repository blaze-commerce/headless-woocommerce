import { ParsedBlock } from '@src/components/blocks';
import { getBlockName } from '@src/lib/block';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { useSiteContext } from '@src/context/site-context';
import { useContentContext } from '@src/context/content-context';

type CartDiscountContainerProps = {
  block: ParsedBlock;
};

export const CartDiscountContainer = ({ block }: CartDiscountContainerProps) => {
  const { cart } = useSiteContext();
  const { type, data } = useContentContext();
  const blockName = getBlockName(block);
  if ('CartDiscountContainer' !== blockName && block.innerBlocks) {
    return null;
  }

  const shouldShow = parseInt(cart.discountTotal?.toString() || '', 10) > 0;
  if (!shouldShow) {
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
