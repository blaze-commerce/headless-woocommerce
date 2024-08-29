import { IImage } from '@src/lib/types/Image';

export interface IProduct {
  id: string;
  productId: number;
  averageRating: number;
  slug: string;
  description: string;
  link: string;
  image: IImage;
  name: string;
  price: string;
  regularPrice: string;
  sku: string;
  randKey?: string;
}
