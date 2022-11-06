import type { UserRestricted } from './user';
import type { Channel } from './channel';

export interface Message {
  id: string
  channel: Channel
  owner: UserRestricted
  text: string
  createdAt: Date
  updatedAt: Date
}
