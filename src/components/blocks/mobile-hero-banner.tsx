import { isEmpty } from 'lodash';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import { v4 } from 'uuid';

import { PrefetchLink } from '@src/components/common/prefetch-link';
import { ChevronLeft } from '@components/svg/chevron-left';
import { ChevronRight } from '@components/svg/chevron-right';
import { useSiteContext } from '@src/context/site-context';
import { cn } from '@src/lib/helpers/helper';

type Banner = {
  image: string;
  title: string;
  subtitle: string;
  CTAUrl: string;
  CTAText: string;
  TitleClasses?: string;
  SubtitleClasses?: string;
  CTATextClasses?: string;
};

type Props = {
  banners: Banner[];
};

export const MobileHeroBanner = ({ banners }: Props) => {
  const { settings } = useSiteContext();
  const { homepage } = settings || {};

  const renderImage = ({ image, title, CTAText, CTAUrl }: Banner) => {
    const imageSplit = image?.split('/');
    const imageName = imageSplit?.[imageSplit?.length - 1];

    const ImageComponent = (
      <Image
        src={`/images/banner/${imageName}`}
        alt={title}
        width={1000}
        height={800}
        className={cn('block w-auto object-cover', {
          'h-72': settings?.isMobileBannerSquare,
          'h-full': !settings?.isMobileBannerSquare,
        })}
      />
    );

    if (isEmpty(CTAText) && !isEmpty(CTAUrl)) {
      return (
        <PrefetchLink
          unstyled
          className="block"
          href={CTAUrl}
        >
          {ImageComponent}
        </PrefetchLink>
      );
    }

    return ImageComponent;
  };

  const hasContent = ({ title, subtitle, CTAText }: Banner) => {
    return title || subtitle || CTAText;
  };

  const arrowNext = (clickHandler: () => void): React.ReactNode => {
    return (
      <div
        className="right-0 top-1/2 inline-flex text-white text-[26px] absolute cursor-pointer opacity-40 hover:opacity-100"
        onClick={clickHandler}
      >
        <ChevronRight />
      </div>
    );
  };
  const arrowPrev = (clickHandler: () => void): React.ReactNode => {
    return (
      <button
        className="left-0 top-1/2 inline-flex text-white text-[26px] z-[2] absolute cursor-pointer opacity-40 hover:opacity-100"
        onClick={clickHandler}
        disabled
      >
        <ChevronLeft />
      </button>
    );
  };

  return (
    <Carousel
      showStatus={false}
      showIndicators={false}
      infiniteLoop
      renderArrowNext={arrowNext}
      renderArrowPrev={arrowPrev}
      showThumbs={false}
      className={cn('block md:hidden relative', {
        'w-screen left-[calc(-50vw+50%)]': homepage?.layout?.banner?.fullWidth,
        'h-72': settings?.isMobileBannerSquare,
        'h-full': !settings?.isMobileBannerSquare,
      })}
      dynamicHeight
    >
      {banners.map((banner) => {
        const { title, subtitle, CTAText, CTAUrl, TitleClasses, SubtitleClasses, CTATextClasses } =
          banner;
        return (
          <div
            key={v4()}
            className="relative"
          >
            {isEmpty(CTAText)}
            {renderImage(banner)}
            {hasContent(banner) && (
              <div className="absolute mobile-hero-banner-text px-4">
                <div className={cn(TitleClasses)}>{title}</div>

                {subtitle && <div className={cn(SubtitleClasses)}>{subtitle}</div>}
                {CTAUrl && CTAText && (
                  <PrefetchLink
                    unstyled
                    className={cn('p-4 mt-4 block w-40', CTATextClasses)}
                    href={CTAUrl}
                  >
                    {CTAText}
                  </PrefetchLink>
                )}
              </div>
            )}
          </div>
        );
      })}
    </Carousel>
  );
};
