import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import { PageSeo } from '@src/components/page-seo';
import { Banner } from '@src/components/category/banner';
import { CategoryCard } from '@src/components/category/category-card';
import { BreadCrumbs } from '@src/features/product/breadcrumbs';
import { ProductGrid } from '@src/features/product/grids/product-grid';
import { SkeletonCategory } from '@src/components/skeletons/skeleton-category';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';
import { Shop } from '@src/models/settings/shop';
import { Store } from '@src/models/settings/store';
import { NextPageWithLayout } from '@src/pages/_app';
import { ITaxonomyMainPageProps } from '@src/lib/types/taxonomy';

interface Props {
  country: string;
}

export const TaxonomyMainPage: NextPageWithLayout<ITaxonomyMainPageProps, Props> = (props) => {
  const { settings } = useSiteContext();
  const { shop, store } = settings as Settings;
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback && isEmpty(props)) {
    const { layout } = shop as Shop;
    return (
      <div className="container">
        <div className="flex justify-center">
          <div className="h-6 bg-gray-300 animate-pulse rounded-md w-96 mt-3"></div>
        </div>
        <SkeletonCategory
          productColumns={'5'}
          productCount={layout?.productCount}
        />
      </div>
    );
  }

  const renderSeo = () => {
    const { fullHead } = props;
    if (!fullHead) return null;
    return <PageSeo seoFullHead={fullHead} />;
  };

  const renderBreadCrumbs = () => {
    const { breadcrumb = '/' } = store as Store;
    return (
      <BreadCrumbs
        className="flex mb-4 lg:mb-5"
        separator={breadcrumb}
      />
    );
  };

  const renderCategoryCard = () => {
    const { layout } = shop as Shop;
    return (
      <>
        {props.taxonomies?.map((taxonomy) => (
          <CategoryCard
            key={v4()}
            taxonomies={taxonomy}
            {...layout?.productCards}
          />
        ))}
      </>
    );
  };

  return (
    <>
      {renderSeo()}
      <main className="mb-10">
        <Banner {...props.hero} />
        <div className="container lg:px-4">
          {renderBreadCrumbs()}
          <ProductGrid
            productColumns="5"
            className="mb-40"
          >
            {renderCategoryCard()}
          </ProductGrid>
        </div>
      </main>
    </>
  );
};
