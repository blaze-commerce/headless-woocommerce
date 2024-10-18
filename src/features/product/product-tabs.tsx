import dynamic from 'next/dynamic';
import { isArray } from 'lodash';

import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { ACCORDION_TYPE } from '@src/lib/helpers/constants';
import { ProductSettings } from '@src/models/settings/product';
import { useReviewsCount } from '@src/lib/hooks';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

const Accordion = dynamic(() => import('@src/components/accordion').then((mod) => mod.Accordion));

const Tabs = dynamic(() => import('@src/components/tabs').then((mod) => mod.Tabs));

const Review = dynamic(() => import('@src/features/product/reviews'));

type TProductTabs = {
  style?: 'accordion' | 'tabs';
};

export const ProductTabs = ({ style }: TProductTabs) => {
  const { product, additionalData } = useProductContext();
  const { settings } = useSiteContext();
  const { layout } = settings?.product as ProductSettings;

  const reviewsCount = useReviewsCount();

  if (!product) return null;

  if (layout?.descriptionTabLocation !== '1') return null;

  const [description, ...otherTabs] = [...(product?.tabs || [])];

  const defaultTabItems = otherTabs.filter(
    (item) => item.location === 'default' || item.location === ''
  );

  const reviewsTab = {
    title: 'Customer Reviews',
    content: (
      <Review
        product={product}
        sku={product?.sku as string}
      />
    ),
    isOpen: reviewsCount > 0 ? true : false,
  };

  if (settings?.product?.descriptionAfterContent) {
    description.content = (
      <>
        {description.content}
        <p className="block h-10"></p>
        <ReactHTMLParser html={settings?.product?.descriptionAfterContent as string} />
      </>
    );
  }

  const tabData = [];

  if (layout?.descriptionTabLocation === '1') {
    tabData.push(description);
  }

  // implement additionalTabs from product
  if (isArray(product.additionalTabs) && product.additionalTabs?.length > 0) {
    tabData.push(
      ...product.additionalTabs.map((tab) => {
        return {
          title: tab.title,
          content: <ReactHTMLParser html={tab.content as string} />,
          isOpen: false,
        };
      })
    );
  }

  if (additionalData?.review?.hideReviewTab === false) {
    if (reviewsCount > 0) {
      tabData.push(reviewsTab);
    } else if (settings?.store?.reviewService === 'woocommerce_native_reviews') {
      tabData.push(reviewsTab);
    }
  }

  switch (style) {
    case ACCORDION_TYPE:
      return (
        <Accordion
          data={tabData}
          tabTitleStyle={{
            fontWeight: settings?.product?.font?.tabs?.weight,
            fontSize: settings?.product?.font?.tabs?.size,
          }}
          titleClassname="text-base md:text-2xl"
          contentClassname="text-sm md:text-lg"
          tabsCase={settings?.product?.layout?.tabsCase}
        />
      );

    default:
      return <Tabs data={tabData} />;
  }
};

ProductTabs.defaultProps = {
  style: 'accordion',
};
