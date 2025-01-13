import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import { GoZoomIn } from 'react-icons/go';
import 'yet-another-react-lightbox/plugins/counter.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import { NextJsImage } from '@src/components/next-js-image';
import { Image as ImageType } from '@src/models/product/types';
import { isMp4 } from '@src/lib/helpers/helper';
import 'yet-another-react-lightbox/styles.css';

type Props = {
  images: ImageType[];
  width?: number;
  height?: number;
  imageIndex?: number;
  className?: string;
};

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

export const SlideImages = (props: Props) => {
  const { images, width = 3840, height = 3840, imageIndex, className } = props;
  const { basePath } = useRouter();
  const [open, setOpen] = useState(false);

  const nextImageUrl = (src: string, size: number) => {
    const currentEnv = process.env.VERCEL_ENV;
    let baseUrl = basePath;
    switch (currentEnv) {
      case 'development':
        baseUrl = 'http://localhost:3000';
        break;
    }

    if (!process.env.VERCEL_URL && currentEnv === 'development') return src;

    return `${baseUrl}/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
  };

  const slides = images.map(({ src, altText }) => {
    if (isMp4(src)) {
      return {
        alt: altText,
        width: 1280,
        height: 720,
        sources: [
          {
            src,
            type: 'video/mp4',
          },
        ],
        type: 'video' as const,
      };
    } else
      return {
        alt: altText,
        width,
        height,
        src: nextImageUrl(src, +(width as number)),
        srcSet: imageSizes
          .concat(...deviceSizes)
          .filter((size) => size <= +(width as number))
          .map((size) => ({
            src: nextImageUrl(src, size),
            width: size,
            height: Math.round((+(height as number) / +(width as number)) * size),
          })),
      };
  });

  return (
    <div
      className={classNames(
        className,
        'absolute flex w-full overflow-hidden p-4 z-[7] justify-end'
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-white border border-foreground w-12 h-12 flex justify-center items-center"
      >
        <GoZoomIn className="w-6 h-6" />
      </button>
      <Lightbox
        open={open}
        index={imageIndex}
        close={() => setOpen(false)}
        slides={slides}
        render={{ slide: NextJsImage }}
        plugins={[Zoom, Video, Counter, Fullscreen]}
        video={{
          controls: true,
          autoPlay: true,
          loop: true,
        }}
      />
    </div>
  );
};
