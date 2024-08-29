import parse from 'html-react-parser';

import { Accordion } from '@src/components/accordion';
import { ProductSettings } from '@src/models/settings/product';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';

export const ProductSideTabs = () => {
  const { product } = useProductContext();
  const { settings } = useSiteContext();
  const { layout } = settings?.product as ProductSettings;

  if (!product) return null;

  if (layout?.descriptionTabLocation !== '2') return null;

  const [description, ...otherTabs] = [...(product?.tabs || [])];
  description.isOpen = false;

  const sideTabItems = otherTabs.filter((item) => item.location === 'side');
  if (settings?.product?.descriptionAfterContent) {
    description.content = (
      <>
        {description.content}
        <p className="block h-10"></p>
        {parse(settings?.product?.descriptionAfterContent as string)}
      </>
    );
  }

  return (
    <Accordion
      data={[description, ...sideTabItems]}
      tabTitleStyle={{
        fontWeight: settings?.product?.font?.tabs?.weight,
        fontSize: settings?.product?.font?.tabs?.size,
      }}
      tabsCase={settings?.product?.layout?.tabsCase}
    />
  );
};
