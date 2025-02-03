import { ParsedBlock } from '@src/components/blocks';
import { getBlockName } from '@src/lib/block';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { useSiteContext } from '@src/context/site-context';
import { useContentContext } from '@src/context/content-context';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { getCurrencySymbol } from '@src/lib/helpers/helper';
import { numberFormat } from '@src/lib/helpers/product';

type CartDiscountTotalProps = {
  block: ParsedBlock;
};

export const CartDiscountTotal = ({ block }: CartDiscountTotalProps) => {
  const { cart } = useSiteContext();
  const { currentCurrency } = useSiteContext();
  const blockName = getBlockName(block);
  if ('CartDiscountTotal' !== blockName && block.innerBlocks) {
    return null;
  }

  if (!cart.discountTotal || (cart.discountTotal && cart.discountTotal <= 0)) {
    return null;
  }

  const theContent: string = block.innerHTML;
  const content = theContent.replace(
    '{{cartDiscountTotal}}',
    String(`${getCurrencySymbol(currentCurrency)}${numberFormat(cart.discountTotal ?? 0)}`)
  );

  return <ReactHTMLParser html={content} />;
};
