import { Dictionary } from '@reduxjs/toolkit';
import { default as classNames, default as cx } from 'classnames';
import HTMLReactParser from 'html-react-parser';

type Props = {
  classes: string;
  text: string;
  config?: Dictionary<string>;
};

const Wrapper: React.FC<{
  style?: string;
  styleColor?: string;
  children: React.ReactNode;
}> = ({
  style,
  styleColor,
  children,
}: {
  style?: string;
  styleColor?: string;
  children: React.ReactNode;
}) => {
  if (style === 'style-1') {
    return (
      <div className={classNames('relative inline-block', style)}>
        <span style={{ backgroundColor: styleColor }} />
        {children}
        <span style={{ backgroundColor: styleColor }} />
      </div>
    );
  }

  return <div>{children}</div>;
};

export const HtmlContent = ({ classes, text, config }: Props) => {
  if (typeof text === 'undefined') return null;

  const classNames = cx(classes, 'text-block');
  const fontColor = classes?.match(/text-\[(.*)\]/)?.pop();
  const textStyle = {
    color: fontColor ? fontColor : '',
    marginTop: classes?.match(/marginTop-\[(.*)\]/)?.pop(),
  };

  return (
    <div
      className={classNames}
      style={textStyle}
    >
      <Wrapper
        style={config?.style}
        styleColor={config?.styleColor}
      >
        {HTMLReactParser(text)}
      </Wrapper>
    </div>
  );
};
