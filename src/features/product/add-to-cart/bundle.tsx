import { useState, useEffect, Dispatch } from 'react';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { useProductBundle } from '@src/lib/hooks/product';
import { ObjectData } from '@src/models/product/types';
import { cn, formatPrice } from '@src/lib/helpers/helper';

type IAddToCartBundle = {
  unavailable: boolean;
  setUnavailable: Dispatch<boolean>;
};

export const AddToCartBundle = ({ unavailable, setUnavailable }: IAddToCartBundle) => {
  const { product, bundle: bundleAction } = useProductContext();
  const { currentCurrency } = useSiteContext();
  const [, setSelectedBundle] = bundleAction.selected;
  const [theBundle, setTheBundle] = useState('front');
  const [unavailableProducts, setUnavailableProducts] = useState<string[]>([]);
  const bundles = useProductBundle(product);
  const bundleData: ObjectData = {};

  useEffect(() => {
    const controller = new AbortController();

    if (!bundles?.products) return;

    if (bundles?.products?.length > 0) {
      bundles.products.forEach((bundle) => {
        if (bundle.product.stockStatus === 'outofstock' && bundle.settings.optional === false) {
          unavailableProducts.push(bundle.settings.title);
        } else {
          bundleData[`bundle_quantity_${bundle.product.bundleId}`] =
            bundle.settings.defaultQuantity;
        }
      });
    }

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!bundles) return;

    const controller = new AbortController();

    let enableAddToCart = true;
    const unavailableProducts: string[] = [];

    if (theBundle === 'front') {
      if (bundles?.products?.length > 0) {
        bundles.products.forEach((bundle) => {
          if (bundle.product.stockStatus === 'outofstock' && bundle.settings.optional === false) {
            enableAddToCart = false;
            unavailableProducts.push(bundle.settings.title);
          } else {
            bundleData[`bundle_quantity_${bundle.product.bundleId}`] =
              bundle.settings.defaultQuantity;
          }
        });
      }

      // front & rear
    } else {
      if (bundles?.products?.length > 0) {
        bundles.products.forEach((bundle) => {
          if (bundle.product.stockStatus === 'outofstock') {
            enableAddToCart = false;
            unavailableProducts.push(bundle.settings.title);
          } else {
            bundleData[`bundle_quantity_${bundle.product.bundleId}`] =
              bundle.settings.defaultQuantity;

            if (bundle.settings.optional)
              bundleData[`bundle_selected_optional_${bundle.product.bundleId}`] = true;
          }
        });
      }
    }

    setUnavailableProducts(unavailableProducts);
    setSelectedBundle(bundleData);

    if (!enableAddToCart) {
      setUnavailable(true);
    } else {
      setUnavailable(false);
    }

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theBundle]);

  if (!product || !product.hasBundle) return null;

  const { price } = product;

  const hasOptional = bundles?.products?.some((bundle) => bundle.settings.optional);

  return (
    <>
      <div className="pb-4">
        {unavailable && (
          <div className="pt-4 text-red-500 text-sm">
            Insufficient stocks → {unavailableProducts.join(', ')}
          </div>
        )}
      </div>
    </>
  );
};
