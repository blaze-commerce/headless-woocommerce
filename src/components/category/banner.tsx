import { decode } from 'html-entities';

import { Image } from '@src/components/common/image';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';
import { ICategoryBanner } from '@src/lib/types/taxonomy';
import { cn } from '@src/lib/helpers/helper';

export const Banner = (props: ICategoryBanner) => {
  const { className, sourceUrl, name, subtitle } = props;
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

  return (
    <div
      className={cn(className, {
        'w-screen': !sourceUrl || shop?.layout?.banner === '2',
      })}
    >
      {hasTitle && <h1 className="page-title">{decode(name)}</h1>}

      {subtitle !== '' && <p className="page-subtitle">{decode(subtitle)}</p>}
    </div>
  );
};
