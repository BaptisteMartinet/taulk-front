export * from './account';

export interface MessageCreateInput {
  channelId: string
  text: string
}

export interface LobbyCreateInput {
  title: string
  description: string
  isPrivate: boolean
}
