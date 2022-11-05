import apolloClient from 'apollo';
import { observable, action, makeAutoObservable, flow } from 'mobx';
import { Channel, Lobby } from 'core/api/types';
import { GetMyLobbies } from 'core/api/queries';
import { NewMesssage } from 'core/api/subscriptions';

class DashboardStore {
  lobbies: Lobby[] | null = null;

  currentLobby: Lobby | null = null;

  currentChannel: Channel | null = null;

  constructor() {
    makeAutoObservable(this, {
      lobbies: observable,
      currentLobby: observable,
      currentChannel: observable,
      setLobbies: action,
      setCurrentLobby: action,
      setCurrentChannel: action,
      init: flow,
    });
  }

  setLobbies(_lobbies: Lobby[]): void {
    this.lobbies = _lobbies;
    if (this.lobbies.length > 0) {
      this.setCurrentLobby(this.lobbies[0].id);
    }
  }

  setCurrentLobby(id: string): void {
    this.currentLobby = this.lobbies?.find((lobby) => (lobby.id === id)) ?? null;
    this.currentChannel = this.currentLobby?.channels.at(0) ?? null;
  }

  setCurrentChannel(id: string): void {
    this.currentChannel = this.currentLobby?.channels.find((channel) => (channel.id === id)) ?? null;
  }

  async init(): Promise<void> {
    const res: any = await apolloClient.query({ query: GetMyLobbies });
    this.setLobbies(res.data.authenticated.myLobbies);
    apolloClient.subscribe({ query: NewMesssage }).subscribe((data) => {
      console.log(data);
      // TODO add message in store
    });
  }
}

export default new DashboardStore();
