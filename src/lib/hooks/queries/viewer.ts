import { gql, useLazyQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import { useEffectOnce } from 'usehooks-ts';

import { useUserContext } from '@src/context/user-context';
import { env } from '@src/lib/env';
import { getCookie } from '@src/lib/helpers/cookie';
import { useSafeDispatch, useUserDetails } from '@src/lib/hooks';

const VIEWER = gql`
  query viewer {
    viewer {
      id
      user_id: databaseId
      email
      username
      name
      roles {
        nodes {
          displayName
          isRestricted
          name
        }
      }
    }
  }
`;

/**
 * Hook which gets details about the logged in user.
 */
export const useViewerQuery = () => {
  const { YOTPO_REWARDS_GUID } = env();
  const { setLoginSessionId, didFetchUser, setDidFetchUser } = useUserContext();
  const { setUserDetails } = useUserDetails();

  const onError = useSafeDispatch(() => {});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCompleted = useSafeDispatch((theData: any) => {
    if (theData.viewer === null) {
      setUserDetails({});
      setLoginSessionId('');
    } else {
      setUserDetails(theData.viewer);
      const loginSessionIdCookie = getCookie('loginSessionId') || '';
      setLoginSessionId(loginSessionIdCookie);
      setDidFetchUser(true);

      /**
       * We will reload the page after getting the user information and yotop rewards is active
       * because it doesn't catch or detect properly if the user is authenticated or not unless we reload the page
       *
       * We also made sure that getViewer is trigger once and only if the app did not fetch the user yet.
       */
      const isLoggedInCookie = getCookie('isLoggedIn');
      if (!isEmpty(YOTPO_REWARDS_GUID) && isLoggedInCookie === 'true') {
        window.location.reload();
      }
    }
  });

  const [getViewer, { loading, error, data }] = useLazyQuery(VIEWER, {
    fetchPolicy: 'network-only',
    onError,
    onCompleted,
  });

  useEffectOnce(() => {
    if (didFetchUser === false) {
      getViewer();
    }
  });

  return {
    loading,
    error,
    data: data && data.viewer ? data.viewer : null,
    refetch: getViewer,
  };
};
