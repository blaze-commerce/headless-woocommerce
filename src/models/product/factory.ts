import { Product, ProductTypesenseResponse } from '@src/models/product';

const baseProduct: ProductTypesenseResponse = {
  createdAt: 1440629163,
  description:
    'The perfect way to say thank you, congratulations or even happy birthday is with this wine gift. You can be sure that the recipient will enjoy the thought as much as the gift itself! Test vs\r\n',
  id: '7534',
  name: 'Wine Duo Gift Box Hamper',
  permalink:
    'https://gb-headless-v2.blz.onl/shop/wine-and-champagne/wine-duo-in-gift-box-from-58-00/',
  price: { AUD: 32 },
  regularPrice: { AUD: 32 },
  salePrice: { AUD: 22 },
  seoFullHead:
    '<title></title><meta name="description" content="" /><link rel="canonical" href="https://gb-headless-v2.blz.onl/shop/wine-and-champagne/wine-duo-in-gift-box-from-58-00/" />',
  shortDescription: 'Test short description',
  sku: '3020685',
  slug: 'wine-duo-in-gift-box-from-58-00',
  stockQuantity: 37,
  stockStatus: 'instock',
  thumbnail: {
    altText: '',
    src: 'https://gb-headless-v2.blz.onl/wp-content/uploads/2015/08/Wine-duo-gift-box.jpg',
    id: '123',
  },
  taxonomies: [
    {
      name: 'Birthday Gift Baskets',
      url: 'https://gb-headless-v2.blz.onl/product-category/birthday-gift-baskets/',
      type: 'category',
    },
    {
      name: 'Wine and Champagne Gift Hampers',
      url: 'https://gb-headless-v2.blz.onl/product-category/wine-and-champagne/',
      type: 'category',
    },
    {
      name: 'Wine Hampers',
      url: 'https://gb-headless-v2.blz.onl/favourite/wine-gift-baskets/',
      type: 'favourite',
    },
    {
      name: 'Birthday',
      url: 'https://gb-headless-v2.blz.onl/occasion/birthday-gift-hampers/',
      type: 'occassion',
    },
    {
      name: 'Thank You',
      url: 'https://gb-headless-v2.blz.onl/occasion/thank-you-gift-hampers/',
      type: 'occassion',
    },
    {
      name: 'Gifts Under $100',
      url: 'https://gb-headless-v2.blz.onl/shop-by/gift-hampers-under-100/',
      type: 'shop-by',
    },
  ],
  galleryImages: [
    {
      altText: '',
      src: 'https://gb-headless-v2.blz.onl/wp-content/uploads/2015/08/Golf_nut_LR.jpg',
      id: '123',
    },
    {
      altText: '',
      src: 'https://gb-headless-v2.blz.onl/wp-content/uploads/2021/09/GB22_03_681_LR.jpg',
      id: '123',
    },
    {
      altText: '',
      src: 'https://gb-headless-v2.blz.onl/wp-content/uploads/2021/09/GB22_04_230_LR.jpg',
      id: '123',
    },
  ],
  productType: 'single',
  // variants: [
  //   { label: 'S', value: 'small', attribute: 'size' },
  //   { label: 'M', value: 'medium', attribute: 'size' },
  //   { label: 'L', value: 'large', attribute: 'size' },
  //   { label: '#000080', value: 'navy-blue', attribute: 'color' },
  //   { label: '#ffffff', value: 'white', attribute: 'color' },
  //   { label: '#000000', value: 'black', attribute: 'color' },
  // ]
};

export const ProductFactory = {
  singleProduct: () => {
    return Product.buildFromResponse(baseProduct);
  },
};
