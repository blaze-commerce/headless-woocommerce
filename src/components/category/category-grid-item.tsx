import { decode } from 'html-entities';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import { PrefetchLink } from '@src/components/common/prefetch-link';
import { SubCategory } from '@src/schemas/taxonomy-schema';
import { emptyImagePlaceholder } from '@src/lib/constants/image';
import { cn } from '@src/lib/helpers/helper';
type Props = {
  content: SubCategory;
  cardGroupStyle?: React.CSSProperties;
};

export const CategoryGridItem = ({ content, cardGroupStyle }: Props) => {
  const { permalink, thumbnail, name } = content;

  const gridItemImageSource = thumbnail?.src ? thumbnail?.src : emptyImagePlaceholder;

  const cardContent = (
    <div
      className="category-card"
      style={{
        padding: '20px',
      }}
    >
      <div className={cn('aspect-w-1 w-28 h-28')}>
        <Image
          className="absolute h-28 w-28 object-cover object-center"
          src={gridItemImageSource}
          alt={name as string}
          width={500}
          height={500}
        />
      </div>

      <div className="basis-0 px-2.5 justify-center">
        <div
          className="basis-0 text-center leading-tight no-underline text-sm font-extrabold"
          style={!isEmpty(cardGroupStyle) ? cardGroupStyle : {}}
        >
          {decode(content.name)}
        </div>
      </div>
    </div>
  );

  if (permalink) {
    return (
      <PrefetchLink
        unstyled
        href={permalink}
      >
        {cardContent}
      </PrefetchLink>
    );
  }

  return cardContent;
};
