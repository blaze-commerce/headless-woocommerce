import { cn } from '@src/lib/helpers/helper';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type BlockAttrsType = {
  type: string;
  providerNameSlug: string;
  url: string;
  title: string;
  className: string;
};

type EmbedProps = {
  block: ParsedBlock;
};

export const Embed = ({ block }: EmbedProps) => {
  if ('core/embed' !== block.blockName) {
    return null;
  }

  if (!block.attrs) return null;

  const { type, providerNameSlug, url, className, title } = block.attrs as BlockAttrsType;

  // render youtube video block
  if (type === 'video' && providerNameSlug === 'youtube') {
    let videoId: string;

    videoId = String(url.split('v=').pop());

    // check if url contains short url then convert it to full url
    if (url.includes('short')) {
      videoId = String(url.split('/').pop());
    }

    return (
      <div className="flex justify-center">
        <iframe
          className={`${cn(className)}`}
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return <ReactHTMLParser html={block.innerHTML} />;
};
