import { ParsedBlock } from '@src/components/blocks';
import { getBlockName } from '@src/lib/block';
import { FreeShippingProgress } from '@src/components/free-shipping-progress';
type FreeShippingProgressProps = {
  block: ParsedBlock;
};
export const FreeShippingProgressBlock = ({ block }: FreeShippingProgressProps) => {
  const blockName = getBlockName(block);
  if ('FreeShippingProgress' !== blockName) {
    return null;
  }

  return <FreeShippingProgress />;
};
