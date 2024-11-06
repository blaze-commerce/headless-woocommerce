import { gql } from '@apollo/client';

import { NameField as NameFieldType, NameInput, FieldError } from '../../generated/graphql';
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  NameFieldValue,
} from '../../hooks/useGravityForm';

export const NAME_FIELD_FIELDS = gql`
  fragment NameFieldFields on NameField {
    id
    databaseId
    label
    description
    cssClass
    inputs {
      key
      label
      placeholder
      choices {
        text
        value
      }
    }
  }
`;

interface Props {
  field: NameFieldType;
  fieldErrors: FieldError[];
}

const DEFAULT_VALUE: NameInput = {};

const AUTOCOMPLETE_ATTRIBUTES: { [key: string]: string } = {
  prefix: 'honorific-prefix',
  first: 'given-name',
  middle: 'additional-name',
  last: 'family-name',
  suffix: 'honorific-suffix',
};

export default function NameField({ field, fieldErrors }: Props) {
  const { databaseId, type, label, description, cssClass, inputs } = field;
  const id = databaseId;
  const htmlId = `field_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: FieldValue) => fieldValue.id === id) as
    | NameFieldValue
    | undefined;
  const nameValues = fieldValue?.nameValues || DEFAULT_VALUE;

  const prefixInput = inputs?.find((input) => input?.key === 'prefix');
  const otherInputs = inputs?.filter((input) => input?.key !== 'prefix') || [];

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    const newNameValues = { ...nameValues, [name]: value };

    dispatch({
      type: ACTION_TYPES.updateNameFieldValue,
      fieldValue: {
        id,
        nameValues: newNameValues,
      },
    });
  }

  return (
    <fieldset
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
    >
      <legend>{label}</legend>
      {prefixInput ? (
        <>
          <select
            name={String(prefixInput.key)}
            id={`input_${id}_${prefixInput.key}`}
            autoComplete={AUTOCOMPLETE_ATTRIBUTES.prefix}
            value={nameValues.prefix || ''}
            onChange={handleChange}
          >
            <option value=""></option>
            {prefixInput.choices?.map((choice) => (
              <option
                key={choice?.value}
                value={String(choice?.value)}
              >
                {String(choice?.text)}
              </option>
            ))}
          </select>
          <label htmlFor={`input_${id}_${prefixInput.key}`}>{prefixInput.label}</label>
        </>
      ) : null}
      {otherInputs.map((input) => {
        const key = input?.key as keyof NameInput;
        const inputLabel = input?.label || '';
        const placeholder = input?.placeholder || '';
        return (
          <div key={key}>
            <input
              type="text"
              name={String(key)}
              id={`input_${id}_${key}`}
              placeholder={placeholder}
              autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
              value={nameValues?.[key] || ''}
              onChange={handleChange}
            />
            <label htmlFor={`input_${id}_${key}`}>{inputLabel}</label>
          </div>
        );
      })}
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
    </fieldset>
  );
}
