import { removeHttp } from '@src/lib/helpers/helper';

type Banner = {
  video: string;
};

export const VideoBanner = ({ video }: Banner) => {
  if (!video) return null;

  const videoUrlId = video?.split('?v=');

  if (!videoUrlId) return null;

  return (
    <div className="relative h-96 w-screen left-[calc(-50vw+50%)]">
      <iframe
        className="absolute overflow-hidden w-full h-full"
        allowFullScreen={false}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        height="1920"
        width="1080"
        src={`https://www.youtube.com/embed/${
          videoUrlId?.[1]
        }?controls=0&rel=0&playsinline=1&enablejsapi=1&origin=https%3A%2F%2F${removeHttp(
          process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL
        )}&widgetid=1&autoplay=1&mute=1&fs=0&loop=1&rel=0&showinfo=0&disablekb=1`}
        loading="lazy"
      />
    </div>
  );
};
