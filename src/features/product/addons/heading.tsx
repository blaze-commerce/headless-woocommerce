import { ProductAddons } from '@src/models/product/types';

type TProps = {
  field: ProductAddons;
};

export const AddOnsHeading = ({ field }: TProps) => {
  return <div>{field.name}</div>;
};
