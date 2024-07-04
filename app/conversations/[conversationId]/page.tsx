import getConversationById from '@/actions/getConversationById'
import getMessages from '@/actions/getMessages'

import Header from './components/Header'
import Body from './components/body'
import Form from './components/Form'
import EmptyState from '@/app/users/components/EmptyState'

interface IParams {
  conversationId: string
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className="   h-full lg:pl-80   ">
      <div className=" max-h-[calc(100vh-90px)] bg-zinc-50 h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />

        <Form />
      </div>
    </div>
  )
}

export default ChatId
