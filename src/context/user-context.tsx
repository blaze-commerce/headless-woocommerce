/* eslint-disable no-unused-vars */
import { isEmpty, toString } from 'lodash';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { getCookie, setCookie } from '@src/lib/helpers/cookie';
import { useUserDetails } from '@src/lib/hooks';

type UserContextType = {
  isLoggedIn: boolean;
  loginSessionId: string;
  setIsLoggedIn: (_value: boolean) => void;
  setLoginSessionId: (_value: string) => void;
  didLogin: boolean;
  setDidLogin: (value: boolean) => void;
  didLogOut: boolean;
  setDidLogOut: (value: boolean) => void;
  didFetchUser: boolean;
  setDidFetchUser: (value: boolean) => void;
};

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  loginSessionId: '',
  setIsLoggedIn: () => {},
  setLoginSessionId: () => {},
  didLogin: false,
  setDidLogin: () => {},
  didLogOut: false,
  setDidLogOut: () => {},
  didFetchUser: false,
  setDidFetchUser: () => {},
});

export function setStateWithCookie<T>(state: string, setState: Dispatch<SetStateAction<T>>) {
  return (value: T) => {
    setCookie(state, toString(value), 30);
    setState(value);
  };
}

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const router = useRouter();
  const [didLogin, setDidLogin] = useLocalStorage<boolean>('didLogin', false);
  const [didLogOut, setDidLogOut] = useLocalStorage<boolean>('didLogOut', false);

  const didFechUserCookie = getCookie('didFetchUser');
  const didFetchUser =
    isEmpty(didFechUserCookie) || didFechUserCookie === '' || didFechUserCookie === 'false'
      ? false
      : true;

  const setDidFetchUser = (value: boolean) => {
    setCookie('didFetchUser', `${value}`, 30);
  };

  const { userDetails } = useUserDetails();

  const userEmail = userDetails.email;

  const [isLoggedIn, setIsLoggedIn] = useState(userEmail ? true : false);
  const [loginSessionId, setLoginSessionId] = useState('');

  const providerValue: UserContextType = {
    isLoggedIn,
    loginSessionId,
    setIsLoggedIn: setStateWithCookie('isLoggedIn', setIsLoggedIn),
    setLoginSessionId: setStateWithCookie('loginSessionId', setLoginSessionId),
    didLogin,
    setDidLogin,
    didLogOut,
    setDidLogOut,
    didFetchUser,
    setDidFetchUser,
  };

  /**
   * use to set isLoggedIn if userEmail is not empty
   */
  useEffect(() => {
    setIsLoggedIn(userEmail ? true : false);
  }, [userEmail]);

  useEffect(() => {
    const loginSessionIdCookie = getCookie('loginSessionId') || '';
    providerValue.setLoginSessionId(loginSessionIdCookie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.slug]);

  return <UserContext.Provider value={providerValue}>{props.children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
