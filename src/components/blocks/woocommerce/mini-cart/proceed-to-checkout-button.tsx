import { ParsedBlock } from '@src/components/blocks';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
type ProceedToCheckoutButtonProps = {
  block: ParsedBlock;
};
export const ProceedToCheckoutButton = ({ block }: ProceedToCheckoutButtonProps) => {
  const { cartUpdating } = useSiteContext();
  const blockName = getBlockName(block);
  if ('ProceedToCheckoutButton' !== blockName) {
    return null;
  }

  const plainText = block.innerHTML.replace(/<[^>]+>/g, '').trim();
  const attributes = block.attrs as BlockAttributes;
  if (cartUpdating) {
    return <div className="animate-pulse  w-full h-14 bg-gray-300"></div>;
  }

  return (
    <a
      href={`${process.env.NEXT_PUBLIC_CHECKOUT_URL}`}
      className={attributes.className}
    >
      {plainText}
    </a>
  );
};
