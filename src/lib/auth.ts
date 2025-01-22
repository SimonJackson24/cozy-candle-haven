import { vendureClient } from './vendure';
import { gql } from '@apollo/client';

export const authService = {
  async login(email: string, password: string) {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation Login($email: String!, $password: String!) {
          login(username: $email, password: $password) {
            ... on CurrentUser {
              id
              identifier
            }
          }
        }
      `,
      variables: { email, password },
    });
    return data.login;
  },

  async register(email: string, password: string) {
    const { data } = await vendureClient.mutate({
      mutation: gql`
        mutation Register($email: String!, $password: String!) {
          registerCustomerAccount(
            input: { emailAddress: $email, password: $password }
          ) {
            success
          }
        }
      `,
      variables: { email, password },
    });
    return data.registerCustomerAccount;
  },
};