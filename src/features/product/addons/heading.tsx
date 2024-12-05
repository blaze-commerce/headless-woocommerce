import { ProductAddons } from '@src/models/product/types';
import { AddOnsTitle } from './title';
type TProps = {
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & ProductAddons;

export const AddOnsHeading = (props: TProps) => {
  const { heading, name, description } = props;
  return (
    <div className="addon-field-group">
      <AddOnsTitle field={props} />
      {description && <p className="addon-field-description">{description}</p>}
    </div>
  );
};
