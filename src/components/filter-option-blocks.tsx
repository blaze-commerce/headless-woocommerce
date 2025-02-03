import { Fragment } from 'react';
import { AvailabilityFilter } from '@components/blocks/availability-filter';
import { BrandsFilter } from '@components/blocks/brands-filter';
import { CategoryFilter } from '@components/blocks/category-filter';
import { NewProductFilter } from '@components/blocks/new-product-filter';
import { RefinedSelection } from '@components/blocks/refined-selection';
import { SaleProductFilter } from '@components/blocks/sale-product-filter';
import { SubCategoryFilter } from '@components/blocks/sub-category-filter';
import { Text } from '@components/blocks/text';
import { useSiteContext } from '@src/context/site-context';
import { ContentBlock, ContentBlockMetaData } from '@src/types';
import TSProduct from '@src/lib/typesense/product';
import { AttributeFilter } from '@src/components/category/filter/attribute-filter';
import { SubCategoryGroupedFilter } from '@src/components/blocks/sub-category-grouped-filter';
import { isObject } from 'lodash';

type Props = {
  blocks?: ContentBlock[];
  baseCountry: string;
};

export const FilterOptionBlocks = ({ blocks, baseCountry }: Props) => {
  const { currentCountry } = useSiteContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateData = (metaData: ContentBlockMetaData[]): any => {
    return metaData.reduce((carry, currentItem) => {
      const dataToPush = TSProduct.generateMetaDataObject(currentItem, currentCountry, baseCountry);
      carry.push(dataToPush);
      return carry;
    }, []);
  };

  const generateContent = (content: ContentBlock) => {
    let metaData;

    const blockId = content.blockId;

    switch (blockId) {
      case 'text':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return <Text {...metaData} />;
      case 'newFilters':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return <NewProductFilter {...metaData} />;
      case 'saleFilters':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return <SaleProductFilter {...metaData} />;
      case 'categoryFilters':
        metaData = content.metaData.map((meta: ContentBlockMetaData) => {
          return isObject(meta) ? Object.values(meta)[0] : meta;
        });

        return <CategoryFilter filters={metaData} />;
      case 'subCategoryFilters':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return <SubCategoryFilter {...metaData} />;
      case 'subCategoryFiltersGrouped':
        return <SubCategoryGroupedFilter content={content} />;
      case 'brandsFilters':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return <BrandsFilter {...metaData} />;
      case 'availabilityFilters':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return (
          <AvailabilityFilter
            {...metaData}
            enableDisclosure={true}
            defaultShow={true}
          />
        );
      case 'refinedSelection':
        metaData = generateData(content.metaData as ContentBlockMetaData[]);
        return <RefinedSelection filters={metaData} />;
      case 'attributeFilters':
        return <AttributeFilter {...content} />;
      default:
        break;
    }
  };

  if (!blocks) return null;

  return (
    <>
      {blocks.map((block, index) => (
        <Fragment key={`${block.blockId}-${block.position}-${index}`}>
          {generateContent(block)}
        </Fragment>
      ))}
    </>
  );
};
