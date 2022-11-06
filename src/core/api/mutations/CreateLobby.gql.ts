import { gql } from '@apollo/client';

export default gql`
mutation CreateLobby($title: String!, $description: String!, $isPrivate: Boolean!) {
  authenticated {
    lobby {
      create(title: $title, description: $description, isPrivate: $isPrivate) {
        id
        owner {
          id
          username
        }
        title
        description
        channels {
          id
          lobby {
            id
            title
            description
            createdAt
            updatedAt
          }
          title
          owner {
            id
            username
            email
            createdAt
            updatedAt
          }
          messages {
            id
            channel {
              id
              title
              createdAt
              updatedAt
            }
            text
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        users {
          id
          username
        }
        createdAt
        updatedAt
      }
    }
  }
}
`;
