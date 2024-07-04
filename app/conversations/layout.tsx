//import getConversations from "../actions/getConversations";
import { getUsers } from '@/actions/userdata'
import Sidebar from '@/components/sidebar/Sidebar'
import ConversationList from '@/app/conversations/components/ConversationList'
import getConversations from '@/actions/getConversations'

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode
}) {
  const conversations = await getConversations()
  //const users = await getUsers()

  return (
    <div className="h-full">
      <ConversationList
        // users={users}
        title="MessagesS"
        initialItems={conversations}
      />
      {children}
    </div>
  )
}
