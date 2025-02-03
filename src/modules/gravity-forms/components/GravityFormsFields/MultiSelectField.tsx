import { gql } from '@apollo/client';
import Select, { ActionMeta, OnChangeValue } from 'react-select';

type OptionType = {
  label: string;
  value: string;
};

import { MultiSelectField as MultiSelectFieldType, FieldError } from '../../generated/graphql';
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValues,
} from '../../hooks/useGravityForm';

export const MULTI_SELECT_FIELD_FIELDS = gql`
  fragment MultiSelectFieldFields on MultiSelectField {
    id
    databaseId
    label
    description
    cssClass
    isRequired
    choices {
      text
      value
    }
  }
`;

interface Props {
  field: MultiSelectFieldType;
  fieldErrors: FieldError[];
}

interface Option extends OptionType {
  value: string;
  label: string;
}

const DEFAULT_VALUE: string[] = [];

export default function MultiSelectField({ field, fieldErrors }: Props) {
  const { databaseId, type, label, description, cssClass, isRequired, choices } = field;
  const id = databaseId;
  const htmlId = `field_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: FieldValue) => fieldValue.id === id) as
    | StringFieldValues
    | undefined;
  const values = fieldValue?.values || DEFAULT_VALUE;
  const options = choices?.map((choice) => ({ value: choice?.value, label: choice?.text })) || [];
  const selectedOptions = options.filter((option) => values.includes(String(option?.value)));

  function handleChange(value: OnChangeValue<any, boolean>, actionMeta: ActionMeta<any>) {
    const values = value.map((option: Option) => option.value);
    dispatch({
      type: ACTION_TYPES.updateMultiSelectFieldValue,
      fieldValue: { id: databaseId, values },
    });
  }

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}</label>
      <Select
        isMulti
        name={String(id)}
        inputId={htmlId}
        required={Boolean(isRequired)}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
      />
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p
              key={fieldError.id}
              className="error-message"
            >
              {fieldError.message}
            </p>
          ))
        : null}
    </div>
  );
}
