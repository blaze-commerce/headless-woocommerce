import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { cn } from '@src/lib/helpers/helper';
import dynamic from 'next/dynamic';

import { EmailIcon } from '@src/components/svg/email';
import { useSiteContext } from '@src/context/site-context';
import { Product } from '@src/models/product';
import { ProductSettings } from '@src/models/settings/product';
import { ProductNotifierProps } from '@src/pages/api/instocknotifier/subscribe';
import { useProductNotifier } from '@src/lib/hooks';

const WishlistButton = dynamic(() =>
  import('@src/features/wish-list/wish-list-button').then((mod) => mod.WishListButton)
);

type Props = {
  product: Product;
};

export const NotifyMeWhenAvailable = (props: Props) => {
  const { settings } = useSiteContext();
  const { product } = props;
  const { layout } = settings?.product as ProductSettings;
  const isAddToWishlistEnabled = false;

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

  return (
    <form
      onSubmit={handleSubmit}
      className="button-container notify-me-form"
    >
      <div className="button-wrapper">
        {!isEmpty(data?.message) && isEmpty(error?.message) && (
          <p className="text-green-500 font-medium">{data?.message}</p>
        )}
        {!isEmpty(error?.message) && isEmpty(data?.message) && (
          <p className="text-red-600 font-medium">{error?.message}</p>
        )}

        <div className="header">
          <div className="notify-me-title">
            Email me when available <EmailIcon fillColor={'rgb(255 255 255)'} />
          </div>
          {isAddToWishlistEnabled && (
            <WishlistButton
              action="add"
              showIcon={true}
              product={product}
              classNames={cn('wishlist-button', {
                'rounded-sm': layout?.wishlist?.buttonType === '1',
                'rounded-full border': layout?.wishlist?.buttonType === '2',
                'shadow-[0_4px_8px_rgba(0,0,0,0.1)]': layout?.wishlist?.buttonType === '2',
              })}
              buttonBgColor={'#fff'}
              buttonHoverBackgroundColor={settings?.wishlistColor.hoverBackground}
              buttonStrokeColor={settings?.wishlistColor.iconStroke}
              buttonFillColor={settings?.wishlistColor.iconFill}
              isSingleProduct={true}
            />
          )}
        </div>
        <input
          type="text"
          name="subscriber_name"
          value={formData.subscriber_name}
          disabled={loading}
          onChange={handleChange}
          placeholder="Your Name"
          className="input-field"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled={loading}
          onChange={handleChange}
          placeholder="Email address"
          className="input-field"
        />

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Loading..' : 'Submit'}
        </button>
      </div>
    </form>
  );
};
