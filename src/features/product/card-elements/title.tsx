import { cn } from '@src/lib/helpers/helper';

import { RawLink } from '@src/components/common/raw-link';
import { Product } from '@src/models/product';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

interface ICardTitle {
  product: Product;
  handleMouseEnter: () => void;
  layout: string;
  fontSize: string;
  link: string;
}

export const CardTitle = (props: ICardTitle) => {
  const { product, handleMouseEnter, layout, fontSize, link } = props;
  return (
    <div
      onMouseEnter={handleMouseEnter}
      className={cn('font-normal text-[#746A5F] mt-2', {
        'mt-0': 'secondary' === layout,
      })}
      style={{ fontSize }}
    >
      <RawLink href={link}>
        <span
          aria-hidden="true"
          className=" absolute inset-0 z-[8] cursor-pointer"
        />
        <ReactHTMLParser html={product.name as string} />
      </RawLink>
    </div>
  );
};
