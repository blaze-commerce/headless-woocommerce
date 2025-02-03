import { cn } from '@src/lib/helpers/helper';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import React from 'react';

type Props = {
  label: string;
  name: string;
  value: string;
  inline?: boolean;
  onChange?: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'normal' | 'floating';
};

const defaultProps = {
  inline: false,
  value: '',
  onChange: undefined,
};

export const Input: React.FC<Props> = ({
  label,
  name,
  inline,
  type = 'floating',
  value,
  onChange,
}) => {
  const labelClasses = cx('absolute transition-all duration-75 ease-linear', {
    'top-2 left-2 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-xs': isEmpty(value),
    '-top-4 left-0 text-xs': !isEmpty(value),
  });

  const isNormal = type === 'normal';
  const isFloating = type === 'floating';

  return (
    <div
      className={cn('relative flex', {
        'flex-col': !inline,
      })}
    >
      <input
        className="border p-2 peer w-full h-10 px-4 py-2 bg-white rounded-md borde"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={isNormal ? label : undefined}
      />
      {isFloating && (
        <label
          className={labelClasses}
          htmlFor={name}
        >
          {label}
        </label>
      )}
    </div>
  );
};

Input.defaultProps = defaultProps;
