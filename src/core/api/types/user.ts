export interface User {
  id: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface UserRestricted {
  id: string
  username: string
}
