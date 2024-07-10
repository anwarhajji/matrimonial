import { Conversation, Message, User, UserProfile } from '@prisma/client'

export type FullMessageType = Message & {
  sender: User
  seen: User[]
}

export type FullConversationType = Conversation & {
  users: User[]
  messages: FullMessageType[]
}

export interface UserWithMatchPercentage extends User {
  matchPercentage: number
  userProfil: UserProfile[]
}
