import { Icon } from '@src/components/svg';

export const Camera = ({ strokeColor, className }: Partial<Icon>) => {
  return (
    <svg
      className={`inline ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      />
      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 16.8V9.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 6 5.08 6 6.2 6h1.055c.123 0 .184 0 .24-.006a1 1 0 0 0 .725-.448c.03-.048.058-.103.113-.213.11-.22.165-.33.228-.425a2 2 0 0 1 1.447-.895C10.123 4 10.245 4 10.492 4h3.018c.246 0 .37 0 .482.013a2 2 0 0 1 1.448.895c.063.095.118.205.228.425.055.11.082.165.113.213a1 1 0 0 0 .724.447c.057.007.118.007.241.007H17.8c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 7.52 21 8.08 21 9.2v7.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 20 18.92 20 17.8 20H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 18.48 3 17.92 3 16.8Z"
      />
    </svg>
  );
};
