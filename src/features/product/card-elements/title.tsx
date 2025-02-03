import { RawLink } from '@src/components/common/raw-link';
import { Product } from '@src/models/product';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

interface ICardTitle {
  product: Product;
  handleMouseEnter: () => void;
  layout: string;
  link: string;
  className?: string;
}

export const CardTitle = (props: ICardTitle) => {
  const { product, handleMouseEnter, link } = props;
  return (
    <h3
      onMouseEnter={handleMouseEnter}
      className={`product-title ${props.className}`}
    >
      <RawLink href={link}>
        <span
          aria-hidden="true"
          className=" absolute inset-x-auto inset-y-5 z-[8] cursor-pointer"
        />
        <ReactHTMLParser html={product.name as string} />
      </RawLink>
    </h3>
  );
};
