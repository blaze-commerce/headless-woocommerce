import Image, { StaticImageData } from 'next/image';
import {
  RenderSlideProps,
  Slide,
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
} from 'yet-another-react-lightbox';

import { imageDataBlurUrl } from '@src/lib/helpers/image';

const isNextJsImage = (slide: Slide): slide is StaticImageData => {
  return isImageSlide(slide) && typeof slide.width === 'number' && typeof slide.height === 'number';
};

export const NextJsImage = ({ slide, rect }: RenderSlideProps) => {
  const { imageFit } = useLightboxProps().carousel;
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const width = !cover
    ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width))
    : rect.width;

  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / slide.width) * slide.height))
    : rect.height;

  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        fill
        alt=""
        src={slide}
        loading="eager"
        draggable={false}
        style={{ objectFit: cover ? 'cover' : 'contain' }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        placeholder="blur"
        blurDataURL={imageDataBlurUrl(10, 10)}
      />
    </div>
  );
};
