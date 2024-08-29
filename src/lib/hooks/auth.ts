import { decodeEntities } from '@wordpress/html-entities';
import { useEffect, useState } from 'react';
import { stripHtml } from 'string-strip-html';
import { useLocalStorage } from 'usehooks-ts';
import { v4 } from 'uuid';

import { useUserContext } from '@src/context/user-context';
import { track } from '@src/lib/track';
import {
  useLoginMutation,
  useLogoutMutation,
  useSafeDispatch,
  useViewerQuery,
} from '@src/lib/hooks';
import type { User } from '@src/types';

type ErrorCodeProps =
  | string
  | {
      [key: string]: string;
    };

const errorCodes: ErrorCodeProps = {
  invalid_username: 'Invalid username or password. Please check it and try again.',
  invalid_email: 'Invalid username or password. Please check it and try again.',
  incorrect_password: 'Invalid username or password. Please check it and try again.',
  empty_username: 'Please provide your username.',
  empty_password: 'Please provide your password.',
};

export const useUserDetails = () => {
  const [user, setUser] = useLocalStorage<User>('userDetails', {});

  const [userDetails, setUserDetails] = useState<User>({});
  useEffect(() => {
    setUserDetails(user);
  }, [user]);

  return {
    userDetails,
    setUserDetails: setUser,
  };
};

export const useAuth = () => {
  const { isLoggedIn, setLoginSessionId, setDidLogin, setDidLogOut, setDidFetchUser } =
    useUserContext();
  const [error, setError] = useState<ErrorCodeProps | null>(null);
  const [status, setStatus] = useState('idle');
  const { loginMutation } = useLoginMutation();
  const { logoutMutation } = useLogoutMutation();

  const { setUserDetails } = useUserDetails();
  const { data: viewer, refetch: refetchViewer, loading: loadingViewer } = useViewerQuery();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoginSuccess = useSafeDispatch((response: any) => {
    setStatus('resolved');
    setUserDetails(response.data.loginWithCookies);
    setDidLogin(true);
    setDidFetchUser(true);
    track.login();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = useSafeDispatch((errors: any) => {
    setError(errorCodes[errors.message] || `${stripHtml(decodeEntities(errors.message)).result}`);
    setStatus('resolved');
  });

  const login = (username: string, password: string) => {
    const clientMutationId = v4();
    setError(null);
    setStatus('resolving');
    setLoginSessionId(clientMutationId);

    return loginMutation(username, password, clientMutationId).then(onLoginSuccess).catch(onError);
  };

  const onLogoutSuccess = useSafeDispatch(() => {
    setStatus('resolved');
    setUserDetails({});
    setDidLogOut(true);
  });

  const logout = (clientMutationId: string) => {
    setError(null);
    setStatus('resolving');
    setLoginSessionId('');
    return logoutMutation(clientMutationId).then(onLogoutSuccess);
  };

  return {
    login,
    logout,
    isLoggedIn,
    refetchViewer,
    loadingViewer,
    viewer,
    error,
    status,
  };
};
