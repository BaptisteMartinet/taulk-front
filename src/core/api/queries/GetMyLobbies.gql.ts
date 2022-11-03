import { gql } from '@apollo/client';

export default gql`
query GetMyLobbies {
  authenticated {
    myLobbies {
      id
      owner {
        username
      }
      title
      description
      channels {
        title
        owner {
          id
          username
          email
        }
        messages {
          id
          text
          createdAt
        }
      }
      users {
        username
      }
    }
  }
}
`;
