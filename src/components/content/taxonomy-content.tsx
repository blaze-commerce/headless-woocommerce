import cleanDeep from 'clean-deep';
import { isArray, isEmpty, map } from 'lodash';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useUpdateEffect } from 'usehooks-ts';

import { PageSeo } from '@src/components/page-seo';
import { Banner } from '@src/components/category/banner';
import { Description } from '@src/components/category/description';
import { Filter } from '@src/components/category/filter';
import { ResultCount } from '@src/components/category/filter/result-count';
import { LoadingModal } from '@src/components/common/loading-modal';
import { BreadCrumbs } from '@src/features/product/breadcrumbs';
import { DefaultProductCard as ProductCard } from '@src/features/product/cards/default';
import { SkeletonCategory } from '@src/components/skeletons/skeleton-category';
import { LoadMoreButton } from '@src/components/category/load-more-button';
import { ProductGrid } from '@src/features/product/grids/product-grid';
import { useSiteContext } from '@src/context/site-context';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { Product } from '@src/models/product';
import { Settings } from '@src/models/settings';
import { Shop } from '@src/models/settings/shop';
import { useFetchTsTaxonomyProducts } from '@src/lib/hooks';
import { IFilterOptionData, ITaxonomyContentProps } from '@src/lib/types/taxonomy';
import { ITSPaginationInfo, ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';
import { stripSlashes } from '@src/lib/helpers/helper';
import { getPageParams } from '@src/lib/helpers';
import { transformProductsForDisplay } from '@src/lib/helpers/product';

export const TaxonomyContent = (props: ITaxonomyContentProps) => {
  const { settings } = useSiteContext();
  const { shop } = settings as Settings;

  const { layout } = shop as Shop;
  const { productFilters, productColumns = '3' } = layout;

  const taxonomyCtx = useTaxonomyContext();

  const [, setSlideOverSortByOpen] = taxonomyCtx.slideOverSort;
  const [, , selectedPriceFilter] = taxonomyCtx.priceFilter;
  const [, , selectedBrandsFilter] = taxonomyCtx.brandsFilter;
  const [, , selectedSaleFilter] = taxonomyCtx.saleFilter;
  const [, , selectedNewFilter] = taxonomyCtx.newFilter;
  const [, , selectedCategoryFilter] = taxonomyCtx.categoryFilter;
  const [, , attributeState] = taxonomyCtx.attributeFilter;
  const [, , selectedAvailabilityFilter] = taxonomyCtx.availabilityFilter;
  const [, , selectedRefinedSelection] = taxonomyCtx.refinedSelection;
  const [, setCategoryQueryState] = taxonomyCtx.queryVarsCategoryData;
  const [, setSaleQueryState] = taxonomyCtx.queryVarsSaleData;
  const [, setNewQueryState] = taxonomyCtx.queryVarsNewData;
  const [, setBrandsQueryState] = taxonomyCtx.queryVarsBrandsData;
  const [, setAvailabilityQueryState] = taxonomyCtx.queryVarsAvailabilityData;
  const [, setRefinedSelectionQueryState] = taxonomyCtx.queryVarsRefinedSelectionData;

  const [productsData, setProductsData] = taxonomyCtx.productsResults;

  const [tsPaginationInfo, setTsPaginationInfo] = useState<ITSPaginationInfo>(
    props.tsFetchedData?.pageInfo ?? {}
  );

  const [tsQueryVars, setTsQueryVars] = useState(props.tsFetchedData?.queryVars ?? {});
  const cachedTsQueryVars = useMemo(() => tsQueryVars, [tsQueryVars]);

  const { loading, data, isFetched } = useFetchTsTaxonomyProducts(cachedTsQueryVars);

  const searchQuery = props.searchQuery;
  const showBreadCrumbs = !searchQuery || searchQuery === '*';

  const router = useRouter();
  const pathIndex = router.asPath.split('/');

  const getPathArgs = () => {
    const pathArgs = stripSlashes(router.asPath).split('/');
    const pageParams = getPageParams(pathArgs);
    if (pageParams) {
      // removes the second and the last item in the path args which is 'page', '{pageNumber}'
      pathArgs.splice(-2, 2);
    }

    return { pathArgs, pageParams };
  };

  const updateUrl = (page: number) => {
    if (page != 1 && props.pagedUrl) {
      const { pathArgs } = getPathArgs();
      const newPathArgs = pathArgs.concat(['page', `${page}`]);
      const url = `/${newPathArgs.join('/')}/`;
      window.history.pushState({ page, url, scrollY: window.scrollY }, '', url);
      router.prefetch(url);
    }
  };

  /**
   * After data fetch we append found products if needed
   */
  useUpdateEffect(() => {
    if (typeof data !== 'undefined' && false === loading) {
      setProductsData((prevProducts) => {
        if (tsQueryVars.appendProducts == true) {
          // Append from previous
          return [...prevProducts, ...Product.buildFromResponseArray(data.products)];
        }

        // Return new data
        return Product.buildFromResponseArray(data?.products);
      });
      setTsQueryVars(data?.queryVars);
      setTsPaginationInfo(data?.pageInfo);
      setSlideOverSortByOpen(false);
      setCategoryQueryState(data?.taxonomyFilterOptions);
      setSaleQueryState(data?.saleFilter?.items);
      setNewQueryState(data?.newProductsFilter?.items);
      setBrandsQueryState(data?.brandsFilter);
      setAvailabilityQueryState(data?.availabilityFilter?.items);
      setRefinedSelectionQueryState(data?.refinedSelectionOptions);
    }
  }, [data]);

  useUpdateEffect(() => {
    if (isFetched) {
      updateUrl(tsPaginationInfo.page);
    }
  }, [isFetched, tsPaginationInfo.page]);

  useEffect(() => {
    if (router.query.onsale === 'true') {
      setTsQueryVars((prevProps: ITSTaxonomyProductQueryVars) => {
        const newProps: ITSTaxonomyProductQueryVars = {
          ...prevProps,
          onSale: 'true',
        };
        return newProps;
      });
    }
  }, [router.query.onsale]);

  useEffect(() => {
    if (router.query.featured === 'true') {
      setTsQueryVars((prevProps: ITSTaxonomyProductQueryVars) => {
        const newProps: ITSTaxonomyProductQueryVars = {
          ...prevProps,
          isFeatured: 'true',
        };
        return newProps;
      });
    }
  }, [router.query.featured]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.scrollY && event.state.page) {
        const page = event.state.page;
        if (1 === page) {
          const { pathArgs } = getPathArgs();
          const url = `/${pathArgs.join('/')}/`;
          window.history.replaceState({ url, scrollY: window.scrollY }, '', url);
        }

        window.scrollTo(0, scrollY);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const updateDataOnRouterChange = () => {
    setProductsData(map(props.tsFetchedData.products, Product.buildFromResponse) ?? []);
    setTsPaginationInfo(props.tsFetchedData?.pageInfo ?? {});
    setTsQueryVars(props.tsFetchedData?.queryVars ?? {});
  };
  /**
   * Reset props on url slug change
   */
  useEffect(() => {
    router.events.on('routeChangeComplete', updateDataOnRouterChange);

    return () => {
      router.events.off('routeChangeComplete', updateDataOnRouterChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (typeof data === 'undefined') {
      setCategoryQueryState(props?.tsFetchedData?.taxonomyFilterOptions ?? []);
      setSaleQueryState(props.tsFetchedData?.saleFilter?.items ?? []);
      setNewQueryState(props.tsFetchedData?.newProductsFilter?.items ?? []);
      setBrandsQueryState(props.tsFetchedData?.brandsFilter ?? []);
      setAvailabilityQueryState(props.tsFetchedData?.availabilityFilter?.items ?? []);
      setRefinedSelectionQueryState(props.tsFetchedData?.refinedSelectionOptions ?? []);
    }
  }, [
    data,
    props.tsFetchedData?.availabilityFilter?.items,
    props.tsFetchedData?.brandsFilter,
    props.tsFetchedData?.newProductsFilter?.items,
    props.tsFetchedData?.refinedSelectionOptions,
    props.tsFetchedData?.saleFilter?.items,
    props.tsFetchedData?.taxonomyFilterOptions,
    setAvailabilityQueryState,
    setBrandsQueryState,
    setCategoryQueryState,
    setNewQueryState,
    setRefinedSelectionQueryState,
    setSaleQueryState,
  ]);

  const onSortChange = (e: { target: { value: string } }) => {
    setTsQueryVars((prevProps: ITSTaxonomyProductQueryVars) => {
      const newProps: ITSTaxonomyProductQueryVars = {
        ...prevProps,
        appendProducts: false,
        sortBy: e.target.value,
      };
      return newProps;
    });
  };

  const applyFilter = () => {
    setTsQueryVars((prevProps: ITSTaxonomyProductQueryVars) => {
      const [, , selectedPriceFilter] = taxonomyCtx.priceFilter;
      const [, , selectedBrandsFilter] = taxonomyCtx.brandsFilter;
      const [, , selectedSaleFilter] = taxonomyCtx.saleFilter;
      const [, , selectedNewFilter] = taxonomyCtx.newFilter;
      const [, , selectedCategoryFilter] = taxonomyCtx.categoryFilter;
      const [, , attributeState] = taxonomyCtx.attributeFilter;
      const [, , selectedAvailabilityFilter] = taxonomyCtx.availabilityFilter;
      const [, , selectedRefinedSelection] = taxonomyCtx.refinedSelection;

      const nameTypeArr: string[] = [];
      const childParentArr: string[] = [];
      const newCategoryFilter: string[] = [];
      const newRefinedSelection: string[] = [];
      const newBrandsFilter: string[] = [];

      const newProps: ITSTaxonomyProductQueryVars = {
        ...prevProps,
        page: 1,
        nameAndTypes: nameTypeArr,
        appendProducts: false,
        priceFilter: '',
        childAndParentTerm: childParentArr,
        onSale: null,
        newThreshold: '',
        categoryFilter: '',
        stockStatus: '',
        refinedSelection: '',
        brandsFilter: '',
        attributeFilter: [],
      };

      if (!isEmpty(selectedPriceFilter)) {
        newProps.priceFilter = (selectedPriceFilter as IFilterOptionData).value;
      }

      if (!isEmpty(selectedSaleFilter)) {
        newProps.onSale = (selectedSaleFilter as IFilterOptionData).value;
      }

      if (!isEmpty(selectedNewFilter)) {
        newProps.newThreshold = (selectedNewFilter as IFilterOptionData).value;
      }

      if (!isEmpty(selectedCategoryFilter)) {
        (selectedCategoryFilter as IFilterOptionData[])?.map(
          (categoryFilters: IFilterOptionData) => {
            newCategoryFilter.push(categoryFilters.value);
          }
        );

        newProps.categoryFilter = newCategoryFilter?.join(', ');
      }

      if (!isEmpty(attributeState) && isArray(attributeState)) {
        newProps.attributeFilter = attributeState.map((item) => item.value);
      }

      if (!isEmpty(selectedBrandsFilter)) {
        (selectedBrandsFilter as IFilterOptionData[])?.map((brandsFilters: IFilterOptionData) => {
          newBrandsFilter.push(brandsFilters.value);
        });

        newProps.brandsFilter = newBrandsFilter?.join(', ');
      }

      if (!isEmpty(selectedRefinedSelection)) {
        (selectedRefinedSelection as IFilterOptionData[])?.map(
          (refinedSelection: IFilterOptionData) => {
            newRefinedSelection.push(refinedSelection.value);
          }
        );

        newProps.refinedSelection = newRefinedSelection?.join(', ');
      }

      if (pathIndex[2] === 'new') {
        newProps.newThreshold = settings?.product?.productGallery?.newProductBadgeThreshold;
      }

      if (pathIndex[2] === 'on-sale' || router.query.onsale === 'true') {
        newProps.onSale = 'true';
      }

      if (!isEmpty(selectedAvailabilityFilter)) {
        newProps.stockStatus = (selectedAvailabilityFilter as IFilterOptionData).value;
      }

      return cleanDeep(newProps);
      // return prevProps;
    });
  };

  /**
   * On product filter state change then we apply the filter
   */
  useUpdateEffect(applyFilter, [selectedPriceFilter]);
  useUpdateEffect(applyFilter, [selectedBrandsFilter]);
  useUpdateEffect(applyFilter, [selectedSaleFilter]);
  useUpdateEffect(applyFilter, [selectedNewFilter]);
  useUpdateEffect(applyFilter, [selectedCategoryFilter]);
  useUpdateEffect(applyFilter, [attributeState]);
  useUpdateEffect(applyFilter, [selectedAvailabilityFilter]);
  useUpdateEffect(applyFilter, [selectedRefinedSelection]);

  const loadMoreItems = () => {
    setTsQueryVars((prevProps: ITSTaxonomyProductQueryVars) => {
      if (tsPaginationInfo.nextPage) {
        const newProps: ITSTaxonomyProductQueryVars = {
          ...prevProps,
          page: tsPaginationInfo.nextPage,
          appendProducts: true,
        };

        return newProps;
      }

      return prevProps;
    });
  };

  const bannerStyle = {
    marginTop: shop?.layout?.bannerMarginTop ? `${shop?.layout?.bannerMarginTop}px` : '0px',
  };

  const shoulShowLoadMore = !isEmpty(tsPaginationInfo) && tsPaginationInfo.nextPage > 0;
  return (
    <>
      {props.fullHead && <PageSeo seoFullHead={props.fullHead} />}
      <LoadingModal isOpen={loading} />
      <header>
        <div className="container">
          {props.showBreadCrumbs && showBreadCrumbs && (
            <BreadCrumbs
              className=""
              separator="&gt;"
              crumbs={props?.taxonomyData?.breadcrumbs}
            />
          )}
          {props.showBanner && (
            <Banner
              {...props.hero}
              style={bannerStyle}
            />
          )}
        </div>
      </header>

      <div className="container">
        <Filter
          pageNo={tsPaginationInfo.page}
          productCount={tsPaginationInfo.totalFound}
          applyFilter={applyFilter}
          onSortChange={onSortChange}
        >
          {productsData.length > 0 ? (
            <Fragment>
              <div className="mx-0">
                <ProductGrid productColumns={productColumns}>
                  {transformProductsForDisplay(productsData).map((product, index: number) => (
                    <>
                      <ProductCard
                        key={index}
                        product={product}
                        productFilters={productFilters}
                        productColumns={productColumns}
                        showRating={true}
                        {...layout?.productCards}
                        showWishlistButton={true}
                        saleBadgeColor="#393939"
                        saleBadgeType={4}
                        showCategory={true}
                        hasAddToCart={false}
                      />
                    </>
                  ))}
                </ProductGrid>
              </div>
              {loading && (
                <div className="mx-0">
                  <SkeletonCategory
                    productColumns={productColumns}
                    productCount={layout?.productCount}
                  />
                </div>
              )}

              {shoulShowLoadMore && !loading && <LoadMoreButton loadMoreItems={loadMoreItems} />}
            </Fragment>
          ) : (
            <p>No products found</p>
          )}
          {layout?.productFilters === '2' && (
            <div className="mt-4 flex items-center justify-center">
              <ResultCount
                pageNo={tsPaginationInfo.page}
                productCount={tsPaginationInfo.totalFound}
              />
            </div>
          )}
        </Filter>
        <div className="py-10 category-description">
          <Description description={props.taxonomyDescription} />
        </div>
      </div>
    </>
  );
};
