import { LuHeartOff } from 'react-icons/lu';
import { v4 } from 'uuid';

import { HeartIcon } from '@src/components/svg/heart';
import { HeartFilledIconV2 } from '@src/components/svg/heart-filled-v2';
import { useAddProductToWishListMutation } from '@src/lib/hooks';
import * as Wishlist from './wish-list-schema';

export const WishListIcon: React.FC<Wishlist.Props> = (props) => {
  if (props.action == 'add') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [addProductToWishList] = useAddProductToWishListMutation(props.product);
    return (
      <button
        type="button"
        onClick={() => {
          addProductToWishList({
            variables: {
              productId: parseInt(props.product?.id as string),
              clientMutationId: v4(),
            },
          });
        }}
      >
        <HeartFilledIconV2 />
      </button>
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
