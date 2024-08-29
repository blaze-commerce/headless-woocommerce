import { Variant } from '@src/models/product/types';

type Props = {
  label: string;
  name: string;
  variants: Variant[];
};

export const SwatchVariant: React.FC<Props> = ({ name, label, variants }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">{label}:</label>
      <div className="flex space-x-2">
        {variants.map((variant, index) => (
          <label
            htmlFor={`${name}-${index}`}
            key={variant.value}
          >
            <input
              className="peer hidden"
              type="radio"
              name={name}
              id={`${name}-${index}`}
              value={variant.value}
            />
            <div
              className="cursor-pointer border peer-checked:border-brand-primary peer-checked:border-2 w-10 h-10"
              style={{ backgroundColor: variant.label }}
            ></div>
          </label>
        ))}
      </div>
    </div>
  );
};
