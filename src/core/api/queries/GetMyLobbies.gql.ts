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
        id
        title
        owner {
          id
          username
          email
        }
        messages {
          id
          owner {
            id
            username
          }
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
