import HTMLReactParser from 'html-react-parser';

import { RawLink } from '@src/components/common/raw-link';
import { Product } from '@src/models/product';

interface ICardTitle {
  product: Product;
  handleMouseEnter: () => void;
  layout: string;
  link: string;
}

export const CardTitle = (props: ICardTitle) => {
  const { product, handleMouseEnter, link } = props;
  return (
    <h3
      onMouseEnter={handleMouseEnter}
      className={'product-title'}
    >
      <RawLink href={link}>
        <span
          aria-hidden="true"
          className=" absolute inset-x-auto inset-y-5 z-[8] cursor-pointer"
        />
        {HTMLReactParser(product.name as string)}
      </RawLink>
    </h3>
  );
};
