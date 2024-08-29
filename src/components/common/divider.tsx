type Props = {
  className?: string;
};
export const Divider: React.FC<Props> = ({ className }) => {
  return <div className={`border-b ${className}`}></div>;
};
