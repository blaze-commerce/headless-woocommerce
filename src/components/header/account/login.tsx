import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import React, { useState } from 'react';

import { useSiteContext } from '@src/context/site-context';
import { useAuth } from '@src/lib/hooks';
import { CgClose } from 'react-icons/cg';

type Props = {
  onClose: () => void;
};

const logInLoadingIndicator = () => {
  return (
    <>
      <div className="w-4 h-4 bg-white animate-ping rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white animate-ping rounded-full flex items-center justify-center"></div>
      </div>
      Logging In...
    </>
  );
};

export const Login: React.FC<Props> = ({ onClose }) => {
  const [loginFields, setLoginFields] = useState({
    email: '',
    password: '',
  });
  const { fetchCart } = useSiteContext();

  const { login, error, status } = useAuth();
  const loggingIn = status === 'resolving';

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //update form state
    setLoginFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async () => {
    if (loggingIn) return;
    await login(loginFields.email, loginFields.password);
    fetchCart();
  };

  return (
    <form className="space-y-3">
      <p className="uppercase text-black text-base font-bold border-b pb-2.5 flex items-center justify-between">
        SIGN IN
        <CgClose
          className=" text-brand-second-gray group-hover:text-brand-primary cursor-pointer"
          aria-hidden="true"
          onClick={onClose}
        />
      </p>
      {!isEmpty(error) && <p className="text-brand-red">{`${error}`}</p>}
      <div className="relative">
        <label
          className="text-[#7a7a7a] text-sm font-normal leading-tight mb-1 block"
          htmlFor="email"
        >
          Email address
        </label>
        <input
          onChange={onChange}
          name="email"
          placeholder="Email"
          className="h-10 appearance-none w-full bg-white border border-[#b2b2b2] rounded-sm shadow-sm py-2.4 px-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:placeholder-gray-400"
          type="text"
          disabled={loggingIn}
        />
        {/* <FaEnvelope className="pointer-events-none absolute top-3.5 right-4 h-5 w-5 text-brand-primary" /> */}
      </div>

      <div className="relative">
        <label
          className="text-[#7a7a7a] text-sm font-normal leading-tight mb-1 block"
          htmlFor="password"
        >
          Password
        </label>
        <input
          onChange={onChange}
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          className="h-10 appearance-none w-full bg-white border border-[#b2b2b2] rounded-sm shadow-sm py-2.4 px-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:placeholder-gray-400"
          type="password"
          disabled={loggingIn}
        />
        {/* <FaLock className="pointer-events-none absolute top-3.5 right-4 h-5 w-5 text-brand-primary" /> */}
      </div>
      <div className="flex justify-end">
        <Link
          href="/my-account/lost-password/"
          className="text-[#7a7a7a] text-sm font-normal text-right focus:ring-brand-primary focus:ring-2 focus:outline-none"
        >
          Forgot Password?
        </Link>
      </div>
      <div>
        <a
          className="button-signin h-10 px-4 py-2 bg-[#000180] rounded-md justify-center items-center gap-2.5 inline-flex text-center text-white text-sm font-bold leading-norma w-full"
          onClick={handleLogin}
        >
          {loggingIn ? logInLoadingIndicator() : 'SIGN IN'}
        </a>
      </div>
      <div className="text-[#777777] text-base font-normal leading-normal">
        Not yet a member? &nbsp;
        <Link
          href="/my-account/"
          className="button-register text-center text-[#777777] text-base font-bold underline leading-normal"
        >
          Register
        </Link>
      </div>
    </form>
  );
};
