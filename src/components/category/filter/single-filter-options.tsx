import classNames from 'classnames';
import { decode } from 'html-entities';
import { isEmpty } from 'lodash';
import uniqueId from 'lodash/uniqueId';
import { useState } from 'react';
import { v4 } from 'uuid';

import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { sortAscending } from '@src/lib/helpers/helper';
import { IFilterOptionData, IFilterOptionState } from '@src/lib/types/taxonomy';

type Props = {
  name: string;
  options?: Array<IFilterOptionData>;
  disclosureProp: IFilterOptionState;
};

export const SingleFilterOptions = (props: Props) => {
  const taxonomyCtx = useTaxonomyContext();
  const { name, options, disclosureProp } = props;
  const [, , filterValue, setFilterValue] = disclosureProp;
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [, setPreviousSelectedFilterState] = taxonomyCtx.previouslySelectedFilter;

  if (isEmpty(options)) {
    return null;
  }

  const renderOptions = (option: IFilterOptionData) => {
    const uId = uniqueId();
    const label = option.label;

    const onChange = (e: { target: { checked: boolean } }) => {
      setPreviousSelectedFilterState(name);

      if (e.target.checked) {
        setFilterValue({
          label: label,
          value: option.value,
        });
        setChecked(false);
      } else {
        setFilterValue(null);
        setChecked(true);
      }
    };

    return (
      <div
        key={v4()}
        className="relative flex items-start"
      >
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
              filterValue !== null &&
              typeof (filterValue as IFilterOptionData)?.value !== 'undefined' &&
              option.value === (filterValue as IFilterOptionData).value
            }
            defaultChecked={
              filterValue !== null &&
              typeof (filterValue as IFilterOptionData)?.value !== 'undefined' &&
              option.value === (filterValue as IFilterOptionData).value &&
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
              { 'cursor-pointer': (option?.count as number) > 0 }
            )}
          >
            <span>{decode(label)}</span>
            <span>{`(${option.count})`}</span>
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="py-3">
      {options
        ?.sort((a, b) => sortAscending(a.order, b.order))
        ?.slice(0, 5)
        .map((option) => renderOptions(option))}
      {isMoreOptionsOpen &&
        options
          ?.sort((a, b) => sortAscending(a.order, b.order))
          ?.slice(5)
          .map((option) => renderOptions(option))}
      {((options as IFilterOptionData[] | undefined)?.length as number) > 5 &&
        !isMoreOptionsOpen && (
          <button
            type="button"
            className="mt-2.5 text-xs font-normal text-[#0A0A0A]"
            onClick={() => setIsMoreOptionsOpen(true)}
          >
            + {((options as IFilterOptionData[] | undefined)?.length as number) - 5} more
          </button>
        )}
    </div>
  );
};
