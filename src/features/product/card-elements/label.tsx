import { decode } from 'html-entities';

import { useSiteContext } from '@src/context/site-context';
import { Product } from '@src/models/product';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

interface ICardLabel {
  product: Product;
}

export const CardLabel = ({ product }: ICardLabel) => {
  const { settings } = useSiteContext();

  if (!(product?.metaData?.productLabel && !settings?.isAdditionalWarningMessageEnabled))
    return null;

  return <ReactHTMLParser html={decode(product?.metaData?.productLabel as string)} />;
};
