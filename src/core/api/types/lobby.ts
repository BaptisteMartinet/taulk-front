import type { UserRestricted } from './user';
import type { Channel } from './channel';

export interface Lobby {
  id: string
  owner: UserRestricted
  title: string
  description: string
  channels: Channel[]
  users: UserRestricted[]
  createdAt: Date
  updatedAt: Date
}

export interface LobbyRestricted {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}
