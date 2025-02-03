import { useProductContext } from '@src/context/product-context';
import { OUT_OF_STOCK } from '@src/lib/helpers/constants';
import { CompositeProductComponent } from '@src/types';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type Props = {
  component: CompositeProductComponent;
};

export const SelectComponent: React.FC<Props> = ({ component }) => {
  const {
    state: { selectedCompositeComponents },
    actions: { handleOnCompositeComponentSelect },
  } = useProductContext();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleOnCompositeComponentSelect(component.componentId, parseInt(e.target.value), 1);
  };

  return (
    <div
      className="mb-4"
      key={component.componentId}
    >
      <label
        className="block text-sm font-bold mb-1"
        htmlFor={component.slug}
      >
        <ReactHTMLParser html={component.title} />:
      </label>
      <select
        className="w-full border p-2"
        name={component.slug}
        id={component.slug}
        onChange={handleOnChange}
        value={selectedCompositeComponents[component.componentId]?.productId}
      >
        {component.queryOptions.map((option) => {
          const isOutOfStock = option.stockStatus === OUT_OF_STOCK;
          return (
            <option
              key={option.databaseId}
              value={option.databaseId}
              disabled={isOutOfStock}
            >
              {option.name}
              {isOutOfStock && ' (Out of stock)'}
            </option>
          );
        })}
      </select>
    </div>
  );
};
