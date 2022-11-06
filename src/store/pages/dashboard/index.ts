import apolloClient from 'apollo';
import { observable, action, makeAutoObservable } from 'mobx';
import {
  Channel,
  Lobby,
  LobbyCreateInput,
  Message,
  MessageCreateInput,
} from 'core/api/types';
import { GetMyLobbies } from 'core/api/queries';
import { CreateLobby, CreateMessage } from 'core/api/mutations';
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
      addMessage: action,
      addLobby: action,
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

  addMessage(message: Message): void {
    const lobby = this.lobbies?.find((_lobby) => message.channel.lobby.id === _lobby.id);
    const channel = lobby?.channels.find((_channel) => message.channel.id === _channel.id);
    channel?.messages.push(message);
  }

  createMessage(message: string): void {
    if (this.currentChannel == null) return;
    const variables: MessageCreateInput = {
      channelId: this.currentChannel?.id,
      text: message,
    };
    apolloClient.mutate({ mutation: CreateMessage, variables }).catch(() => { });
  }

  addLobby(lobby: Lobby): void {
    this.lobbies?.push(lobby);
  }

  async createLobby(variables: LobbyCreateInput): Promise<void> {
    try {
      const res = await apolloClient.mutate({ mutation: CreateLobby, variables });
      this.addLobby(res.data.authenticated.lobby.create);
    } catch (e) { }
  }

  async init(): Promise<void> {
    const res: any = await apolloClient.query({ query: GetMyLobbies });
    this.setLobbies(res.data.authenticated.myLobbies);
    apolloClient.subscribe({ query: NewMesssage }).subscribe((value) => {
      this.addMessage(value.data.newMessage);
    });
  }
}

export default new DashboardStore();
