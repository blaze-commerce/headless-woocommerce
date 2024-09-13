import SINGLEPRODUCT_TEMPLATE from '@public/single-product.json';
import Head from 'next/head';

import { PageSeo } from '@src/components/page-seo';
import { useProductContext } from '@src/context/product-context';
import { Content } from '@src/components/blocks/content';

export const Product = () => {
  const { product } = useProductContext();

  if (!product) return null;

  return (
    <>
      {product.seoFullHead ? (
        <PageSeo seoFullHead={product.seoFullHead} />
      ) : (
        <Head>
          <title>{product.name}</title>
          <meta
            name="description"
            content={product.description}
          />
        </Head>
      )}

      <Content content={SINGLEPRODUCT_TEMPLATE} />
    </>
  );
};
