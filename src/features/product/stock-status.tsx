import { FaCheckCircle } from 'react-icons/fa';

import { Product } from '@src/models/product';
import { Settings } from '@src/models/settings';

type Props = {
  product: Product;
  settings: Settings;
};

export const StockStatus: React.FC<Props> = ({ product, settings }) => {
  let statusMarkup;

  const getStockQuantityDisplay = () => {
    if (!product?.stockQuantity) return 'In Stock';

    const { stockDisplayFormat } = settings.product?.productDetails || {};
    switch (true) {
      case stockDisplayFormat === 'always':
        return `${product.stockQuantity.toString()} in stock`;
      case stockDisplayFormat === 'low_amount' && product.stockQuantity <= 2:
        return `Only ${product.stockQuantity.toString()} left in stock`;
      default:
        return 'In Stock';
    }
  };

  switch (product?.stockStatus) {
    case 'instock':
      statusMarkup = (
        <span className="instock">
          {settings?.product?.layout?.stockIcon?.enabled && (
            <FaCheckCircle
              className="inline-block mr-2"
              size="18"
            />
          )}
          {getStockQuantityDisplay()}
        </span>
      );
      break;
    case 'outofstock':
      statusMarkup = (
        <strong className="outofstock">
          {settings?.shop?.options?.outOfStockMessage ?? 'OUT OF STOCK'}
        </strong>
      );
      if (product.isNotifyBackorder) {
        statusMarkup = <strong className="outofstock">Available on backorder</strong>;
      }

      if (product.isAllowedBackorder) {
        // Since back order is allowed but we don't have to notify the customer then we return null so that no "Comming Soon" label will show in the frontend
        statusMarkup = null;
      }
      break;
    default:
      break;
  }

  return <div className="stock-status">{statusMarkup}</div>;
};
