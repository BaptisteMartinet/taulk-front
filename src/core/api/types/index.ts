export interface UserRestricted {
  username: string
}

export interface User {
  id: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  channel: string // TODO reference ChannelType
  owner: UserRestricted
  text: string
  createdAt: Date
  updatedAt: Date
}

export interface Channel {
  id: string
  lobby: string // TODO reference LobbyType
  title: string
  owner: User
  users: UserRestricted[]
  messages: Message[]
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

// Responses

export interface LoginResponse {
  token: string
  user: User
}
