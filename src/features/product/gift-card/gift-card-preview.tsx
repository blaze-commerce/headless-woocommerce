import getCurrencySymbol from 'currency-symbol-map';
import Image from 'next/image';

import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { env } from '@src/lib/env';
import { Product } from '@src/models/product';
import { Settings } from '@src/models/settings';
import { addYears, currentDate as currentDateFn, formatDate } from '@src/lib/helpers/date';
import { Divider } from '@mui/material';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { useEffect } from 'react';

const { NEXT_PUBLIC_SHOP_NAME } = env();

type TGiftCardPreview = {
  amount: number;
};

export const GiftCardPreview = (props: TGiftCardPreview) => {
  const { amount } = props;
  const {
    giftCards: {
      state: [giftCardInput],
    },
  } = useProductContext();
  const { settings, currentCurrency } = useSiteContext();
  const { store } = settings as Settings;

  const currencySymbol = getCurrencySymbol(currentCurrency);

  const currentDate = currentDateFn();

  const expirationDate = addYears(currentDate, 1);

  const formattedExpirationDate = formatDate(expirationDate.toISOString(), 'yyyy-mm-dd');

  return (
    <>
      <div className="gift-card-message-preview">
        {giftCardInput?.['giftcard-from-field'] && (
          <span>From: {giftCardInput?.['giftcard-from-field']}</span>
        )}
        {giftCardInput?.['giftcard-message-field'] && (
          <span className="break-all">
            Message:
            <ReactHTMLParser
              html={giftCardInput?.['giftcard-message-field']?.replace(/(?:\r\n|\r|\n)/g, '<br>')}
            />
          </span>
        )}
      </div>
      <div className="gift-card-content-preview">
        {store?.giftCardHeaderImage && (
          <Image
            src={store?.giftCardHeaderImage as string}
            alt="Gift Card Header"
            width={640}
            height={200}
            className="site-image"
          />
        )}
        <div className="shop-name">{store?.giftCardHeaderText as string}</div>
        <div className="card-info">
          <div className="card-info-label">Amount</div>
          <div className="card-info-value amount">
            {currencySymbol}
            {amount.toFixed(2)}
          </div>
        </div>
        <div className="card-info">
          <div className="card-info-label">Gift Card Number</div>
          <div className="card-info-value card-number">1234-WXYZ-5678-ABCD</div>
        </div>
        <div className="redeem-container">
          <div className="redeem-button">Redeem</div>
          <div className="card-info expire-info">
            <div className="card-info-label">Expires</div>
            <div className="card-info-value">{formattedExpirationDate}</div>
          </div>
        </div>
      </div>
      {store?.giftCardFooterText && (
        <div className="space-y-3 my-6 text-sm text-[#505050] text-left">
          <ReactHTMLParser html={store?.giftCardFooterText as string} />
        </div>
      )}
    </>
  );
};
