import classNames from 'classnames';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { v4 } from 'uuid';

import { PrefetchLink } from '@src/components/common/prefetch-link';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';

type Props = {
  image: string;
  title: string;
  subtitle: string;
  CTAUrl: string;
  CTAText: string;
  TitleClasses?: string;
  SubtitleClasses?: string;
  CTATextClasses?: string;
};

export const CustomBanner = ({
  image,
  title,
  subtitle,
  CTAUrl,
  CTAText,
  TitleClasses,
  SubtitleClasses,
  CTATextClasses,
}: Props) => {
  const { settings } = useSiteContext();
  const { homepage } = settings as Settings;

  const renderImage = () => {
    const imageSplit = image?.split('/');
    const imageName = imageSplit?.[imageSplit?.length - 1];

    const ImageComponent = (
      <Image
        src={`/images/banner/${imageName}`}
        alt={title}
        width={1000}
        height={800}
        className="block"
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

  const hasContent = () => {
    return title || subtitle || CTAText;
  };

  const containerClass = classNames({
    'w-screen left-[calc(-50vw+50%)]': homepage?.layout?.banner?.fullWidth,
  });

  return (
    <div className={containerClass}>
      <div
        key={v4()}
        className="relative"
      >
        {isEmpty(CTAText)}
        {renderImage()}
        {hasContent() && (
          <div
            className={classNames('absolute inset-x-0 mt-[200px] block px-12', {})}
            style={{
              maxWidth: settings?.store?.containerWidth?.desktop,
            }}
          >
            <div className={classNames(TitleClasses)}>{title}</div>

            {subtitle && <div className={classNames(SubtitleClasses)}>{subtitle}</div>}
            {CTAUrl && CTAText && (
              <PrefetchLink
                unstyled
                className={classNames('p-4 mt-4 block w-64', CTATextClasses)}
                href={CTAUrl}
              >
                {CTAText}
              </PrefetchLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
