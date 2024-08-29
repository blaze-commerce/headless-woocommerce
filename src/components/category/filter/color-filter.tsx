import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { cn } from '@src/lib/helpers/helper';
import { IFilterOptionData } from '@src/lib/types/taxonomy';
import { isArray } from 'lodash';

export const ColorFilter = (props: IFilterOptionData) => {
  const { label, count, value, type, slug, componentType, componentValue } = props;

  const taxonomyCtx = useTaxonomyContext();
  const [, , attributeState, setAttributeState] = taxonomyCtx.attributeFilter;

  if (componentType !== 'color' || (count && count <= 0)) {
    return null;
  }
  const id = `${type}-${slug}`;

  const defaultChecked = isArray(attributeState)
    ? attributeState.some((selectedAttribute) => selectedAttribute.value === value)
    : false;

  const onChange = (e: { target: { checked: boolean } }) => {
    const shouldAdd = e.target.checked;
    setAttributeState((prev) => {
      if (isArray(prev)) {
        const inState = prev.some((item) => item.value === value);

        // if Not in state but checkbox is Checked - then we have to add the selected filter in the state
        if (!inState && shouldAdd) {
          return [...prev, { label, value }];
        }

        // if in state and checkox is unchecked - then we have to remove it on the previous state data
        if (inState && !shouldAdd) {
          return prev.filter((item) => item.value !== value);
        }
      }

      return prev;
    });
  };

  return (
    <div className="py-3 relative flex items-center">
      <div className="flex items-center">
        <input
          id={id}
          name="comments"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-brand-primary"
          style={{
            backgroundColor: componentValue,
          }}
          value={value}
          onChange={onChange}
          defaultChecked={defaultChecked}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label
          htmlFor={id}
          className={cn('flex items-start justify-between font-normal text-sm text-gray-700')}
        >
          {label} ({count})
        </label>
      </div>
    </div>
  );
};
