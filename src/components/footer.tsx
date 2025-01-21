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
    </footer>
  );
};
