import { LuHeartOff } from 'react-icons/lu';
import { v4 } from 'uuid';

import { HeartIcon } from '@src/components/svg/heart';
import { HeartFilledIcon } from '@src/components/svg/heart-filled';
import { useAddProductToWishListMutation } from '@src/lib/hooks';
import * as Wishlist from './wish-list-schema';

export const WishListIcon: React.FC<Wishlist.Props> = (props) => {
  if (props.action == 'add') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [addProductToWishList] = useAddProductToWishListMutation(props.product);
    return (
      <p
        onClick={() => {
          addProductToWishList({
            variables: {
              productId: parseInt(props.product?.id as string),
              clientMutationId: v4(),
            },
          });
        }}
      >
        <HeartFilledIcon />
      </p>
    );
  }

  if (props.action == 'remove') {
    return (
      <p className={props.classNames}>
        <LuHeartOff />
      </p>
    );
  }

  return <HeartIcon />;
};
