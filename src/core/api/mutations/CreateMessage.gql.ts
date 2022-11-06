import { gql } from '@apollo/client';

export default gql`
mutation CreateMessage($channelId: ID!, $text: String!) {
  authenticated {
    message {
      create(channelId: $channelId, text: $text) {
        id
        channel {
          id
          title
          createdAt
          updatedAt
        }
        owner {
          username
        }
        text
        createdAt
        updatedAt
      }
    }
  }
}
`;
