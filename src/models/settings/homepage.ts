import { BlogsFont } from '@src/lib/types/font';

type Card = Partial<{
  marginSize: string;
}>;

type Font = Partial<{
  weight: string;
  size: string;
  color: string;
}>;

type HomepageFont = Partial<{
  featuredCategories: Font;
}>;

type Banner = Partial<{
  fullWidth: boolean;
  marginTop: string;
  topPosition: string;
}>;

type FeaturedProducts = Partial<{
  hasDots: boolean;
  slidesToShow: string;
  mobileSlidesToShow: string;
}>;
type Blogs = Partial<{
  date: BlogsFont &
    Partial<{
      enabled: boolean;
    }>;
  description: BlogsFont &
    Partial<{
      enabled: boolean;
    }>;
  readMore: BlogsFont &
    Partial<{
      enabled: boolean;
      casing: string;
    }>;
  title: BlogsFont &
    Partial<{
      enabled: boolean;
    }>;
}>;
type FeaturedCategories = Partial<{
  shortDescription: Partial<{
    enabled: boolean;
    font: Partial<{
      color: string;
      size: string;
      weight: string;
    }>;
  }>;
  cardLayout: Partial<{
    border: Partial<{
      enabled: boolean;
      color: string;
    }>;
  }>;
  title: Partial<{
    alignText: string;
    font: Partial<{
      color: string;
      weight: string;
      size: string;
    }>;
  }>;
}>;

type MobileBanner = Partial<{
  orientation: string;
}>;

export type Homepage = Partial<{
  layout: Partial<{
    banner: Banner;
    card: Card;
    featuredProducts: FeaturedProducts;
    featuredCategories: FeaturedCategories;
    mobileBanner: MobileBanner;
    blogs: Blogs;
  }>;
  font: HomepageFont;
}>;
