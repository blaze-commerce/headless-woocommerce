import { AfterpayIcon } from '@components/svg/payment-methods/afterpay';
import { ApplePayIcon } from '@components/svg/payment-methods/applepay';
import { GooglePayIcon } from '@components/svg/payment-methods/googlepay';
import { ZipIcon } from '@components/svg/payment-methods/zip';

export const AvailablePaymentMethods = () => {
  return (
    <ul className="flex space-x-8 items-center">
      <li>
        <ZipIcon />
      </li>
      <li>
        <AfterpayIcon />
      </li>
      <li>
        <ApplePayIcon />
      </li>
      <li>
        <GooglePayIcon />
      </li>
    </ul>
  );
};
