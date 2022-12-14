import { gql } from '@apollo/client';

export default gql`
mutation Register($username: String!, $email: String!, $password: String!) {
  public {
    account {
      register(username: $username, email: $email, password: $password)
    }
  }
}
`;
