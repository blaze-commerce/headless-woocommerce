import { isEmpty } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { useUserContext } from '@src/context/user-context';
import { env } from '@src/lib/env';
import { useUserDetails } from '@src/lib/hooks';

export const YotpoRewards = () => {
  const { YOTPO_REWARDS_GUID } = env();
  const { userDetails } = useUserDetails();
  const { didLogin, setDidLogin, didLogOut, setDidLogOut } = useUserContext();

  useUpdateEffect(() => {
    if (true === didLogin && !isEmpty(YOTPO_REWARDS_GUID)) {
      // Reloads the page when isLoggedIn is true
      setDidLogin(false);
      window.location.reload();
    }
  }, [didLogin]);

  useUpdateEffect(() => {
    if (true === didLogOut && !isEmpty(YOTPO_REWARDS_GUID)) {
      // Reloads the page when the user Logs out to update yotpo reward widget
      setDidLogOut(false);
      window.location.reload();
    }
  }, [didLogOut]);

  if (isEmpty(YOTPO_REWARDS_GUID)) {
    return null;
  }

  return (
    <>
      <script
        type="text/javascript"
        async
        src={`https://cdn-loyalty.yotpo.com/loader/${YOTPO_REWARDS_GUID}.js`}
      />
      <div
        id="swell-customer-identification"
        data-authenticated={userDetails.user_id ? true : false}
        data-email={userDetails.email}
        data-id={userDetails.user_id}
        style={{ display: 'none' }}
      ></div>
    </>
  );
};
