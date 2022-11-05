import { gql } from '@apollo/client';

export default gql`
subscription NewMessage {
  newMessage {
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
`;
