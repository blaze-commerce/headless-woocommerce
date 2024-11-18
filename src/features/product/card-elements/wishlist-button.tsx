import { Product } from '@src/models/product';
import { WishListIcon } from '@src/features/wish-list/wish-list-icon';
import * as Wishlist from '@src/features/wish-list/wish-list-schema';
import { useWishListStorage } from '@src/lib/hooks';

interface ICardWishlishButton {
  product: Product;
  hasItemsLeftBadge: boolean;
  wishlistButtonType?: number;
  classNames?: string;
}

export const CardWishlishButton = (props: ICardWishlishButton) => {
  const { product } = props;
  const { isProductInWishList } = useWishListStorage();

  const inWishList = isProductInWishList(parseInt(product?.id as string));
  const action: Wishlist.Actions = 'add';
  const shouldShowWishListIcon = true;

  if (inWishList && shouldShowWishListIcon) {
    // We comment this out at the moment because we don't want the remove wishlist icon to show up
    //   shouldShowWishListIcon = true;
    //   action = 'remove';
    // This hides the wishlist icon when it is already in the wishlist item
    return <></>;
  }

  return (
    <>
      {shouldShowWishListIcon && (
        <div className="wishlist-button-holder">
          <WishListIcon
            {...props}
            action={action}
            showIcon={true}
            {...props}
            product={product}
          />
        </div>
      )}
    </>
  );
};
