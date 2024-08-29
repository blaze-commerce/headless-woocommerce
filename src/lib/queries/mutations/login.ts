import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($login: String!, $password: String!, $clientMutationId: String!) {
    loginWithCookies(
      input: { password: $password, login: $login, clientMutationId: $clientMutationId }
    ) {
      clientMutationId
      email
      user_id
      username
      name
      status
    }
  }
`;
