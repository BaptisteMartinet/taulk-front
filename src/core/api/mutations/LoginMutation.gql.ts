import { gql } from '@apollo/client';

export default gql`
mutation Login($email: String!, $password: String!) {
  public {
    account {
      login(email: $email, password: $password) {
        token
        user {
          id
          username
          email
          createdAt
          updatedAt
        }
      }
    }
  }
}
`;
