import dynamic from 'next/dynamic';
import { useSiteContext } from '@src/context/site-context';
import { Stats } from '@src/models/product/reviews';

const DynamicJudgeMeRating = dynamic(
  () =>
    import('@src/features/product/reviews/judgeme/rating').then((module) => module.JudgeMeRating),
  {
    ssr: false,
  }
);

const DynamicYotpoRating = dynamic(
  () => import('@src/features/product/reviews/yotpo/rating').then((module) => module.YotpoRating),
  {
    ssr: false,
  }
);

const DynamicWooCommerceRating = dynamic(
  () =>
    import('@src/features/product/reviews/woocommerce/rating').then(
      (module) => module.WooCommerceRating
    ),
  {
    ssr: false,
  }
);

type StarReviews = {
  filterRating: (_arg: number) => void;
};

export const ReviewSummary = ({
  average = 0,
  count = 0,
  percentage = [],
  progress,
  filterRating,
}: Stats & StarReviews) => {
  const { settings } = useSiteContext();

  if ((average as number) <= 0 && count <= 0) {
    return null;
  }

  return (
    <>
      {settings?.store?.reviewService === 'judge.me' && (
        <DynamicJudgeMeRating
          average={average}
          filterRating={filterRating}
          count={count}
          percentage={percentage}
          progress={progress}
        />
      )}
      {settings?.store?.reviewService === 'yotpo' && (
        <DynamicYotpoRating
          average={average}
          filterRating={filterRating}
          count={count}
          percentage={percentage}
          progress={progress}
        />
      )}
      {settings?.store?.reviewService === 'woocommerce_native_reviews' && (
        <DynamicWooCommerceRating
          average={average}
          filterRating={filterRating}
          count={count}
          percentage={percentage}
          progress={progress}
        />
      )}
    </>
  );
};
