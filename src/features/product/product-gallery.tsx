import { Gallery } from '@src/features/product/gallery';
import { useSiteContext } from '@src/context/site-context';
import { useProductContext } from '@src/context/product-context';
import { Settings } from '@src/models/settings';
import { ProductSettings } from '@src/models/settings/product';
import { Shop, ProductCards } from '@src/models/settings/shop';
import { toDateTime, isWithInMonthsAgo } from '@src/lib/helpers/date';

type TProps = {
  className?: string;
  id?: string;
};

export const ProductGallery = ({ className, id }: TProps) => {
  const { product } = useProductContext();
  const { settings } = useSiteContext();

  if (!product) return null;

  const { productGallery } = (settings as Settings).product as ProductSettings;
  const { shop } = settings as Settings;
  const { layout } = shop as Shop;
  const { productCards } = layout;
  const {
    badgeType = 1,
    saleBadgeColor = '#4A5468',
    newBadgeColor = '#4A5468',
  } = productCards as ProductCards;
  const newBadgeThreshold = +productGallery.newProductBadgeThreshold / 30;
  const publishedDate = toDateTime(product.publishedAt as number);
  const isTwoMonthsAgo = isWithInMonthsAgo(publishedDate, newBadgeThreshold);

  return (
    <Gallery
      id={id}
      className={className}
      images={product.galleryImages}
      onSale={product.onSale}
      isNew={isTwoMonthsAgo}
      isGrid={productGallery?.isGrid}
      zoomType={productGallery?.zoomType}
      badgeType={badgeType}
      saleBadgeColor={saleBadgeColor}
      newBadgeColor={newBadgeColor}
    />
  );
};
