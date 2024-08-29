import { cn } from '@src/lib/helpers/helper';
import { Product } from '@src/models/product';
import { WishListIcon, WishListActions } from '@src/features/wish-list/wish-list-icon';
import { useSiteContext } from '@src/context/site-context';
import { useWishListStorage } from '@src/lib/hooks';

interface ICardWishlishButton {
  product: Product;
  hasItemsLeftBadge: boolean;
  wishlistButtonType?: number;
  classNames?: string;
}

export const CardWishlishButton = (props: ICardWishlishButton) => {
  const { settings } = useSiteContext();
  const { product, classNames, hasItemsLeftBadge, wishlistButtonType = 1 } = props;
  const { isProductInWishList } = useWishListStorage();

  const inWishList = isProductInWishList(parseInt(product?.id as string));
  const action: WishListActions = 'add';
  const shouldShowWishListIcon = settings?.store?.wishlist?.enabled;

  if (inWishList && settings?.store?.wishlist?.enabled) {
    // We comment this out at the moment because we don't want the remove wishlist icon to show up
    //   shouldShowWishListIcon = true;
    //   action = 'remove';
    // This hides the wishlist icon when it is already in the wishlist item
    return <></>;
  }

  return (
    <>
      {shouldShowWishListIcon && (
        <div
          className={cn(
            'wishlist-button absolute w-full h-full flex justify-end overflow-hidden z-20',
            {
              'flex-col':
                hasItemsLeftBadge || settings?.store?.wishlist?.iconPosition === 'bottom-right',
            }
          )}
        >
          <div className="flex flex-row-reverse">
            <WishListIcon
              {...props}
              action={action}
              showIcon={true}
              classNames={cn(
                'cursor-pointer group/wishlist flex items-center w-8 h-8 md:w-10 md:h-10 p-2 md:p-2.5 z-[9] m-2.5',
                {
                  'rounded-full': wishlistButtonType === 1,
                  'shadow-[0_4px_8px_rgba(0,0,0,0.1)]':
                    !hasItemsLeftBadge && wishlistButtonType === 2,
                },
                classNames
              )}
              {...props}
              product={product}
            />
          </div>
        </div>
      )}
    </>
  );
};
