import { gql } from '@apollo/client';

export default gql`
mutation JoinLobby($lobbyId: ID) {
  authenticated {
    lobby(id: $lobbyId) {
      join
    }
  }
}
`;
