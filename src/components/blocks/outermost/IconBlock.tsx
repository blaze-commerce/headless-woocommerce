import { ParsedBlock } from '@src/components/blocks';
import { Hamburger } from '@src/components/blocks/maxmegamenu/hamburger';
import { NextPage } from '@src/components/blocks/templates/products-widget/next-page';
import { PrevPage } from '@src/components/blocks/templates/products-widget/prev-page';
import { AddToWishlistButton } from '@src/components/blocks/wish-list/add-to-wishlist-button';
import { WishlistCloseButton } from '@src/components/blocks/wish-list/wishlist-close-button';
import { MiniCartCloseButton } from '@src/components/blocks/woocommerce/mini-cart/mini-cart-close-button';
import { RemoveCartItemButton } from '@src/components/blocks/woocommerce/product-collection/product-template/remove-cart-item';
import { getBlockName } from '@src/lib/block';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { parseLink } from '@src/lib/helpers/helper';
import Link from 'next/link';

type IconBlockProps = {
  block: ParsedBlock;
};

export const getSvgContent = (html: string) => {
  return html.match(/<svg[\s\S]*<\/svg>/)?.[0] || '';
};

const placeHolderBlocks = {
  ProductsWidgetNextPage: NextPage,
  ProductsWidgetPrevPage: PrevPage,
  MenuHamburger: Hamburger,
  CloseMiniCartButton: MiniCartCloseButton,
  WishlistCloseButton: WishlistCloseButton,
  AddToWishlistButton: AddToWishlistButton,
  RemoveCartItem: RemoveCartItemButton,
};

export const IconBlock = ({ block }: IconBlockProps) => {
  if ('outermost/icon-block' !== block.blockName && !block.innerBlocks[0]) {
    return null;
  }

  const blockName = getBlockName(block);

  const PlaceHolderBlock = placeHolderBlocks[blockName as keyof typeof placeHolderBlocks];
  if (PlaceHolderBlock || typeof PlaceHolderBlock !== 'undefined') {
    return <PlaceHolderBlock block={block} />;
  }

  const link = parseLink(block.innerHTML);
  const svgContent = getSvgContent(block.innerHTML);

  return link ? (
    <Link href={link}>
      <ReactHTMLParser html={svgContent} />
    </Link>
  ) : (
    <ReactHTMLParser html={svgContent} />
  );
};
