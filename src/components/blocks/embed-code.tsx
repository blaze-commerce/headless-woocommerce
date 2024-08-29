import HTMLReactParser from 'html-react-parser';

type Props = {
  text?: string;
};

export const EmbedCode = ({ text }: Props) => {
  if (!text) return null;

  return (
    <div className="footer-embed-code w-[calc(100vw-40px)] md:w-full">{HTMLReactParser(text)}</div>
  );
};
