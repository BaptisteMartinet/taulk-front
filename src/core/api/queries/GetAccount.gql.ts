import { gql } from '@apollo/client';

export default gql`
query GetAccount {
  authenticated {
    account {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
`;
