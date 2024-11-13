import HEADER_DATA from '@public/header.json';
import { Content } from '@src/components/blocks/content';
import { useSiteContext } from '@src/context/site-context';
import { WishList } from '@src/features/wish-list';
import { cn } from '@src/lib/helpers/helper';

export const Header = () => {
  const { settings } = useSiteContext();
  return (
    <>
      <header
        id="top"
        className={cn('w-full bg-white shadow-lg font-primary', {
          'sticky top-0 z-10 !max-w-[100%]': settings?.isHeaderSticky,
        })}
      >
        <Content content={HEADER_DATA} />
      </header>

      <WishList />
    </>
  );
};
