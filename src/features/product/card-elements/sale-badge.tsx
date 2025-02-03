interface ICardSaleBadge {
  badgeType?: number;
  badgeColor?: string;
}

export const CardSaleBadge = (props: ICardSaleBadge) => {
  const { badgeType = 1, badgeColor = '#4A5468' } = props;
  return <div className="badge sale-badge">Sale</div>;
};
