import { PrefetchLink } from '@src/components/common/prefetch-link';
import { cn } from '@src/lib/helpers/helper';

type Props = {
  className?: string;
  children: React.ReactNode;
  href?: string;
};

export const NavbarLink: React.FC<Props> = ({ className, children, href = '#' }) => {
  const isTelOrEmail = /^(tel|email):.*/gm.test(href);

  if (isTelOrEmail) {
    return (
      <a
        href={href}
        className={cn('p-4 relative', className)}
      >
        {children}
      </a>
    );
  }

  return (
    <PrefetchLink
      unstyled
      href={href}
      className={cn('p-4 relative', className)}
    >
      {children}
    </PrefetchLink>
  );
};
