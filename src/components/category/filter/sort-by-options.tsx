import { uniqueId } from 'lodash';
import React from 'react';

import { IFilterOptionData } from '@src/lib/types/taxonomy';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type Props = {
  options?: Array<{
    label: string;
    value: string;
  }> | null;
  state: [
    selected: IFilterOptionData,
    setSelected: React.Dispatch<React.SetStateAction<IFilterOptionData>>
  ];
  onSortChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SortByOptions = (props: Props) => {
  const { options, state, onSortChange } = props;
  const [selected, setSelected] = state;

  const handleRadioSortChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedSort: IFilterOptionData
  ) => {
    setSelected(() => {
      onSortChange(e);
      return selectedSort;
    });

    localStorage.setItem('sortValue', JSON.stringify(selectedSort));
  };

  return (
    <>
      <fieldset className="mb-3 xl:hiddenssss">
        <div className="">
          {options &&
            options.map((option, i) => {
              const uId = uniqueId();

              if (!option.label) {
                return null;
              }

              return (
                <div
                  key={i}
                  className="p-2.5 flex items-center"
                >
                  <input
                    id={uId}
                    name="notification-method"
                    type="radio"
                    defaultChecked={option.value === selected.value}
                    value={option.value}
                    onChange={(e) =>
                      handleRadioSortChange(e, {
                        label: option.label,
                        value: option.value,
                      })
                    }
                    className="h-4 w-4 border-gray-300 text-brand-secondary focus:ring-brand-primary"
                  />
                  <label
                    htmlFor={uId}
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    <ReactHTMLParser html={option.label} />
                  </label>
                </div>
              );
            })}
        </div>
      </fieldset>
    </>
  );
};
