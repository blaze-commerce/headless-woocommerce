import { gql, OperationVariables, useQuery } from '@apollo/client';
import { GravityFormsForm } from '../generated/graphql';

import { client } from '../services/apollo';
import { ADDRESS_FIELD_FIELDS } from '../components/GravityFormsFields/AddressField';
import { CHECKBOX_FIELD_FIELDS } from '../components/GravityFormsFields/CheckboxField';
import { DATE_FIELD_FIELDS } from '../components/GravityFormsFields/DateField';
import { EMAIL_FIELD_FIELDS } from '../components/GravityFormsFields/EmailField';
import { MULTI_SELECT_FIELD_FIELDS } from '../components/GravityFormsFields/MultiSelectField';
import { NAME_FIELD_FIELDS } from '../components/GravityFormsFields/NameField';
import { PHONE_FIELD_FIELDS } from '../components/GravityFormsFields/PhoneField';
import { RADIO_FIELD_FIELDS } from '../components/GravityFormsFields/RadioField';
import { SELECT_FIELD_FIELDS } from '../components/GravityFormsFields/SelectField';
import { TEXT_AREA_FIELD_FIELDS } from '../components/GravityFormsFields/TextAreaField';
import { TEXT_FIELD_FIELDS } from '../components/GravityFormsFields/TextField';
import { TIME_FIELD_FIELDS } from '../components/GravityFormsFields/TimeField';
import { WEBSITE_FIELD_FIELDS } from '../components/GravityFormsFields/WebsiteField';

const GET_FORM = gql`
  query getForm($formId: ID!) {
    gravityFormsForm: gfForm(id: $formId, idType: DATABASE_ID) {
      formId: databaseId
      title
      description
      button: submitButton {
        text
      }
      confirmations {
        isDefault
        message
      }
      formFields(first: 500) {
        nodes {
          id
          type
          ... on AddressField {
            ...AddressFieldFields
          }
          ... on CheckboxField {
            ...CheckboxFieldFields
          }
          ... on DateField {
            ...DateFieldFields
          }
          ... on EmailField {
            ...EmailFieldFields
          }
          ... on MultiSelectField {
            ...MultiSelectFieldFields
          }
          ... on NameField {
            ...NameFieldFields
          }
          ... on PhoneField {
            ...PhoneFieldFields
          }
          ... on RadioField {
            ...RadioFieldFields
          }
          ... on SelectField {
            ...SelectFieldFields
          }
          ... on TextField {
            ...TextFieldFields
          }
          ... on TextAreaField {
            ...TextAreaFieldFields
          }
          ... on TimeField {
            ...TimeFieldFields
          }
          ... on WebsiteField {
            ...WebsiteFieldFields
          }
        }
      }
    }
  }
  ${ADDRESS_FIELD_FIELDS}
  ${CHECKBOX_FIELD_FIELDS}
  ${DATE_FIELD_FIELDS}
  ${EMAIL_FIELD_FIELDS}
  ${MULTI_SELECT_FIELD_FIELDS}
  ${NAME_FIELD_FIELDS}
  ${PHONE_FIELD_FIELDS}
  ${RADIO_FIELD_FIELDS}
  ${SELECT_FIELD_FIELDS}
  ${TEXT_AREA_FIELD_FIELDS}
  ${TEXT_FIELD_FIELDS}
  ${TIME_FIELD_FIELDS}
  ${WEBSITE_FIELD_FIELDS}
`;

export default async function getGravityForm(
  formId: number
): Promise<GravityFormsForm | undefined> {
  const result = await client.query({
    query: GET_FORM,
    variables: { formId },
  });

  return result?.data?.gravityFormsForm;
}

export const useGetForm = (formId: string | number, operations?: OperationVariables) => {
  return useQuery(GET_FORM, {
    ...operations,
    variables: {
      ...operations?.variables,
      formId,
    },
    skip: !formId,
  });
};
