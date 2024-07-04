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
  return <div className="w-full pt-2  flex-col flex ">{children}</div>
}
