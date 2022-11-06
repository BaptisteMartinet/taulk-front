import { gql } from '@apollo/client';

export default gql`
mutation CreateChannel($lobbyId: ID!, $title: String!, $isPrivate: Boolean!) {
  authenticated {
    channel {
      create(lobbyId: $lobbyId, title: $title, isPrivate: $isPrivate) {
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
        users {
          id
          username
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
    }
  }
}
`;
