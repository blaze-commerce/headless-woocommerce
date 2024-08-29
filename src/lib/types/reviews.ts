export interface ReviewFormProps {
  id: number | string | null;
  name: string;
  nameFormat: string;
  email: string;
  rating: number;
  title: string;
  body: string;
  productUrl?: string;
  productTitle?: string;
}

export interface YotpoReviewsUsers {
  user_id?: number;
  social_image?: string | null;
  user_type?: string;
  is_social_connected?: number;
  display_name?: string;
}

export interface YotpoReviews {
  score?: number;
  content?: string;
  title?: string;
  // created_at?: '2023-06-12T10:15:33.000Z';
  verified_buyer?: boolean;
  sentiment?: number;
  user?: YotpoReviewsUsers;
  product_thumbnail_src?: string;
  product_name?: string;
  product_permalink?: string;
}
