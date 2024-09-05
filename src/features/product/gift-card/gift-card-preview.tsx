import getCurrencySymbol from 'currency-symbol-map';
import HTMLReactParser from 'html-react-parser';
import Image from 'next/image';

import { PrefetchLink } from '@src/components/common/prefetch-link';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { env } from '@src/lib/env';
import { Product } from '@src/models/product';
import { Settings } from '@src/models/settings';
import { addYears, currentDate as currentDateFn, formatDate } from '@src/lib/helpers/date';
import { Divider } from '@mui/material';

const { NEXT_PUBLIC_SHOP_NAME } = env();

export const GiftCardPreview = () => {
  const {
    product,
    giftCards: {
      state: [giftCardInput],
    },
  } = useProductContext();
  const { settings, currentCurrency } = useSiteContext();
  const { store } = settings as Settings;

  const { price, regularPrice } = product as Product;
  const displayPrice = regularPrice?.[currentCurrency] != 0 ? regularPrice : price;

  const currencySymbol = getCurrencySymbol(currentCurrency);

  const currentDate = currentDateFn();

  const expirationDate = addYears(currentDate, 1);

  const formattedExpirationDate = formatDate(expirationDate.toISOString(), 'yyyy-mm-dd');

  return (
    <div>
      {store?.giftCardHeaderImage && (
        <Image
          src={store?.giftCardHeaderImage as string}
          alt="Gift Card Header"
          width={640}
          height={200}
          className="w-full h-auto"
        />
      )}
      <div className="my-6 space-y-3 flex flex-col text-[#333333]">
        {giftCardInput?.['giftcard-recipient-field'] && (
          <span>To: {giftCardInput?.['giftcard-recipient-field']}</span>
        )}
        {giftCardInput?.['giftcard-message-field'] && (
          <span className="break-all">
            {HTMLReactParser(
              giftCardInput?.['giftcard-message-field']?.replace(/(?:\r\n|\r|\n)/g, '<br>')
            )}
          </span>
        )}
      </div>
      <div className="mt-1.5 px-6 bg-[#fffbf8] border border-[#333333] rounded-2xl">
        <div className="flex items-center justify-center my-6 text-xl text-[#333333]">
          {NEXT_PUBLIC_SHOP_NAME} Gift Card
        </div>
        <div className="mt-6 flex flex-col">
          <div className="text-xs text-[#666666]">Amount</div>
          <div className="text-4xl text-[#333333]">
            {currencySymbol}
            {displayPrice?.[currentCurrency]?.toFixed(2)}
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="text-xs text-[#666666]">Gift Card Number</div>
          <div className="font-semibold text-lg text-[#333333]">1234-WXYZ-5678-ABCD</div>
        </div>
        <div className="my-6 flex flex-row justify-between">
          <div className="py-3.5 px-8 flex items-center justify-center rounded-md bg-[#bfa677] text-base text-white cursor-pointer">
            Redeem
          </div>
          <div className="flex flex-col justify-end">
            <div className="text-xs text-[#666666]">Expires</div>
            <div className="text-sm text-[#333333]">{formattedExpirationDate}</div>
          </div>
        </div>
      </div>
      {store?.giftCardFooterText && (
        <div className="space-y-3 my-6 text-sm text-[#505050] text-left">
          {HTMLReactParser(store?.giftCardFooterText as string)}
        </div>
      )}
      <Divider className="mb-4" />
    </div>
  );
};
