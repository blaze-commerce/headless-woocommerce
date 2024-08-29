import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const MainContentWrapper = ({ children }: Props) => {
  return <main className="container mx-auto px-3 lg:p-0">{children}</main>;
};
