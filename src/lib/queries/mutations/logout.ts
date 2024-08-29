import { gql } from '@apollo/client';

export const LOGOUT_MUTATION = gql`
  mutation LogoutMutation($clientMutationId: String!) {
    logout(input: { clientMutationId: $clientMutationId }) {
      clientMutationId
      status
    }
  }
`;
