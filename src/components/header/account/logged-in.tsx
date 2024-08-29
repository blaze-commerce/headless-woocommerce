import Link from 'next/link';

import { Divider } from '@src/components/common/divider';
import { Logout } from '@src/components/header/account/logout';
import { useUserDetails } from '@src/lib/hooks';

export const LoggedIn = ({ label }: { label?: string }) => {
  const { userDetails } = useUserDetails();

  return (
    <div className="my-account-popup">
      <p className="text-zinc-800 text-sm leading-tight font-bold border-b pb-2.5 mb-4 greeting">
        Hello, {userDetails?.name}
      </p>
      <Link
        href="/my-account"
        className="flex justify-center items-center gap-5 flex-1 uppercase w-full text-white h-12 py-3 tracking-wider bg-brand-secondary my-account-link"
      >
        Go to {label}
      </Link>
      <Divider className="my-4" />
      <Logout />
    </div>
  );
};
