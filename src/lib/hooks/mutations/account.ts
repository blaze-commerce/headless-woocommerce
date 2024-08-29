import { useMutation } from '@apollo/client';

import { LOGIN_MUTATION } from '@src/lib/queries/mutations/login';
import { LOGOUT_MUTATION } from '@src/lib/queries/mutations/logout';

export const useLoginMutation = () => {
  const [mutation, mutationResults] = useMutation(LOGIN_MUTATION);

  const loginMutation = (username: string, password: string, clientMutationId: string) => {
    return mutation({
      variables: {
        login: username,
        password,
        clientMutationId,
      },
    });
  };

  return { loginMutation, results: mutationResults };
};

export const useLogoutMutation = () => {
  const [mutation, mutationResults] = useMutation(LOGOUT_MUTATION);

  const logoutMutation = (clientMutationId: string) => {
    return mutation({
      variables: {
        clientMutationId,
      },
    });
  };

  return { logoutMutation, results: mutationResults };
};
