'use client'

import clsx from 'clsx'

import useConversation from '@/hooks/useConversation'
import EmptyState from '@/app/users/components/EmptyState'

const Home = () => {
  const { isOpen } = useConversation()

  /*  var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: 'eu'
  }) */
  //PUSHERRR
  /* var channel = pusher.subscribe('my-channel')
  channel.bind('my-event', function (data: any) {
    alert(JSON.stringify(data))
  })
 */
  return (
    <div
      className={clsx(
        'lg:pl-80 xl:pl-80 pt-2  h-full lg:block',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <EmptyState />
    </div>
  )
}

export default Home
