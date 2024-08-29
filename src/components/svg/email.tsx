import { COLOR_CLASSES, Icon } from '@components/svg';

export const EmailIcon = ({ fillColor, color, className, strokeColor }: Icon) => {
  return (
    <svg
      className={`inline ${COLOR_CLASSES[color]} ${className}`}
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: fillColor, stroke: strokeColor }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.32776e-05 2.98266C-0.000148898 2.99253 -0.000165246 3.00239 -3.62341e-05 3.01225V15C-3.62341e-05 16.6523 1.34768 18 2.99996 18H19C20.6523 18 22 16.6523 22 15V3.01236C22.0001 3.00242 22.0001 2.99247 21.9999 2.98251C21.9904 1.33822 20.6464 0 19 0H2.99996C1.35346 0 0.00940417 1.3383 1.32776e-05 2.98266ZM2.10654 2.55395C2.27192 2.22692 2.612 2 2.99996 2H19C19.3879 2 19.728 2.22692 19.8934 2.55395L11 8.77934L2.10654 2.55395ZM20 4.92066V15C20 15.5477 19.5477 16 19 16H2.99996C2.45225 16 1.99996 15.5477 1.99996 15V4.92066L10.4265 10.8192C10.7708 11.0603 11.2291 11.0603 11.5734 10.8192L20 4.92066Z"
        style={{ fill: fillColor, stroke: strokeColor }}
      />
    </svg>
  );
};

EmailIcon.defaultProps = {
  color: 'default',
  size: 'sm',
};
