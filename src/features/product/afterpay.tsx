import { useSiteContext } from '@src/context/site-context';
import { useProductContext } from '@src/context/product-context';
import { isDollar } from '@src/lib/helpers/helper';
import { MasterCard } from '@src/components/svg/payment-methods/mastercard';
import { Amex } from '@src/components/svg/payment-methods/amex';
import { Visa } from '@src/components/svg/payment-methods/visa';
import { PayPal } from '@src/components/svg/payment-methods/paypal';
import { MiniAfterpay } from '@src/components/svg/payment-methods/mini-afterpay';
import { Unionpay } from '@src/components/svg/payment-methods/unionpay';
import { MiniZip } from '@src/components/svg/payment-methods/mini-zip';

// import { AfterpayIcon } from '@src/components/svg/payment-methods/afterpay';

export const AfterPay = () => {
  const { product } = useProductContext();
  const { settings, currentCurrency } = useSiteContext();

  if (!product) return null;

  if (!settings?.store?.isAfterpayEnabled || product.isFree(currentCurrency)) return null;

  const afterpayCalculation = (product?.price?.[currentCurrency] as number) / 4;

  return (
    <>
      <div className="flex flex-col items-left gap-2">
        <div className="flex">
          <MasterCard />
          <Visa />
          <Amex />
          <Unionpay />
          <PayPal />
          <MiniAfterpay />
          <MiniZip />
        </div>
        <span className="font-normal text-sm text-[#6F6F6F]">
          or 4 interest-free payments of {isDollar(currentCurrency) && '$'}
          {afterpayCalculation.toFixed(2)} of $30-$1500
        </span>
        <span>
          <a
            className="underline text-blue-500 text-sm"
            href="#"
          >
            Learn more
          </a>
        </span>
        {/* <AfterpayIcon /> */}
      </div>
    </>
  );
};
