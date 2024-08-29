import { isEmpty } from 'lodash';

import { useSiteContext } from '@src/context/site-context';
import { useUserContext } from '@src/context/user-context';
import { FormattedCart } from '@src/lib/hooks/cart';
import { useAuth } from '@src/lib/hooks';

const logOutLoadingIndicator = () => {
  return (
    <>
      <div className="w-4 h-4 bg-white animate-ping rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white animate-ping rounded-full flex items-center justify-center"></div>
      </div>
      Logging Out...
    </>
  );
};

export const Logout = () => {
  const { setCart } = useSiteContext();
  const { loginSessionId } = useUserContext();
  const { logout, error, status } = useAuth();
  const loggingOut = status === 'resolving';

  const onClick = () => {
    setCart({} as FormattedCart);
    logout(loginSessionId);
  };

  return (
    <div className="space-y-3">
      {!isEmpty(error) && <p className="text-brand-red">{`${error}`}</p>}
      <button
        className="button-logout text-sm text-brand-font text-left"
        disabled={loggingOut}
        onClick={onClick}
      >
        {loggingOut ? logOutLoadingIndicator() : 'Logout'}
        <span className="has-right-arrow top-[1px] relative"></span>
      </button>
    </div>
  );
};
