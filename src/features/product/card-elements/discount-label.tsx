interface ICardDiscountLabel {
  showLabel: boolean;
  discount: number | string;
  backgroundColor?: string;
}

export const CardDiscountLabel = ({ showLabel, discount, backgroundColor }: ICardDiscountLabel) => {
  return (
    <>
      {showLabel && discount && (
        <div className="text-sm text-center z-[7]">
          <span
            className="py-0.5 px-4 rounded-sm"
            style={{ backgroundColor: backgroundColor ?? '#9ca3af' }}
          >
            {discount}% OFF AT THE CHECKOUT
          </span>
        </div>
      )}
    </>
  );
};
