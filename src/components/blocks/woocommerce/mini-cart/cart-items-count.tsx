import { ParsedBlock } from '@src/components/blocks';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
type CartItemsCountProps = {
  block: ParsedBlock;
};
export const CartItemsCount = ({ block }: CartItemsCountProps) => {
  const { cart } = useSiteContext();
  const blockName = getBlockName(block);
  if ('CartItemsCount' !== blockName) {
    return null;
  }

  const cartItemsCount = cart?.products?.length || 0;
  const theContent: string = block.innerHTML;
  const content = theContent.replace('{{cartItemsCount}}', String(cartItemsCount));

  return <ReactHTMLParser html={content} />;
};
