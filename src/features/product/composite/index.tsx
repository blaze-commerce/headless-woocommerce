import { SelectComponent } from '@src/features/product/composite/select-component';
import { useProductContext } from '@src/context/product-context';

export const CompositeComponents = () => {
  const {
    state: { compositeComponents },
  } = useProductContext();

  if (!compositeComponents) return null;

  return (
    <div>
      {compositeComponents.map((component) => (
        <SelectComponent
          key={component.componentId}
          component={component}
        />
      ))}
    </div>
  );
};
