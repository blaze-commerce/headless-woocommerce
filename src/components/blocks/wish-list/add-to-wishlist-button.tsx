import { ParsedBlock } from '@src/components/blocks';
import React from 'react';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { getBlockName } from '@src/lib/block';
import { getSvgContent } from '@src/components/blocks/outermost/IconBlock';
import { useContentContext } from '@src/context/content-context';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { useAddProductToWishListMutation } from '@src/lib/hooks';
import { Product } from '@src/models/product';
import { v4 } from 'uuid';
type AddToWishlistButtonProps = {
  block: ParsedBlock;
};
export const AddToWishlistButton = ({ block }: AddToWishlistButtonProps) => {
  const { type, data } = useContentContext();
  const blockName = getBlockName(block);
  const product = data as Product;
  const [addProductToWishList, { loading }] = useAddProductToWishListMutation(product);

  if ('AddToWishlistButton' !== blockName || 'product' !== type || !data) {
    return null;
  }

  const svgContent = getSvgContent(block.innerHTML);
  const attributes = block.attrs as BlockAttributes;

  return (
    <button
      type="button"
      className={cn('bottom-4 right-4 hover:text-red-500', attributes.className)}
      disabled={loading}
      onClick={() => {
        addProductToWishList({
          variables: {
            productId: parseInt(product.id as string),
            clientMutationId: v4(),
          },
        });
      }}
    >
      {loading ? (
        <div className="animate-ping w-3.5 h-3.5 bg-gray-300 rounded-full"></div>
      ) : (
        <ReactHTMLParser html={svgContent} />
      )}
    </button>
  );
};
