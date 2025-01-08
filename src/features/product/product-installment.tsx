import { useProductContext } from '@src/context/product-context';
import dynamic from 'next/dynamic';

// import { MasterCard } from '@src/components/svg/payment-methods/mastercard';
// import { Amex } from '@src/components/svg/payment-methods/amex';
// import { Visa } from '@src/components/svg/payment-methods/visa';
// import { PayPal } from '@src/components/svg/payment-methods/paypal';
// import { MiniAfterpay } from '@src/components/svg/payment-methods/mini-afterpay';
// import { Unionpay } from '@src/components/svg/payment-methods/unionpay';
// import { MiniZip } from '@src/components/svg/payment-methods/mini-zip';

const MasterCard = dynamic(() =>
  import('@src/components/svg/payment-methods/mastercard').then((mod) => mod.MasterCard)
);
const Visa = dynamic(() =>
  import('@src/components/svg/payment-methods/visa').then((mod) => mod.Visa)
);
const Amex = dynamic(() =>
  import('@src/components/svg/payment-methods/amex').then((mod) => mod.Amex)
);
const Unionpay = dynamic(() =>
  import('@src/components/svg/payment-methods/unionpay').then((mod) => mod.Unionpay)
);
const PayPal = dynamic(() =>
  import('@src/components/svg/payment-methods/paypal').then((mod) => mod.PayPal)
);
const MiniAfterpay = dynamic(() =>
  import('@src/components/svg/payment-methods/mini-afterpay').then((mod) => mod.MiniAfterpay)
);
const MiniZip = dynamic(() =>
  import('@src/components/svg/payment-methods/mini-zip').then((mod) => mod.MiniZip)
);
const Discover = dynamic(() =>
  import('@src/components/svg/payment-methods/discover').then((mod) => mod.Discover)
);
const Venmo = dynamic(() =>
  import('@src/components/svg/payment-methods/venmo').then((mod) => mod.Venmo)
);
const AmericanExpress = dynamic(() =>
  import('@src/components/svg/payment-methods/american-express').then((mod) => mod.AmericanExpress)
);
const SecurityMetrix = dynamic(() =>
  import('@src/components/svg/payment-methods/security-metrix').then((mod) => mod.SecurityMetrix)
);

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
      <div className="product-installment hide-if-out-of-stock">
        <div className="provider">
          {providers.map((provider) => {
            switch (provider) {
              case 'mastercard':
                return <MasterCard key={provider} />;
              case 'visa':
                return <Visa key={provider} />;
              case 'amex':
                return <Amex key={provider} />;
              case 'unionpay':
                return <Unionpay key={provider} />;
              case 'paypal':
                return <PayPal key={provider} />;
              case 'afterpay':
                return <MiniAfterpay key={provider} />;
              case 'zip':
                return <MiniZip key={provider} />;
              case 'discover':
                return <Discover key={provider} />;
              case 'venmo':
                return <Venmo key={provider} />;
              case 'american-express':
                return <AmericanExpress key={provider} />;
              case 'security-metrix':
                return <SecurityMetrix key={provider} />;
              default:
                return null;
            }
          })}
        </div>
        <span className="text">
          Pay in {installment} interest-free payments on purchase of $30-$1500. Learn more:
        </span>
        <span className="link">
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
