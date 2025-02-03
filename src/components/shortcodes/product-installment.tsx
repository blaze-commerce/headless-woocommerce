import { ShortcodeAttribute } from '@src/components/blocks/shortcode';
import { ProductInstallment } from '@src/features/product/product-installment';

export const ShortcodeProductInstallment = ({
  attributes,
}: {
  attributes: ShortcodeAttribute[];
}) => {
  const defaultAttributes: { [key: string]: string } = {
    provider: 'all',
    installment: '4',
  };

  attributes.forEach((attribute: ShortcodeAttribute) => {
    const name = String(attribute.name);
    if (name in defaultAttributes) {
      defaultAttributes[name] = String(attribute.value) ?? '';
    }
  });

  return <ProductInstallment {...defaultAttributes} />;
};
