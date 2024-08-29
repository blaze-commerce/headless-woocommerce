import { useSiteContext } from '@src/context/site-context';
import { useUserContext } from '@src/context/user-context';

export const WishListHeader = () => {
  const { loginPopupState, wishListState } = useSiteContext();
  const { isLoggedIn } = useUserContext();
  const [, setOpenLoginPopUp] = loginPopupState;
  const [, setOpen] = wishListState;

  const openLogin = () => {
    setOpenLoginPopUp(true);
    setOpen(false);
  };
  return (
    <div className="space-y-5 mb-5 mt-4">
      {!isLoggedIn && (
        <>
          <strong className="text-lg leading-7">
            Don&apos;t lose your faves! Log in or register.
          </strong>
          <button
            className="w-full flex bg-[#EBEBEB] text-[#6F6F6F] flex-1 border border-[#303030] py-2.5 px-10 text-sm leading-5 font-semibold justify-center items-center gap-2.5 rounded-sm"
            onClick={openLogin}
          >
            Sign In
          </button>
          <p className="text-base">
            Guest favorites are only saved to your device for 7 days, or until you clear your cache.
            Sign in or create an account to hang on to your picks.
          </p>
        </>
      )}
    </div>
  );
};
