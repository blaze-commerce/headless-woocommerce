import cx from 'classnames';
import { CSSProperties, useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  maxHeight?: number;
  readLessText?: string;
  readMoreText?: string;
};

const defaultProps = {
  readMoreText: 'Read More',
  readLessText: 'Read Less',
};

export const CollapsableReadMore: React.FC<Props> = ({
  children,
  className,
  maxHeight = 150,
  readLessText,
  readMoreText,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const containerClasses = cx(className, 'relative', {
    ['overflow-hidden mb-4']: !collapsed,
    'mb-10': collapsed,
  });

  const containerStyles: CSSProperties = {};
  if (maxHeight && !collapsed) {
    containerStyles.maxHeight = maxHeight;
  }

  const readMoreContainerClasses = cx('absolute inset-0 flex items-end', {
    'bg-gradient-to-t from-white from-0% via-white via-15% bottom-0': !collapsed,
    '-bottom-6': collapsed,
  });

  useEffect(() => {
    if (ref.current?.clientHeight && ref.current?.clientHeight < maxHeight) {
      setIsCollapsible(true);
    }
  }, [maxHeight]);

  return (
    <div
      className={containerClasses}
      style={containerStyles}
      ref={ref}
    >
      <div className="">{children}</div>
      {!isCollapsible && (
        <div className={readMoreContainerClasses}>
          <span
            className="cursor-pointer uppercase"
            onClick={() => setCollapsed(!collapsed)}
          >
            {!collapsed ? `+ ${readMoreText}` : `- ${readLessText}`}
          </span>
        </div>
      )}
    </div>
  );
};

CollapsableReadMore.defaultProps = defaultProps;
