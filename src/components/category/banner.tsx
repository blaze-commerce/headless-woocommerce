import { decode } from 'html-entities';

import { Image } from '@src/components/common/image';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';
import { ICategoryBanner } from '@src/lib/types/taxonomy';
import { cn } from '@src/lib/helpers/helper';

export const Banner = (props: ICategoryBanner) => {
  const { sourceUrl, name, subtitle } = props;
  const { settings } = useSiteContext();
  const { shop } = settings as Settings;

  // const hasImage = sourceUrl && (shop?.layout?.banner === '1' || shop?.layout?.banner === '3');

  const hasTitle = (name && (shop?.layout?.banner === '1' || shop?.layout?.banner === '2')) || name;

  // const renderBannerImage = () => {
  //   if (shop?.layout?.banner === '2' || !sourceUrl) return null;

  //   return (
  //     <Image
  //       fill
  //       blur={false}
  //       priority
  //       src={sourceUrl}
  //       alt={name}
  //       className="h-full w-full object-cover"
  //     />
  //   );
  // };

  const renderTitle = () => (
    <div className="mx-auto">
      {hasTitle && (
        <h1 className="xl:max-w-3xl py-4 px-0 text-left text-[#746A5F] text-[32px] md:text-[40px] xl:text-5xl font-normal text-shadow leading-[150%]">
          {decode(name)}
        </h1>
      )}

      {subtitle !== '' && <p className="text-center text-black">{decode(subtitle)}</p>}
    </div>
  );

  return (
    <div
      className={cn({
        'w-screen': !sourceUrl || shop?.layout?.banner === '2',
      })}
    >
      <div>{renderTitle()}</div>
    </div>
  );
};
