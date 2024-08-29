import { useSiteContext } from '@src/context/site-context';
import { cn } from '@src/lib/helpers/helper';
import parse from 'html-react-parser';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PostHit = ({ hit }: any) => {
  const { settings } = useSiteContext();
  return (
    // TODO: Add seoUrlParser
    <a href={hit.permalink}>
      <div className="group flex justify-start items-center py-1 cursor-pointer mb-2.5 hover:bg-[#F2F2F2]">
        <p
          className={cn({
            'text-[#585858]': !settings?.search?.results?.customColors?.enabled,
            'text-sm': !settings?.search?.results?.texts?.font?.size,
            'font-normal': !settings?.search?.results?.texts?.font?.weight,
          })}
          style={{
            color: settings?.search?.results?.customColors?.color ?? '',
            fontSize: settings?.search?.results?.texts?.font?.size ?? '',
            fontWeight: settings?.search?.results?.texts?.font?.weight ?? '',
          }}
        >
          {parse(hit.name)}
        </p>
      </div>
    </a>
  );
};
