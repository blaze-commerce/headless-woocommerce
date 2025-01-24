import { ParsedBlock } from '@src/components/blocks';
import { getBlockName } from '@src/lib/block';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { useSiteContext } from '@src/context/site-context';
import { useContentContext } from '@src/context/content-context';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { getCurrencySymbol } from '@src/lib/helpers/helper';
import { numberFormat } from '@src/lib/helpers/product';

type CartSubTotalProps = {
  block: ParsedBlock;
};

export const CartSubTotal = ({ block }: CartSubTotalProps) => {
  const { cart, settings } = useSiteContext();
  const { currentCurrency } = useSiteContext();
  const blockName = getBlockName(block);
  if ('CartSubTotal' !== blockName && block.innerBlocks) {
    return null;
  }

  const subtotalDisplay = settings?.isTaxExclusive ? cart.subtotal : cart.total;

  const theContent: string = block.innerHTML;
  const content = theContent.replace(
    '{{cartSubTotal}}',
    String(`${getCurrencySymbol(currentCurrency)}${numberFormat(Number(subtotalDisplay))}`)
  );

  return <ReactHTMLParser html={content} />;
};
