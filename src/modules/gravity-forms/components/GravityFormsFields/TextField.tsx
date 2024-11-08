import { gql } from '@apollo/client';

import { TextField as TextFieldType, FieldError } from '../../generated/graphql';
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from '../../hooks/useGravityForm';

export const TEXT_FIELD_FIELDS = gql`
  fragment TextFieldFields on TextField {
    id
    databaseId
    label
    description
    cssClass
    isRequired
    placeholder
  }
`;

interface Props {
  field: TextFieldType;
  fieldErrors: FieldError[];
}

const DEFAULT_VALUE = '';

export default function TextField({ field, fieldErrors }: Props) {
  const { databaseId, type, label, description, cssClass, isRequired, placeholder } = field;
  const id = databaseId;
  const htmlId = `field_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: FieldValue) => fieldValue.id === id) as
    | StringFieldValue
    | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label htmlFor={htmlId}>{label}</label>
      <input
        type="text"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || ''}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateTextFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          });
        }}
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
