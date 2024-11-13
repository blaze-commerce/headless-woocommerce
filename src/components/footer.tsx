import FOOTER_DATA from '@public/footer.json';
import { Content } from '@src/components/blocks/content';
import { useSiteContext } from '@src/context/site-context';

export const Footer = () => {
  const { settings } = useSiteContext();
  const { footer } = settings || {};

  const footerStyle = {
    backgroundColor: footer?.customColors?.background?.primary as string,
  };

  return (
    <footer
      className="w-full mx-auto"
      style={footer?.customColors?.enabled ? footerStyle : {}}
    >
      <Content content={FOOTER_DATA} />
      {/* <div className="_6f244f30 _ container mx-auto">
        <div className="_50326875 _ flex flex-wrap gap-y-6 py-8">
          <div className="w-full md:w-3/4 px-3 lg:px-0">Postlist</div>
          <div className="_c947d4f6 _ w-full lg:w-1/4 lg:px-8 border-l">
            <p>sidebar</p>
          </div>
        </div>
      </div> */}
    </footer>
  );
};
