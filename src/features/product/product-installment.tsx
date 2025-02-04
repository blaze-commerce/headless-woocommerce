import { useProductContext } from '@src/context/product-context';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// import { MasterCard } from '@src/components/svg/payment-methods/mastercard';
// import { Amex } from '@src/components/svg/payment-methods/amex';
// import { Visa } from '@src/components/svg/payment-methods/visa';
// import { PayPal } from '@src/components/svg/payment-methods/paypal';
// import { MiniAfterpay } from '@src/components/svg/payment-methods/mini-afterpay';
// import { Unionpay } from '@src/components/svg/payment-methods/unionpay';
// import { MiniZip } from '@src/components/svg/payment-methods/mini-zip';

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
                return (
                  <Image
                    key={provider}
                    src="/images/mastercard.png"
                    alt="MasterCard"
                    width={50}
                    height={30}
                  />
                );

              case 'visa':
                return (
                  <Image
                    key={provider}
                    src="/images/visa.png"
                    alt="Visa"
                    width={50}
                    height={30}
                  />
                );
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
                return (
                  <Image
                    key={provider}
                    src="/images/discover.png"
                    alt="Discover"
                    width={50}
                    height={30}
                  />
                );
              case 'venmo':
                return (
                  <Image
                    key={provider}
                    src="/images/venmo.png"
                    alt="Venmo"
                    width={50}
                    height={30}
                  />
                );
              case 'american-express':
                return (
                  <Image
                    key={provider}
                    src="/images/american-express.png"
                    alt="American Express"
                    width={50}
                    height={30}
                  />
                );
              case 'security-metrix':
                return (
                  <Image
                    key={provider}
                    src="/images/security-metrix.png"
                    alt="Security Metrix"
                    width={50}
                    height={30}
                  />
                );
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
