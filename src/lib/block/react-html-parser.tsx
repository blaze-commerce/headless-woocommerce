import parse from 'html-react-parser';

type Props = {
  html: string;
};

export const ReactHTMLParser = (props: Props) => {
  return <>{parse(props.html)}</>;
};

export const htmlParser = (html: string) => {
  return parse(html);
};
