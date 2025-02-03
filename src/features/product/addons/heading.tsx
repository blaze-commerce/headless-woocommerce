import { ProductAddons } from '@src/models/product/types';
type TProps = {
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & ProductAddons;

export const AddOnsHeading = (props: TProps) => {
  const { heading, name } = props;

  const Heading = heading;

  return <Heading className="addon-field-heading">{name}</Heading>;
};
