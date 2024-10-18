import RHtmlParser from 'react-html-parser';

type Props = {
  html: string;
};

export const ReactHTMLParser = (props: Props) => {
  return <>{RHtmlParser(props.html)}</>;
};
