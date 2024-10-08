import { useProductContext } from '@src/context/product-context';

import { MasterCard } from '@src/components/svg/payment-methods/mastercard';
import { Amex } from '@src/components/svg/payment-methods/amex';
import { Visa } from '@src/components/svg/payment-methods/visa';
import { PayPal } from '@src/components/svg/payment-methods/paypal';
import { MiniAfterpay } from '@src/components/svg/payment-methods/mini-afterpay';
import { Unionpay } from '@src/components/svg/payment-methods/unionpay';
import { MiniZip } from '@src/components/svg/payment-methods/mini-zip';

// import { AfterpayIcon } from '@src/components/svg/payment-methods/afterpay';

type TProps = {
  provider: string | string[];
  installment: string;
};

export const ProductInstallment = (props: TProps) => {
  const { product } = useProductContext();
  const { provider, installment } = props;

  if (!product) return null;

  const providers: string[] = Array.isArray(provider) ? provider : provider.split(',');

  return (
    <>
      <div className="product-installment">
        <div className="provider">
          {(providers.includes('mastercard') || providers.includes('all')) && <MasterCard />}
          {(providers.includes('visa') || providers.includes('all')) && <Visa />}
          {(providers.includes('amex') || providers.includes('all')) && <Amex />}
          {(providers.includes('unionpay') || providers.includes('all')) && <Unionpay />}
          {(providers.includes('paypal') || providers.includes('all')) && <PayPal />}
          {(providers.includes('afterpay') || providers.includes('all')) && <MiniAfterpay />}
          {(providers.includes('zip') || providers.includes('all')) && <MiniZip />}
        </div>
        <span className="text">
          Pay in {installment} interest-free payments on purchase of $30-$1500. Learn more:{''}
          <a href="#">Learn More</a>
        </span>
      </div>
    </>
  );
};

ProductInstallment.defaultProps = {
  provider: 'all',
  installment: '4',
};
