import { ApolloProvider } from '@apollo/client';
import { Meta, StoryFn } from '@storybook/react';

import { ProductCard } from '@src/features/product/cards/product-card';
import { ProductGrid } from '@src/features/product/grids/product-grid';
import { SiteContextProvider } from '@src/context/site-context';
import { client } from '@src/lib/apollo-client';
import { Product, ProductTypesenseResponse } from '@src/models/product';
import { toUnixTimeStamp } from '@src/lib/helpers/date';
import clientMockData from 'src/stories/json/client-mock-data.json';

const productResponse: ProductTypesenseResponse = {
  id: '0',
  name: 'Product Title',
  onSale: false,
  permalink: '',
  price: {
    AUD: 2,
  },
  thumbnail: {
    altText: '',
    src: '',
    title: '',
  },
  regularPrice: {
    AUD: 2,
  },
  salePrice: {
    AUD: 1,
  },
  stockStatus: 'instock',
};

const product = Product.buildFromResponse(productResponse);
const dateNow = new Date();
const publishedAt = toUnixTimeStamp(dateNow);

const birdControlMockData = {
  ...clientMockData['bird-control'],
  product: {
    ...product,
    ...clientMockData['bird-control'].product,
  },
};
const gardenWorldMockData = {
  ...clientMockData['garden-world'],
  product: {
    ...product,
    ...clientMockData['garden-world'].product,
  },
};
const jackieMackMockData = {
  ...clientMockData['jackie-mack-designs'],
  product: {
    ...product,
    ...clientMockData['jackie-mack-designs'].product,
  },
};
const premiumVapeMockData = {
  ...clientMockData['premium-vape'],
  product: {
    ...product,
    ...clientMockData['premium-vape'].product,
  },
};
const redHorseProductsMockData = {
  ...clientMockData['red-horse-products'],
  product: {
    ...product,
    ...clientMockData['red-horse-products'].product,
  },
};
const truckersToyStoreMockData = {
  ...clientMockData['truckers-toy-store'],
  product: {
    ...product,
    ...clientMockData['truckers-toy-store'].product,
  },
};

