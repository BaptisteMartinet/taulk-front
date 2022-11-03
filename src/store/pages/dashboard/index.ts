import { observable, action, makeAutoObservable, flow } from 'mobx';
import { Channel, Lobby } from 'core/api/types';
import { GetMyLobbies } from 'core/api/queries';
import apolloClient from 'apollo';
import { ApolloQueryResult } from '@apollo/client';

class DashboardStore {
  lobbies: Lobby[] = [];

  currentLobby: Lobby | null = null;

  currentChannel: Channel | null = null;

  constructor() {
    makeAutoObservable(this, {
      lobbies: observable,
      currentLobby: observable,
      currentChannel: observable,
      setCurrentLobby: action,
      setCurrentChannel: action,
      init: flow,
    });
  }

  setCurrentLobby(id: string): void {
    this.currentLobby = this.lobbies.find((lobby) => (lobby.id === id)) ?? null;
  }

  setCurrentChannel(id: string): void {
    this.currentChannel = this.currentLobby?.channels.find((channel) => (channel.id === id)) ?? null;
  }

  * init(): Generator<Promise<ApolloQueryResult<any>>> {
    const res: any = yield apolloClient.query({ query: GetMyLobbies });
    this.lobbies = res.data.authenticated.myLobbies;
  }
}

export default new DashboardStore();
