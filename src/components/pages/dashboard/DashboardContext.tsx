import React, { FunctionComponent, PropsWithChildren } from 'react';
import { useQuery } from '@apollo/client';
import { Channel, Lobby } from 'core/api/types';
import { GetMyLobbies } from 'core/api/queries';

interface DashboardContextT {
  lobbies: Lobby[]
  currentLobby: Lobby | null
  currentChannel: Channel | null
  handleCurrentLobby: (id: string) => void
  handleCurrentChannel: (id: string) => void
}

const DashboardContext = React.createContext<DashboardContextT>({
  lobbies: [],
  currentLobby: null,
  currentChannel: null,
  handleCurrentLobby: () => { },
  handleCurrentChannel: () => { },
});

export const DashboardContextProvider: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  const [lobbies, setLobbies] = React.useState<Lobby[]>([]);
  const [currentLobby, setCurrentLobby] = React.useState<Lobby | null>(null);
  const [currentChannel, setCurrentChannel] = React.useState<Channel | null>(null);
  const handleCurrentLobby = (id: string): void => {
    const newCurrentLobby = lobbies.find((lobby) => (lobby.id === id));
    if (newCurrentLobby == null) return;
    setCurrentLobby(newCurrentLobby);
    setCurrentChannel(newCurrentLobby.channels.at(0) ?? null);
  };
  const handleCurrentChannel = (id: string): void => {
    if (currentLobby == null) return;
    const newCurrentChannel = currentLobby.channels.find((channel) => (channel.id === id));
    if (newCurrentChannel == null) return;
    setCurrentChannel(newCurrentChannel);
  };
  useQuery(GetMyLobbies, {
    onCompleted: (data) => {
      const fetchedLobbies: Lobby[] = data.authenticated.myLobbies;
      setLobbies(fetchedLobbies);
      setCurrentLobby(fetchedLobbies.at(0) ?? null);
      setCurrentChannel(fetchedLobbies.at(0)?.channels.at(0) ?? null);
    },
  });
  return (
    <DashboardContext.Provider
      value={{
        lobbies,
        currentLobby,
        currentChannel,
        handleCurrentLobby,
        handleCurrentChannel,
      }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
