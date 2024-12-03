import { Product } from '@src/models/product';

interface ICardItemsLeftBadge {
  product: Product;
  hasItemsLeftBadge: boolean;
  badgeType?: number;
  itemsLeftBadgeColor?: string;
}

export const CardItemsLeftBadge = (props: ICardItemsLeftBadge) => {
  const { product, hasItemsLeftBadge } = props;
  const isOneLeft = product?.stockQuantity === 1;
  return <>{hasItemsLeftBadge && isOneLeft && <div className="badge left-badge">1 LEFT</div>}</>;
};
