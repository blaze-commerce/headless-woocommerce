import { YotpoReviews, YotpoReviewsUsers } from '@src/lib/types/reviews';

export interface Author {
  email?: string;
}

export interface DatumProduct {
  sku?: string;
  name?: string;
  description?: string;
  link?: string;
  image_url?: string;
  mpn?: string;
  brand?: string;
  category?: string;
  custom?: string;
}

export interface Reply {
  id?: number;
  product_review_id?: number;
  partner_id?: null;
  comments?: string;
  date_created?: Date;
  date_updated?: Date;
  recipient?: null;
  private?: number;
}

export interface Reviewer {
  first_name?: string;
  last_name?: string;
  verified_buyer?: string;
  address?: string;
  profile_picture?: string;
  gravatar?: string;
  name?: string;
}

export type Datum = WoocommerceProductReviews &
  Partial<{
    votes: null;
    flags: null;
    title: string;
    product_review_id: number;
    review: string;
    sku: string;
    rating: number;
    date_created: Date;
    order_id: string;
    reviewer: Reviewer;
    replies: Reply[];
    // TODO: Need to specify type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ratings: any[];
    product: DatumProduct;
    author: string;
    timeago: string;
    id: string;
    body: string;
    verified: string | boolean;
    created_at: string;
    timestamp: Date;
    icon: string;
    response: YotpoReviews;
    score: number;
    content: string;
    verified_buyer: boolean;
    user: YotpoReviewsUsers;
    image?: string[] | null;
    card_style?: string;
    hide_footer?: boolean;
  }>;

export type StarDistribution = {
  [key: string]: number;
};

export type Percentage = {
  [index: number]: Partial<{
    rating: number;
    value: number;
    total: number;
  }>;
};

export type Stats = WooReviewsStats &
  Partial<{
    average: number;
    count: number;
    percentage: Percentage;
    total_reviews: number;
    total_review: number;
    average_score: number;
    product_score: number;
    star_distribution: StarDistribution;
    progress: StarDistribution;
  }>;

export type WooReviewsStats = Partial<{
  average_rating: number;
  count_reviews: number;
  stars_count: number;
}>;

export type ReviewsContent = Partial<{
  author: string;
  body: string;
  icon: string;
  rating: number;
  timestamp: Date;
  title: string;
  verified: boolean;
}>;

export type Reviews = YotpoReviews[] &
  Partial<{
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    data: Datum[];
    id: number;
    externalId: number;
    content: ReviewsContent[];
  }>;

export type WoocommerceProductReviews = Partial<{
  author: string;
  comment_ID: number;
  content: string;
  date: string;
  rating: number;
  vote_down_count: number;
  vote_up_count: number;
}>;

export type ProductReviews = Partial<{
  reviews: Reviews;
  stats: Stats;
}>;

export type StarReviews = {
  filterRating: (_arg: number) => void;
};

export type JudgeMeSettings = Partial<{
  single_review: string;
}>;

export type BusinessReviewsBundleSettings = Partial<{
  collection: string | number;
}>;
