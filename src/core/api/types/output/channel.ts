import type { User, UserRestricted } from './user';
import type { Message } from './message';
import type { Lobby } from './lobby';

export interface Channel {
  id: string
  lobby: Lobby
  title: string
  owner: User
  users: UserRestricted[]
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}
