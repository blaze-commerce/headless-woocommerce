import { useProductContext } from '@src/context/product-context';

export const DiscountRules = () => {
  const { product } = useProductContext();

  if (!product?.discountRules) return null;

  const backgroundColor = product.discountRules.message.badgeBackgroundColor ?? '';
  const textColor = product.discountRules.message.badgeTextColor ?? '';
  const ruleRange = product.discountRules.adjustment.ranges ?? [];

  return (
    <div className="discount-rules">
      {ruleRange.map((range, index) => (
        <div
          key={index}
          className="discount-rule"
          style={{
            backgroundColor,
            color: textColor,
          }}
        >
          <span className="discount-value">
            {range.type === 'percentage' ? `${range.value}%` : range.value} off
          </span>{' '}
          <span className="discount-range">({range.from} items +)</span>
        </div>
      ))}
    </div>
  );
};
