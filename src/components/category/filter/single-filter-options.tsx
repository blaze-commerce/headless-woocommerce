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
        className="option"
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
          className={classNames('', {
            hasProduct: (option?.count as number) > 0,
            hasNoProduct: (option?.count as number) === 0,
          })}
          disabled={option?.count === 0 ? true : false}
        />
        <label
          htmlFor={uId}
          className={classNames('', { hasProduct: (option?.count as number) > 0 })}
        >
          <span>{decode(label)}</span>
        </label>
        <span>{`(${option.count})`}</span>
      </div>
    );
  };

  return (
    <>
      <fieldset className="fieldset">
        {options
          ?.sort((a, b) => sortAscending(a.order, b.order))
          ?.slice(0, 5)
          .map((option) => renderOptions(option))}
        {isMoreOptionsOpen &&
          options
            ?.sort((a, b) => sortAscending(a.order, b.order))
            ?.slice(5)
            .map((option) => renderOptions(option))}
      </fieldset>
      {((options as IFilterOptionData[] | undefined)?.length as number) > 5 &&
        !isMoreOptionsOpen && (
          <button
            type="button"
            className="more-options"
            onClick={() => setIsMoreOptionsOpen(true)}
          >
            + {((options as IFilterOptionData[] | undefined)?.length as number) - 5} more
          </button>
        )}
    </>
  );
};
