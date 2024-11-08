import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';

import { AddressInput, EmailInput, NameInput, CheckboxInput } from '../generated/graphql';

export interface FieldValue {
  id: number;
}

export interface AddressFieldValue extends FieldValue {
  addressValues: AddressInput;
}

export interface CheckboxFieldValue extends FieldValue {
  checkboxValues: CheckboxInput[];
}

export interface EmailFieldValue extends FieldValue {
  emailValues: EmailInput;
}

export interface NameFieldValue extends FieldValue {
  nameValues: NameInput;
}

export interface StringFieldValue extends FieldValue {
  value: string;
}

export interface StringFieldValues extends FieldValue {
  values: string[];
}

export type FieldValueUnion =
  | AddressFieldValue
  | CheckboxFieldValue
  | EmailFieldValue
  | NameFieldValue
  | StringFieldValue
  | StringFieldValues;

interface Action {
  type: ACTION_TYPES;
  fieldValue: FieldValueUnion;
}

export enum ACTION_TYPES {
  updateAddressFieldValue = 'updateAddressFieldValue',
  updateCheckboxFieldValue = 'updateCheckboxFieldValue',
  updateDateFieldValue = 'updateDateFieldValue',
  updateEmailFieldValue = 'updateEmailFieldValue',
  updateMultiSelectFieldValue = 'updateMultiSelectFieldValue',
  updateNameFieldValue = 'updateNameFieldValue',
  updatePhoneFieldValue = 'updatePhoneFieldValue',
  updateRadioFieldValue = 'updateRadioFieldValue',
  updateSelectFieldValue = 'updateSelectFieldValue',
  updateTextAreaFieldValue = 'updateTextAreaFieldValue',
  updateTextFieldValue = 'updateTextFieldValue',
  updateTimeFieldValue = 'updateTimeFieldValue',
  updateWebsiteFieldValue = 'updateWebsiteFieldValue',
}

function reducer(state: FieldValueUnion[], action: Action) {
  const getOtherFieldValues = (id: number) => state.filter((fieldValue) => fieldValue.id !== id);

  switch (action.type) {
    case ACTION_TYPES.updateAddressFieldValue: {
      const { id, addressValues } = action.fieldValue as AddressFieldValue;
      return [...getOtherFieldValues(id), { id, addressValues }];
    }
    case ACTION_TYPES.updateCheckboxFieldValue: {
      const { id, checkboxValues } = action.fieldValue as CheckboxFieldValue;
      return [...getOtherFieldValues(id), { id, checkboxValues }];
    }
    case ACTION_TYPES.updateEmailFieldValue: {
      const { id, emailValues } = action.fieldValue as EmailFieldValue;
      return [...getOtherFieldValues(id), { id, emailValues }];
    }
    case ACTION_TYPES.updateMultiSelectFieldValue: {
      const { id, values } = action.fieldValue as StringFieldValues;
      return [...getOtherFieldValues(id), { id, values }];
    }
    case ACTION_TYPES.updateNameFieldValue: {
      const { id, nameValues } = action.fieldValue as NameFieldValue;
      return [...getOtherFieldValues(id), { id, nameValues }];
    }
    case ACTION_TYPES.updateDateFieldValue:
    case ACTION_TYPES.updatePhoneFieldValue:
    case ACTION_TYPES.updateRadioFieldValue:
    case ACTION_TYPES.updateSelectFieldValue:
    case ACTION_TYPES.updateTextAreaFieldValue:
    case ACTION_TYPES.updateTextFieldValue:
    case ACTION_TYPES.updateTimeFieldValue:
    case ACTION_TYPES.updateWebsiteFieldValue: {
      const { id, value } = action.fieldValue as StringFieldValue;
      return [...getOtherFieldValues(id), { id, value }];
    }
    default:
      throw new Error(`Field value update operation not supported: ${action.type}.`);
  }
}

const DEFAULT_STATE: FieldValueUnion[] = [];

const GravityFormContext = createContext<{
  state: FieldValueUnion[];
  dispatch: Dispatch<Action>;
}>({
  state: DEFAULT_STATE,
  dispatch: () => null,
});

export function GravityFormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <GravityFormContext.Provider value={{ state, dispatch }}>
      {children}
    </GravityFormContext.Provider>
  );
}

const useGravityForm = () => useContext(GravityFormContext);

export default useGravityForm;
