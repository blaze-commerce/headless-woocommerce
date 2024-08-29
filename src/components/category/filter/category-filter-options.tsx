import classNames from 'classnames';
import { decode } from 'html-entities';
import { findIndex, isEmpty, remove, some } from 'lodash';
import uniqueId from 'lodash/uniqueId';
import { useState } from 'react';

import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { IFilterOptionData, IFilterOptionState } from '@src/lib/types/taxonomy';

type Props = {
  name?: string;
  option?: IFilterOptionData;
  disclosureProp: IFilterOptionState;
  title: string;
};

export const CategoryFilterOptions = (props: Props) => {
  const taxonomyCtx = useTaxonomyContext();
  const { name, option, disclosureProp, title } = props;
  const [, , filterValue, setFilterValue] = disclosureProp;
  const [checked, setChecked] = useState(false);
  const [, setPreviousSelectedFilterState] = taxonomyCtx.previouslySelectedFilter;

  if (isEmpty(option)) {
    return null;
  }

  const uId = uniqueId();
  const label = option.label;

  const filterValueIndex = findIndex(filterValue as IFilterOptionData[], { value: option.value });

  const isSameOptionValue = some(filterValue as IFilterOptionData[], { value: option.value });

  const onChange = (e: { target: { checked: boolean } }) => {
    setPreviousSelectedFilterState(title);

    if (e.target.checked) {
      if (!isEmpty(filterValue)) {
        setFilterValue([
          ...(filterValue as IFilterOptionData[]),
          {
            label: label,
            value: option.value,
          },
        ]);
      } else {
        setFilterValue([
          {
            label: label,
            value: option.value,
          },
        ]);
      }

      setChecked(true);
    } else {
      const removedItem = remove(filterValue as IFilterOptionData[], (filterOption) => {
        return option.value !== filterOption.value;
      });

      setFilterValue(removedItem as IFilterOptionData[]);

      setChecked(false);
    }
  };

  return (
    <div className="py-3 relative flex items-start">
      <div
        className="flex h-5 items-center"
        id={option.value}
      >
        <input
          id={uId}
          name={name}
          type="checkbox"
          value={option.value}
          checked={
            !isEmpty(filterValue) &&
            (filterValue as IFilterOptionData[])?.[filterValueIndex]?.value !== null &&
            typeof (filterValue as IFilterOptionData[])?.[filterValueIndex]?.value !==
              'undefined' &&
            (option.value === (filterValue as IFilterOptionData)?.value || isSameOptionValue)
          }
          defaultChecked={
            !isEmpty(filterValue) &&
            (filterValue as IFilterOptionData[])?.[filterValueIndex]?.value !== null &&
            typeof (filterValue as IFilterOptionData[])?.[filterValueIndex]?.value !==
              'undefined' &&
            (option.value === (filterValue as IFilterOptionData)?.value || isSameOptionValue) &&
            checked
          }
          onChange={onChange}
          className={classNames('h-4 w-4 border-gray-300 focus:ring-brand-primary rounded', {
            'cursor-pointer': (option?.count as number) > 0,
            'opacity-50 brightness-90': (option?.count as number) === 0,
          })}
          disabled={option?.count === 0 ? true : false}
        />
      </div>
      <div className="w-full ml-3 text-sm">
        <label
          htmlFor={uId}
          className={classNames(
            'flex items-start justify-between font-normal text-sm text-gray-700',
            {
              'cursor-pointer': (option?.count as number) > 0,
            }
          )}
        >
          <span>{decode(label)}</span>
          <span>{`(${option.count})`}</span>
        </label>
      </div>
    </div>
  );
};
