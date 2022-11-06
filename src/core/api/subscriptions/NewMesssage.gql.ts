import { gql } from '@apollo/client';

export default gql`
subscription NewMessage {
  newMessage {
    id
    channel {
      id
      title
      lobby {
        id
      }
      createdAt
      updatedAt
    }
    owner {
      id
      username
    }
    text
    createdAt
    updatedAt
  }
}
`;
