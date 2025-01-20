import { ParsedBlock } from '@src/components/blocks';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { BlockAttributes } from '@src/lib/block/types';
type ProceedToCheckoutButtonProps = {
  block: ParsedBlock;
};
export const ProceedToCheckoutButton = ({ block }: ProceedToCheckoutButtonProps) => {
  const blockName = getBlockName(block);
  if ('ProceedToCheckoutButton' !== blockName) {
    return null;
  }

  const plainText = block.innerHTML.replace(/<[^>]+>/g, '').trim();
  const attributes = block.attrs as BlockAttributes;

  return (
    <a
      href={`${process.env.NEXT_PUBLIC_CHECKOUT_URL}`}
      className={attributes.className}
    >
      {plainText}
    </a>
  );
};
