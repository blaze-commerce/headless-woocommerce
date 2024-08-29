import HTMLReactParser from 'html-react-parser';
import { decode } from 'html-entities';

import { useSiteContext } from '@src/context/site-context';
import { Product } from '@src/models/product';

interface ICardLabel {
  product: Product;
}

export const CardLabel = ({ product }: ICardLabel) => {
  const { settings } = useSiteContext();

  if (!(product?.metaData?.productLabel && !settings?.isAdditionalWarningMessageEnabled))
    return null;

  return <>{HTMLReactParser(decode(product?.metaData?.productLabel as string))}</>;
};
