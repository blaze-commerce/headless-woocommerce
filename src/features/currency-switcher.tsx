import { cn } from '@src/lib/helpers/helper';

import { useSiteContext } from '@src/context/site-context';
import { type ShortcodeAttribute } from '@src/components/blocks/shortcode';

const currencyLongName: { [key: string]: string } = {
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  GBP: 'Pound sterling',
  USD: 'United States (US) Dollar',
  NZD: 'New Zealand Dollar',
  IDR: 'Indonesian Rupiah',
  PES: 'Philippine Peso',
  SGD: 'Singapore Dollar',
  MYR: 'Malaysian Ringgit',
};

export const CurrencySwitcher = ({ attributes }: { attributes: ShortcodeAttribute[] }) => {
  const { currencies, handleCountryChange, currentCountry } = useSiteContext();

  if (Object.values(currencies).length === 1) return null;

  const defaultAttributes: { [key: string]: string } = {
    class_name: '',
  };

  attributes.forEach((attribute: ShortcodeAttribute) => {
    const name = String(attribute.name);
    if (name in defaultAttributes) {
      defaultAttributes[name] = String(attribute.value) ?? '';
    }
  });

  return (
    <div className="relative">
      <select
        className={cn(
          'currency-switcher bg-transparent pl-3 pr-8 py-4 border-white text-white text-xs font-normal',
          defaultAttributes.class_name,
          'text-black w-32'
        )}
        onChange={handleCountryChange}
        value={currentCountry}
      >
        {Object.values(currencies).map(
          (currency) =>
            currency && (
              <option
                key={currency.baseCountry}
                value={currency.baseCountry}
              >
                {currencyLongName[currency.currency as string] ?? currency.currency}
              </option>
            )
        )}
      </select>
    </div>
  );
};
