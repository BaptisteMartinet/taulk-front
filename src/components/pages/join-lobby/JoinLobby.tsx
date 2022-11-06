import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { JoinLobby as JoinLobbyMutation } from 'core/api/mutations';

const JoinLobby = (): JSX.Element => {
  const params = useParams();
  const { id: lobbyId } = params;
  const [joinLobby] = useMutation(JoinLobbyMutation, {
    onCompleted: () => {
      window.location.replace('/dashboard');
    },
    onError: () => {
      window.location.replace('/login');
    },
  });
  React.useEffect(() => {
    joinLobby({ variables: { lobbyId } }).catch(() => { });
  }, [lobbyId]);
  return <></>;
};

export default JoinLobby;
