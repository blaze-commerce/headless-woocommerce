import { Accordion } from '@src/components/blocks/generateblocks/accordion';
import { BlockAttributes } from '@src/lib/block/types';
import { BlockComponentProps } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { Hamburger } from '@src/components/blocks/maxmegamenu/hamburger';
import { MiniCart } from '@src/components/blocks/woocommerce/mini-cart';
import { MobileAccordion } from '@src/components/blocks/wooless/mobile-accordion';
import { MobileSearch } from '@src/components/blocks/fibosearch/mobile-search';
import { NewsLetter } from '@src/components/blocks/gravityforms/news-letter';
import { SocialIcon } from '@src/components/blocks/wooless/social-icon';

import { cn } from '@src/lib/helpers/helper';
import { isAccordion, isBlockA, isMobileAccordion } from '@src/lib/block';
import { CustomerAccount } from '@src/components/blocks/woocommerce/customer-account';
import { WishListIconBlock } from '@src/components/blocks/wish-list/wish-list-icon-block';
import { ITaxonomyContentProps } from '@src/lib/types/taxonomy';
import { TaxonomyContext } from '@src/context/taxonomy-context';
import { TaxonomyContent } from '@src/components/content/taxonomy-content';
import uniqid from 'uniqid';
import { ImageGlider } from '@src/components/blocks/wooless/image-glider';
import { BlogPosts } from '@src/components/blocks/wooless/blog-posts';
import { PopoverSearchBlock } from '@src/components/blocks/popover-search';
import { Search } from '@src/components/blocks/fibosearch/search';

export const Container = ({ block }: BlockComponentProps) => {
  // we just make sure that the block name is correct and innterblocks is not empty otherwise
  if ('generateblocks/container' !== block.blockName && !block.innerBlocks) {
    return null;
  }

  if (isBlockA(block, 'categoryProducts')) {
    const contentProps = block.componentProps as ITaxonomyContentProps;
    return (
      <TaxonomyContext
        defaultSortBy={contentProps.defaultSortBy}
        taxonomyFilterOptions={contentProps?.tsFetchedData?.taxonomyFilterOptions ?? []}
        filterOptionContent={contentProps.contents}
        tsFetchedData={contentProps.tsFetchedData}
        subCategories={contentProps.subCategories}
      >
        <TaxonomyContent
          key={uniqid()}
          hero={contentProps.hero}
          categoryName={contentProps.categoryName}
          taxonomyDescription={contentProps.taxonomyDescription}
          tsFetchedData={contentProps.tsFetchedData}
          showPerfectGiftHelper={contentProps.showPerfectGiftHelper}
          defaultSortBy={contentProps.defaultSortBy}
          topDescription={contentProps.topDescription}
          taxonomyData={contentProps.taxonomyData}
          searchQuery={contentProps.searchQuery}
          subCategories={contentProps.subCategories}
          showBreadCrumbs={false}
        />
      </TaxonomyContext>
    );
  }

  if (isMobileAccordion(block)) {
    return <MobileAccordion block={block} />;
  }

  if (isBlockA(block, 'SocialIcon')) {
    return <SocialIcon block={block} />;
  }

  if (isAccordion(block)) {
    return <Accordion block={block} />;
  }

  if (isBlockA(block, 'NewsLetterConfig')) {
    // Gravity form base on NewsLetterConfig block
    return <NewsLetter block={block} />;
  }

  if (isBlockA(block, 'MobileSearchIcon')) {
    return <MobileSearch block={block} />;
  }

  if (isBlockA(block, 'MenuHamburger')) {
    return <Hamburger block={block} />;
  }

  if (isBlockA(block, 'MiniCartIcon')) {
    return (
      <MiniCart
        block={block}
        force
      />
    );
  }

  if (isBlockA(block, 'MyAccountIcon')) {
    return (
      <CustomerAccount
        block={block}
        force
      />
    );
  }

  if (isBlockA(block, 'WishListIcon')) {
    return <WishListIconBlock block={block} />;
  }

  if (isBlockA(block, 'ImageGlider')) {
    return <ImageGlider block={block} />;
  }

  if (isBlockA(block, 'BlogPosts')) {
    return <BlogPosts block={block} />;
  }

  if (isBlockA(block, 'PopoverSearch')) {
    return <PopoverSearchBlock block={block} />;
  }

  if (isBlockA(block, 'Search')) {
    return <Search block={block} />;
  }

  const attribute = block.attrs as BlockAttributes;
  return (
    <div
      className={cn(
        `_${attribute.uniqueId} _${typeof block.id !== 'undefined' ? block.id : ''}`,
        attribute.className
      )}
      style={(attribute.borders as React.CSSProperties) || {}}
    >
      <Content content={block.innerBlocks} />
    </div>
  );
};
