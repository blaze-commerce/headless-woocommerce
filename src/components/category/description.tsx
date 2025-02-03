import { useState } from 'react';
import nl2br from 'react-nl2br';

import { seoUrlParser } from '@src/components/page-seo';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type Props = {
  description?: string | null | undefined;
};

export const Description = ({ description }: Props) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <>
      {description && (
        <>
          <div
            className={`space-y-10 mx-5 xl:mx-0 text-base font-normal text-[#585858] ${
              readMore === false ? '' : 'line-clamp-5'
            }`}
          >
            {nl2br(<ReactHTMLParser html={seoUrlParser(description)} />)}
          </div>
          <button
            className={`text-sm border border-brand-primary uppercase text-brand-primary font-semibold py-2 px-4 hover:bg-brand-primary hover:text-white object-right ${
              readMore === false ? 'hidden' : ''
            }`}
            onClick={() => setReadMore((prev) => !prev)}
          >
            Read more...
          </button>
        </>
      )}
    </>
  );
};
