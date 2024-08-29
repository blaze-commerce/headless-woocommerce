import { cn } from '@src/lib/helpers/helper';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const NavbarItem: React.FC<Props> = ({ className, children }) => {
  return <li className={cn('navbar-item flex items-center relative', className)}>{children}</li>;
};
