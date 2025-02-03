import { find, isArray, isEmpty, reduce } from 'lodash';

import { BlogPosts } from '@components/blocks/blog-posts';
import { CardGroup } from '@components/blocks/card-group';
import { CardGroupSlider } from '@components/blocks/card-group-slider';
import { CustomerReviews } from '@components/blocks/customer-reviews';
import { EmbedCode } from '@components/blocks/embed-code';
import { List } from '@components/blocks/list';
import { MobileHeroBanner } from '@components/blocks/mobile-hero-banner';
import { MultipleImage } from '@components/blocks/multiple-image';
import { MultipleLinks } from '@components/blocks/multiple-links';
import { SingleImage } from '@components/blocks/single-image';
import { SocialIcons } from '@components/blocks/social-icons';
import { Text } from '@components/blocks/text';
import { useSiteContext } from '@src/context/site-context';
import { Product, ProductTypesenseResponse } from '@models/product';
import { CallToAction } from '@src/components/blocks/call-to-action';
import { FeaturedProducts } from '@src/components/blocks/featured-products';
import { HeroBanner } from '@src/components/blocks/hero-banner';
import { HtmlContent } from '@src/components/blocks/html-content';
import { Testimonial } from '@src/components/blocks/testimonial';
import { VideoBanner } from '@src/components/blocks/video-banner';
import { ContentBlock, ContentBlockMetaData } from '@src/types';
import TSProduct from '@src/lib/typesense/product';

import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import { ParsedBlock as NewParsedBlock } from '@src/components/blocks';
import { CustomerTestimonials } from '@src/components/blocks/customer-testimonials';
type Props = {
  blocks: ContentBlock[];
  baseCountry: string;
  featuredProducts?: ProductTypesenseResponse[];
  otherProducts?: ProductTypesenseResponse[];
  className?: string;
};

export const ContentBlocks = ({
  blocks,
  baseCountry,
  featuredProducts,
  otherProducts,
  className,
}: Props) => {
  const { currentCountry } = useSiteContext();
  const mobileBanner = find(blocks, ['blockId', 'mobileBanner']);
  const hasMobileBanner = !isEmpty(mobileBanner);

  const restructureHomepageContent = (
    homepageData: ParsedBlock[],
    metaDataContent?: ParsedBlock[]
  ) =>
    reduce(
      homepageData,
      (result: ParsedBlock[], block) => {
        if (!isEmpty(metaDataContent)) {
          metaDataContent?.map((content: ParsedBlock) => {
            const hasSameUniqueId =
              (block as NewParsedBlock).attrs.uniqueId ===
              (content as NewParsedBlock)?.attrs?.uniqueId;
            if (hasSameUniqueId) {
              result.push(content as ParsedBlock);
            }
          });
        }
        return result;
      },
      []
    );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateData = (metaData: ContentBlockMetaData[]): any => {
    if (!isArray(metaData)) {
      return [];
    }
    return metaData.reduce((carry, currentItem) => {
      const dataToPush = TSProduct.generateMetaDataObject(currentItem, currentCountry, baseCountry);
      carry.push(dataToPush);
      return carry;
    }, []);
  };
  const generateContent = (content: ContentBlock) => {
    let metaData, parsedContent, metaDataContent;

    switch (content.blockId) {
      case 'textarea':
      case 'text':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return (
          <Text
            {...metaData}
            config={content.config}
          />
        );
      case 'singleImage':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return <SingleImage {...metaData} />;
      case 'callToAction':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return <CallToAction {...metaData} />;
      case 'banner':
        metaData = generateData(content.metaData as ContentBlockMetaData[]);
        return (
          <HeroBanner
            banners={metaData}
            config={content.config}
            hasMobileBanner={hasMobileBanner}
          />
        );
      // case 'customBanner':
      //   metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
      //   return <CustomBanner {...metaData} />;
      case 'cardGroupSlider':
      case 'cardGroupSliderPagination':
      case 'cardGroupSliderBorder':
        metaData = generateData(content.metaData as ContentBlockMetaData[]);
        return (
          <CardGroupSlider
            cards={metaData}
            config={content.config}
            blockId={content.blockId}
          />
        );
      case 'cardGroup':
      case 'cardGroupCentered':
      case 'categories':
      case 'brands':
        metaData = generateData(content.metaData as ContentBlockMetaData[]);
        return (
          <CardGroup
            cards={metaData}
            config={content.config}
            blockId={content.blockId}
          />
        );
      case 'testimonials':
        metaData = generateData(content.metaData as ContentBlockMetaData[]);
        return <Testimonial testimonials={metaData} />;
      case 'list':
        metaData = generateData(content.metaData as ContentBlockMetaData[]);
        return (
          <List
            list={metaData}
            config={content.config}
          />
        );
      case 'products':
        if (!featuredProducts) return null;
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return (
          <FeaturedProducts
            // @ts-ignore
            products={featuredProducts.map((product) => Product.buildFromResponse(product))}
            config={content.config}
            classes={metaData.classes}
          />
        );
      case 'otherProducts':
        if (!otherProducts) return null;
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return (
          <FeaturedProducts
            // @ts-ignore
            products={otherProducts.map((product) => Product.buildFromResponse(product))}
            config={content.config}
            classes={metaData.classes}
          />
        );
      case 'multipleImage':
        metaData = generateData(content.metaData as ContentBlockMetaData[]);
        return (
          <MultipleImage
            images={metaData}
            config={content.config}
          />
        );
      case 'customerReviews':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return <CustomerReviews {...metaData} />;
      case 'blogPosts':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return <BlogPosts {...metaData} />;
      case 'mobileBanner':
        metaData = generateData(content.metaData as ContentBlockMetaData[]);
        return <MobileHeroBanner banners={metaData} />;
      case 'embedCode':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return <EmbedCode {...metaData} />;
      case 'socialIcons':
        metaData = generateData(content.metaData as ContentBlockMetaData[]);
        return <SocialIcons items={metaData} />;
      case 'multipleLinks':
        metaData = generateData(content.metaData as ContentBlockMetaData[]);
        return <MultipleLinks links={metaData} />;
      case 'videoBanner':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return <VideoBanner {...metaData} />;
      case 'htmlContent':
        metaData = TSProduct.generateMetaDataObject(content.metaData, currentCountry, baseCountry);
        return (
          <HtmlContent
            {...metaData}
            config={content.config}
          />
        );
      case 'customerTestimonials':
        metaData = generateData(content.metaData as ContentBlockMetaData[]);
        return <CustomerTestimonials testimonials={metaData} />;
      default:
        break;
    }
  };

  if (!blocks) return null;

  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <div
          key={`${block.blockId}-${block.position}-${index}`}
          className={block?.config?.rowClass}
        >
          {generateContent(block)}
        </div>
      ))}
    </div>
  );
};
