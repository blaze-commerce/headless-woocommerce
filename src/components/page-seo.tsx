import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { decode } from 'html-entities';
import Head from 'next/head';

// TODO:
// move this to a dedictated helper file
// apply actual seo implementation
export function seoUrlParser(data: string) {
  data = data.replace(
    new RegExp(process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL, 'g'),
    process.env.NEXT_PUBLIC_LIVE_URL
  );
  return data;
}

type Props = {
  seoFullHead: string;
};

export const PageSeo = ({ seoFullHead }: Props) => {
  return (
    <Head>
      <ReactHTMLParser html={seoUrlParser(decode(seoFullHead))} />
    </Head>
  );
};
