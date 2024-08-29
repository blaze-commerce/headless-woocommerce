import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Img, { ImageProps } from 'next/image';
import { MouseEvent, TouchEvent, UIEvent, useState } from 'react';
import { useToggle } from 'usehooks-ts';

import { imageDataBlurUrl } from '@src/lib/helpers/image';

interface Props extends ImageProps {
  showDefault?: Boolean;
  blur?: Boolean;
  className?: string;
  fill?: boolean;
  hasZoomHover?: boolean;
}

export const Image = (props: Props) => {
  const {
    hasZoomHover = false,
    width,
    height,
    src,
    showDefault = true,
    blur = true,
    alt,
    className,
    ...rest
  } = props;
  const [isLoading, setLoading] = useState(true);
  const [state, setState] = useState({
    backgroundImage: `url(${src})`,
    backgroundPosition: '0% 0%',
  });
  const [isClicked, toggleClicked, setIsClicked] = useToggle();
  const [isTouched, setIsTouched] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = (e.target as HTMLElement).getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setState({ ...state, backgroundPosition: `${x}% ${y}%` });
  };

  const handleTouchMove = (e: UIEvent & TouchEvent) => {
    const { left, top, width, height } = (e.target as HTMLElement).getBoundingClientRect();
    const x = ((e.touches[0].clientX - left) / width) * 100;
    const y = ((e.touches[0].clientY - top) / height) * 100;
    setState({ ...state, backgroundPosition: `${x}% ${y}%` });
  };

  if (isEmpty(src) && showDefault && !isLoading) {
    return <div />;
  }

  let attributes = {
    src,
    width,
    height,
    alt,
    className,
    ...rest,
  };

  const zoomAttributes = {
    ...attributes,
    className: cx(className, 'pointer-events-none duration-1000 ease-linear object-cover', {
      'opacity-0 md:opacity-100 lg:opacity-100': isClicked || isTouched,
      'opacity-100 group-hover:opacity-0': !isClicked,
    }),
  };

  if (blur) {
    attributes = {
      ...attributes,
      placeholder: 'blur',
      blurDataURL: imageDataBlurUrl(10, 10),
      onLoadingComplete: () => setLoading(false),
      className: cx(className),
    };
  }
  return (
    <>
      {hasZoomHover ? (
        <figure
          onMouseMove={handleMouseMove}
          onTouchMove={isTouched ? handleTouchMove : undefined}
          onClick={toggleClicked}
          onMouseOut={() => {
            setState({ ...state, backgroundPosition: '0% 0%' });
            setIsClicked(false);
          }}
          onTouchStart={() => setIsTouched(true)}
          onTouchEnd={() => setIsTouched(false)}
          style={state}
          className={cx('group bg-no-repeat w-full h-full object-cover', {
            'cursor-zoom-in': isClicked,
            'cursor-zoom-out': !isClicked,
          })}
        >
          <Img {...zoomAttributes} />
        </figure>
      ) : (
        <Img {...attributes} />
      )}
    </>
  );
};
