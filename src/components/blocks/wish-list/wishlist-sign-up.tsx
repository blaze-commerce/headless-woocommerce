import { ParsedBlock } from '@src/components/blocks';
import { useSiteContext } from '@src/context/site-context';
import { useUserContext } from '@src/context/user-context';
import { getBlockName } from '@src/lib/block';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { useWishListStorage } from '@src/lib/hooks';
import { Content } from '@src/components/blocks/content';
type WishlistSignUpProps = {
  block: ParsedBlock;
};

export const WishlistSignUp = ({ block }: WishlistSignUpProps) => {
  const { isLoggedIn } = useUserContext();
  const { loginPopupState, wishListState } = useSiteContext();
  const [, setOpenLoginPopUp] = loginPopupState;
  const [, setOpen] = wishListState;
  const blockName = getBlockName(block);

  const openLogin = () => {
    setOpenLoginPopUp(true);
    setOpen(false);
  };

  if (!['WishlistSignUp', 'WishlistSignUpButton'].includes(blockName as string) || isLoggedIn) {
    return null;
  }

  if ('WishlistSignUpButton' === blockName) {
    return (
      <button
        type="button"
        className={block.attrs.className}
        onClick={openLogin}
      >
        <Content
          type="wishlist"
          content={block.innerBlocks}
        />
      </button>
    );
  }

  return (
    <div className={block.attrs.className}>
      <Content
        type="wishlist"
        content={block.innerBlocks}
      />
    </div>
  );
};
