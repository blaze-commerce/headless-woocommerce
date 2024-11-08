import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import uniqid from 'uniqid';

import { ShopContent } from '@src/components/content/shop-content';
import { SkeletonCategory } from '@src/components/skeletons/skeleton-category';
import { useSiteContext } from '@src/context/site-context';
import { TaxonomyContext } from '@src/context/taxonomy-context';
import { Settings } from '@src/models/settings';
import { Shop } from '@src/models/settings/shop';
import { NextPageWithLayout } from '@src/pages/_app';
import { ITaxonomyContentProps } from '@src/lib/types/taxonomy';
import { SearchAnotherProduct } from '@src/features/product/search-another-product';
import { getCarCategorySlugsFromBreadCrumbs } from '@src/features/product-finder/car-finder';

type Props = {
  country: string;
};

export const ShopPage: NextPageWithLayout<ITaxonomyContentProps, Props> = (props) => {
  const { settings } = useSiteContext();
  const { shop } = settings as Settings;
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
          productColumns={layout?.productColumns}
          productCount={layout?.productCount}
        />
      </div>
    );
  }

  return (
    <TaxonomyContext
      defaultSortBy={props.defaultSortBy}
      taxonomyFilterOptions={props?.tsFetchedData?.taxonomyFilterOptions ?? []}
      filterOptionContent={props.contents}
      tsFetchedData={props.tsFetchedData}
      hero={props.hero}
      subCategories={props.subCategories}
    >
      {!isEmpty(props?.taxonomyData?.breadcrumbs) && (
        <SearchAnotherProduct
          hideSearchButton={true}
          popupIsOpen={true}
          categorySlugs={getCarCategorySlugsFromBreadCrumbs(props.taxonomyData.breadcrumbs)}
        />
      )}
      <ShopContent
        key={uniqid()}
        fullHead={props.fullHead}
        hero={props.hero}
        categoryName={props.categoryName}
        taxonomyDescription={props.taxonomyDescription}
        tsFetchedData={props.tsFetchedData}
        showPerfectGiftHelper={props.showPerfectGiftHelper}
        defaultSortBy={props.defaultSortBy}
        topDescription={props.topDescription}
        taxonomyData={props.taxonomyData}
        searchQuery={props.searchQuery}
        subCategories={props.subCategories}
        showBanner={true}
        pagedUrl={true}
        showBreadCrumbs={true}
      />
    </TaxonomyContext>
  );
};
