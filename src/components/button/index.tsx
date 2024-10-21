import cx from 'classnames';
import React, { ReactNode } from 'react';

type ButtonTypes = 'primary' | 'secondary';

type ButtonProps = {
  loading?: boolean;
  onClick?: () => void;
  children: ReactNode;
  full?: boolean;
  type?: ButtonTypes;
};

const defaultProps = {
  loading: false,
  full: false,
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, loading, full, type }) => (
  <button
    className={cx('border rounded p-4 font-medium mt-4', {
      'w-full': full,
      'bg-brand-primary text-white': type === 'primary',
    })}
    onClick={onClick}
  >
    {loading && (
      <svg
        className="animate-spin flex-inline -ml-1 mr-3 h-5 w-5 text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    )}
    {children}
  </button>
);

Button.defaultProps = defaultProps;
