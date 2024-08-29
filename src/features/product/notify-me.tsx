import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

import { WishListIcon } from '@src/features/wish-list/wish-list-icon';
import { EmailIcon } from '@src/components/svg/email';
import { useSiteContext } from '@src/context/site-context';
import { Product } from '@src/models/product';
import { Settings } from '@src/models/settings';
import { ProductSettings } from '@src/models/settings/product';
import { ProductNotifierProps } from '@src/pages/api/instocknotifier/subscribe';
import { useProductNotifier } from '@src/lib/hooks';

type Props = {
  product: Product;
};

export const NotifyMeWhenAvailable = (props: Props) => {
  const { settings } = useSiteContext();
  const { store } = settings as Settings;
  const [formData, setFormData] = useState<ProductNotifierProps>({
    subscriber_name: '',
    email: '',
    product_id: `${props.product.id}`,
    status: 'cwg_subscribed',
  });

  const { data, error, loading, subscribeProductNotification } = useProductNotifier();

  useEffect(() => {
    if (!isEmpty(data?.message) || (isEmpty(data?.message) && isEmpty(error?.message))) {
      setFormData((prev) => ({
        ...prev,
        subscriber_name: '',
        email: '',
      }));
    }
  }, [data, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await subscribeProductNotification(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const renderWishlistButton = () => {
    const { layout } = settings?.product as ProductSettings;

    return (
      <WishListIcon
        action="add"
        showIcon={true}
        product={props.product}
        classNames={classNames(
          'cursor-pointer group/wishlist flex justify-center items-center  w-1/12',
          {
            'rounded-sm': layout?.wishlist?.buttonType === '1',
            'rounded-full border': layout?.wishlist?.buttonType === '2',
            'shadow-[0_4px_8px_rgba(0,0,0,0.1)]': layout?.wishlist?.buttonType === '2',
          }
        )}
        buttonBgColor={layout?.wishlist?.backgroundColor}
        buttonHoverBackgroundColor={layout?.wishlist?.backgroundHoverColor}
        buttonStrokeColor={layout?.wishlist?.iconColor}
        isSingleProduct={true}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-3 my-3">
        {!isEmpty(data?.message) && isEmpty(error?.message) && (
          <p className="text-green-500 font-medium">{data?.message}</p>
        )}
        {!isEmpty(error?.message) && isEmpty(data?.message) && (
          <p className="text-red-600 font-medium">{error?.message}</p>
        )}

        <div className="inline-flex justify-between space-x-2">
          <div className="w-full  bg-brand-primary text-white h-11 rounded-sm flex justify-center items-center p-1 gap-1 uppercase ">
            <EmailIcon fillColor={'rgb(255 255 255)'} /> Email me when available
          </div>
          {store?.wishlist?.enabled && renderWishlistButton()}
        </div>
        <input
          type="text"
          name="subscriber_name"
          value={formData.subscriber_name}
          disabled={loading}
          onChange={handleChange}
          placeholder="Your Name"
          className="border-brand-primary hover:shadow-md rounded-sm focus:ring-brand-primary focus:border-brand-primary focus:outline-none"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled={loading}
          onChange={handleChange}
          placeholder="Email address"
          className="border-brand-primary hover:shadow-md rounded-sm focus:ring-brand-primary focus:border-brand-primary focus:outline-none"
        />

        <button
          type="submit"
          className="border border-[#585858] rounded-sm h-10 uppercase"
          disabled={loading}
        >
          {loading ? 'Loading..' : 'Submit'}
        </button>
      </div>
    </form>
  );
};