export default {
  component: ProductCard,
  title: 'Components/Shop/ProductCard',
  args: { product, productColumns: '3' },
  parameters: {
    viewport: {
      defaultViewport: 'lg',
    },
  },
  decorators: [
    (Story) => (
      <ApolloProvider client={client}>
        <SiteContextProvider>
          <Story />
        </SiteContextProvider>
      </ApolloProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof ProductCard> = (args) => (
  <ProductGrid productColumns={args.productColumns}>
    <ProductCard {...args} />
  </ProductGrid>
);

export const Default = Template.bind({});

const WithMultipleProductsTemplate: StoryFn<typeof ProductCard> = (args) => (
  <ProductGrid productColumns={args.productColumns}>
    <ProductCard {...args} />
    <ProductCard {...args} />
    <ProductCard {...args} />
    <ProductCard {...args} />
  </ProductGrid>
);
export const WithMultipleProducts = WithMultipleProductsTemplate.bind({});
WithMultipleProducts.args = { product };

export const WithWishlistButton = Template.bind({});
WithWishlistButton.args = {
  showWishlistButton: true,
};

export const WithRating = Template.bind({});
WithRating.args = {
  showRating: true,
};

export const WithReviewCount = Template.bind({});
WithReviewCount.args = {
  showRating: true,
  showReviewCount: true,
  reviewCount: '1',
};

export const WithAddToCartButton = Template.bind({});
WithAddToCartButton.args = {
  hasAddToCart: true,
};

export const WithOutOfStock = Template.bind({});
WithOutOfStock.args = {
  product: Product.buildFromResponse({
    ...productResponse,
    stockStatus: 'outofstock',
  }),
};

export const WithOnSalePrice = Template.bind({});
WithOnSalePrice.args = {
  product: Product.buildFromResponse({
    ...productResponse,
    onSale: true,
    price: {
      AUD: 3,
    },
    regularPrice: {
      AUD: 2,
    },
    salePrice: {
      AUD: 1,
    },
  }),
};

export const WithNewBadge = Template.bind({});
WithNewBadge.args = {
  product: Product.buildFromResponse({
    ...productResponse,
    publishedAt,
  }),
};

export const WithOneItemLeftBadge = Template.bind({});
WithOneItemLeftBadge.args = {
  product: Product.buildFromResponse({
    ...productResponse,
    stockQuantity: 1,
  }),
  hasItemsLeftBadge: true,
};

export const WithWishlistButtonLowerRight = Template.bind({});
WithWishlistButtonLowerRight.args = {
  product: Product.buildFromResponse({
    ...productResponse,
    stockQuantity: 1,
  }),
  showWishlistButton: true,
  hasItemsLeftBadge: true,
};

export const WithDiscountLabel = Template.bind({});
WithDiscountLabel.args = {
  showDiscountLabel: true,
  discountPercent: '20',
};

export const WithGST = Template.bind({});
WithGST.args = {
  showGST: true,
};

export const WithFromPriceLabel = Template.bind({});
WithFromPriceLabel.args = {
  showFromPrice: true,
};

export const WithAvailableOptions = Template.bind({});
WithAvailableOptions.args = {
  showAvailableOptions: true,
  availableOptionsCount: '2',
};

export const WithHoverImage = Template.bind({});
WithHoverImage.args = {
  product: Product.buildFromResponse({
    ...productResponse,
    thumbnail: {
      altText: '',
      src: 'https://gb-headless-v2.blz.onl/wp-content/uploads/2015/08/Wine-duo-gift-box.jpg',
      title: '',
    },
    galleryImages: [
      {
        altText: '',
        src: 'https://gb-headless-v2.blz.onl/wp-content/uploads/2015/08/Wine_duo_gift_box_LR.jpg',
      },
      {
        altText: '',
        src: 'https://gb-headless-v2.blz.onl/wp-content/uploads/2021/09/GB22_04_213_LR.jpg',
      },
      {
        altText: '',
        src: 'https://gb-headless-v2.blz.onl/wp-content/uploads/2021/09/GB22_04_230_LR.jpg',
      },
    ],
  }),
};

export const WithDetailsAlignedLeft = Template.bind({});
WithDetailsAlignedLeft.args = {
  showRating: true,
  hasAddToCart: true,
  detailsAlignment: 'left',
};

const BirdControlTemplate: StoryFn<typeof ProductCard> = (args) => (
  <div id="bird-control-root">
    <ProductGrid productColumns={args.productColumns}>
      <ProductCard
        {...args}
        product={{ ...args.product, onSale: true } as Product}
      />
      <ProductCard
        {...args}
        product={{ ...args.product, publishedAt } as Product}
      />
      <ProductCard {...args} />
      <ProductCard {...args} />
      <ProductCard {...args} />
      <ProductCard {...args} />
    </ProductGrid>
  </div>
);
export const BirdControlImplementation = BirdControlTemplate.bind({});
BirdControlImplementation.args = {
  ...birdControlMockData,
  product: {
    ...birdControlMockData.product,
  } as Product,
};

const GardenWorldTemplate: StoryFn<typeof ProductCard> = (args) => (
  <div id="garden-world-root">
    <ProductGrid productColumns={args.productColumns}>
      <ProductCard
        {...args}
        product={
          {
            ...args.product,
            name: 'Boy in Love',
            permalink: 'https://gardenworld.com.au/shop/figurines-statues/boy-in-love/',
            thumbnail: {
              ...clientMockData['garden-world'].product.thumbnail,
              src: 'https://gardenworld.com.au/wp-content/uploads/2023/03/TK56551-0-1-245x245.jpg',
            },
            galleryImages: [
              {
                altText: '',
                src: 'https://gardenworld.com.au/wp-content/uploads/2023/03/TK56551-1.jpg',
              },
            ],
          } as Product
        }
      />
      <ProductCard
        {...args}
        product={
          {
            ...args.product,
            name: 'Boy in Love',
            permalink: 'https://gardenworld.com.au/shop/figurines-statues/boy-in-love/',
            thumbnail: {
              ...clientMockData['garden-world'].product.thumbnail,
              src: 'https://gardenworld.com.au/wp-content/uploads/2023/03/TK56551-0-1-245x245.jpg',
            },
            galleryImages: [
              {
                altText: '',
                src: 'https://gardenworld.com.au/wp-content/uploads/2023/03/TK56551-1.jpg',
              },
            ],
            onSale: true,
          } as Product
        }
      />
      <ProductCard
        {...args}
        product={
          {
            ...args.product,
            name: 'Boy in Love',
            permalink: 'https://gardenworld.com.au/shop/figurines-statues/boy-in-love/',
            thumbnail: {
              ...clientMockData['garden-world'].product.thumbnail,
              src: 'https://gardenworld.com.au/wp-content/uploads/2023/03/TK56551-0-1-245x245.jpg',
            },
            galleryImages: [
              {
                altText: '',
                src: 'https://gardenworld.com.au/wp-content/uploads/2023/03/TK56551-1.jpg',
              },
            ],
            publishedAt,
          } as Product
        }
      />
      <ProductCard {...args} />
      <ProductCard {...args} />
      <ProductCard {...args} />
      <ProductCard {...args} />
    </ProductGrid>
  </div>
);
export const GardenWorldImplementation = GardenWorldTemplate.bind({});
GardenWorldImplementation.args = {
  ...gardenWorldMockData,
  product: {
    ...gardenWorldMockData.product,
  } as Product,
};

const JackieMackDesignsTemplate: StoryFn<typeof ProductCard> = (args) => (
  <div id="jackie-mack-root">
    <ProductGrid productColumns={args.productColumns}>
      <ProductCard
        {...args}
        product={
          {
            ...args.product,
            name: 'Bonded Ear Cuff',
            permalink: 'https://www.jackiemackdesigns.com/product/bonded-ear-cuff-silver/',
            thumbnail: {
              ...product.thumbnail,
              src: 'https://cdn.jackiemackdesigns.com/wp-content/uploads/2021/09/bonded-ear-cuff-gold-jackie-mack-designs-s-300x300.jpg',
            },
            galleryImages: [
              {
                altText: '',
                src: 'https://cdn.jackiemackdesigns.com/wp-content/uploads/2021/09/bonded-earrings-gold-celestial-love-jackie-mack-designs-300x300.jpg',
              },
            ],
          } as Product
        }
      />
      <ProductCard
        {...args}
        product={
          {
            ...args.product,
            name: 'Bonded Ear Cuff',
            permalink: 'https://www.jackiemackdesigns.com/product/bonded-ear-cuff-silver/',
            thumbnail: {
              ...product.thumbnail,
              src: 'https://cdn.jackiemackdesigns.com/wp-content/uploads/2021/09/bonded-ear-cuff-gold-jackie-mack-designs-s-300x300.jpg',
            },
            galleryImages: [
              {
                altText: '',
                src: 'https://cdn.jackiemackdesigns.com/wp-content/uploads/2021/09/bonded-earrings-gold-celestial-love-jackie-mack-designs-300x300.jpg',
              },
            ],
            onSale: true,
          } as Product
        }
      />
      <ProductCard
        {...args}
        product={
          {
            ...args.product,
            name: 'Bonded Ear Cuff',
            permalink: 'https://www.jackiemackdesigns.com/product/bonded-ear-cuff-silver/',
            thumbnail: {
              ...product.thumbnail,
              src: 'https://cdn.jackiemackdesigns.com/wp-content/uploads/2021/09/bonded-ear-cuff-gold-jackie-mack-designs-s-300x300.jpg',
            },
            galleryImages: [
              {
                altText: '',
                src: 'https://cdn.jackiemackdesigns.com/wp-content/uploads/2021/09/bonded-earrings-gold-celestial-love-jackie-mack-designs-300x300.jpg',
              },
            ],
            publishedAt,
          } as Product
        }
      />
      <ProductCard
        {...args}
        product={
          {
            ...args.product,
            name: 'Bonded Ear Cuff',
            permalink: 'https://www.jackiemackdesigns.com/product/bonded-ear-cuff-silver/',
            thumbnail: {
              ...product.thumbnail,
              src: 'https://cdn.jackiemackdesigns.com/wp-content/uploads/2021/09/bonded-ear-cuff-gold-jackie-mack-designs-s-300x300.jpg',
            },
            galleryImages: [
              {
                altText: '',
                src: 'https://cdn.jackiemackdesigns.com/wp-content/uploads/2021/09/bonded-earrings-gold-celestial-love-jackie-mack-designs-300x300.jpg',
              },
            ],
            stockQuantity: 1,
          } as Product
        }
      />
      <ProductCard {...args} />
      <ProductCard {...args} />
      <ProductCard {...args} />
    </ProductGrid>
  </div>
);
export const JackieMackDesignsImplementation = JackieMackDesignsTemplate.bind({});
JackieMackDesignsImplementation.args = {
  ...jackieMackMockData,
  product: {
    ...jackieMackMockData.product,
  } as Product,
};

const PremiumVapeTemplate: StoryFn<typeof ProductCard> = (args) => (
  <ProductGrid productColumns={args.productColumns}>
    <ProductCard
      {...args}
      product={
        {
          ...args.product,
          onSale: true,
        } as Product
      }
    />
    <ProductCard
      {...args}
      product={
        {
          ...args.product,
          publishedAt,
        } as Product
      }
    />
    <ProductCard {...args} />
    <ProductCard {...args} />
    <ProductCard {...args} />
    <ProductCard {...args} />
  </ProductGrid>
);
export const PremiumVapeImplementation = PremiumVapeTemplate.bind({});
PremiumVapeImplementation.args = {
  ...premiumVapeMockData,
  product: {
    ...premiumVapeMockData.product,
  } as Product,
};

const RedHorseProductsTemplate: StoryFn<typeof ProductCard> = (args) => (
  <ProductGrid productColumns={args.productColumns}>
    <ProductCard
      {...args}
      product={
        {
          ...args.product,
          onSale: true,
        } as Product
      }
    />
    <ProductCard
      {...args}
      product={
        {
          ...args.product,
          publishedAt,
        } as Product
      }
    />
    <ProductCard {...args} />
    <ProductCard {...args} />
    <ProductCard {...args} />
    <ProductCard {...args} />
  </ProductGrid>
);
export const RedHorseProductsImplementation = RedHorseProductsTemplate.bind({});
RedHorseProductsImplementation.args = {
  ...redHorseProductsMockData,
  product: {
    ...redHorseProductsMockData.product,
  } as Product,
};

const TruckersToyStoreTemplate: StoryFn<typeof ProductCard> = (args) => (
  <div id="truckers-toy-store-root">
    <ProductGrid productColumns={args.productColumns}>
      <ProductCard
        {...args}
        product={
          {
            ...args.product,
            name: 'Nut Cover Screw On 32mm/33mm Chrome Plastic',
            permalink:
              'https://truckerstoystore.com.au/shop/universal/exterior-truck-accessories/nut-covers-wheel-accessories/nut-covers/nut-cover-screw-on-33mm/',
            thumbnail: {
              ...product.thumbnail,
              src: 'https://truckerstoystore.b-cdn.net/wp-content/uploads/2016/02/11175-NUT-COVER-Screw-On-33mm-Truckers-Toy-Store.png.webp',
            },
            galleryImages: [
              {
                altText: '',
                src: 'https://truckerstoystore.b-cdn.net/wp-content/uploads/2016/02/11175-Nut-Cover-Screw-On-32mm33mm-Chrome-PlasticThreadedTruckers-Toy-Store-500x598.png.webp',
              },
            ],
          } as Product
        }
      />
      <ProductCard
        {...args}
        product={
          {
            ...args.product,
            name: 'Nut Cover Screw On 32mm/33mm Chrome Plastic',
            permalink:
              'https://truckerstoystore.com.au/shop/universal/exterior-truck-accessories/nut-covers-wheel-accessories/nut-covers/nut-cover-screw-on-33mm/',
            thumbnail: {
              ...product.thumbnail,
              src: 'https://truckerstoystore.b-cdn.net/wp-content/uploads/2016/02/11175-NUT-COVER-Screw-On-33mm-Truckers-Toy-Store.png.webp',
            },
            galleryImages: [
              {
                altText: '',
                src: 'https://truckerstoystore.b-cdn.net/wp-content/uploads/2016/02/11175-Nut-Cover-Screw-On-32mm33mm-Chrome-PlasticThreadedTruckers-Toy-Store-500x598.png.webp',
              },
            ],
            onSale: true,
          } as Product
        }
      />
      <ProductCard
        {...args}
        product={
          {
            ...args.product,
            name: 'Nut Cover Screw On 32mm/33mm Chrome Plastic',
            permalink:
              'https://truckerstoystore.com.au/shop/universal/exterior-truck-accessories/nut-covers-wheel-accessories/nut-covers/nut-cover-screw-on-33mm/',
            thumbnail: {
              ...product.thumbnail,
              src: 'https://truckerstoystore.b-cdn.net/wp-content/uploads/2016/02/11175-NUT-COVER-Screw-On-33mm-Truckers-Toy-Store.png.webp',
            },
            galleryImages: [
              {
                altText: '',
                src: 'https://truckerstoystore.b-cdn.net/wp-content/uploads/2016/02/11175-Nut-Cover-Screw-On-32mm33mm-Chrome-PlasticThreadedTruckers-Toy-Store-500x598.png.webp',
              },
            ],
            publishedAt,
          } as Product
        }
      />
      <ProductCard {...args} />
      <ProductCard {...args} />
      <ProductCard {...args} />
    </ProductGrid>
  </div>
);
export const TruckersToyStoreImplementation = TruckersToyStoreTemplate.bind({});
TruckersToyStoreImplementation.args = {
  ...truckersToyStoreMockData,
  product: {
    ...truckersToyStoreMockData.product,
  } as Product,
};
