import { FormField, FieldError } from '../generated/graphql';
import AddressField from './GravityFormsFields/AddressField';
import CheckboxField from './GravityFormsFields/CheckboxField';
import DateField from './GravityFormsFields/DateField';
import EmailField from './GravityFormsFields/EmailField';
import MultiSelectField from './GravityFormsFields/MultiSelectField';
import NameField from './GravityFormsFields/NameField';
import PhoneField from './GravityFormsFields/PhoneField';
import RadioField from './GravityFormsFields/RadioField';
import SelectField from './GravityFormsFields/SelectField';
import TextField from './GravityFormsFields/TextField';
import TextAreaField from './GravityFormsFields/TextAreaField';
import TimeField from './GravityFormsFields/TimeField';
import WebsiteField from './GravityFormsFields/WebsiteField';

interface Props {
  field: FormField;
  fieldErrors: FieldError[];
}

export default function GravityFormsField({ field, fieldErrors }: Props) {
  switch (field.type) {
    case 'address':
    case 'ADDRESS':
      return (
        <AddressField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    case 'checkbox':
    case 'CHECKOUTBOX':
      return (
        <CheckboxField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    case 'date':
    case 'DATE':
      return (
        <DateField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    case 'email':
    case 'EMAIL':
      return (
        <EmailField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    case 'multiselect':
    case 'MULTISELECT':
      return (
        <MultiSelectField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    case 'name':
    case 'NAME':
      return (
        <NameField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    case 'phone':
    case 'PHONE':
      return (
        <PhoneField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    case 'radio':
    case 'RADIO':
      return (
        <RadioField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    case 'select':
    case 'SELECT':
      return (
        <SelectField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    case 'text':
    case 'TEXT':
      return (
        <TextField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    case 'textarea':
    case 'TEXTAREA':
      return (
        <TextAreaField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    case 'time':
    case 'TIME':
      return (
        <TimeField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    case 'website':
    case 'WEBSITE':
      return (
        <WebsiteField
          field={field}
          fieldErrors={fieldErrors}
        />
      );
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>;
  }
}
