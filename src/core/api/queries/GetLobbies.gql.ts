import { gql } from '@apollo/client';

export default gql`
query Lobbies {
  public {
    lobbies {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
}
`;
