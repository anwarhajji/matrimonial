import { iUserProps } from '@/actions/userdata'
import { CardBody, ScrollShadow } from '@nextui-org/react'
import NotificationItem from './notification-item'
import { Icon } from '@iconify/react'

const LikeCard = ({ listiked }: { listiked: iUserProps[] }) => {
  const lists = listiked
  return (
    <CardBody className="w-full gap-0 p-0">
      <ScrollShadow className="h-[500px] w-full">
        {lists!?.length > 0 ? (
          lists!.map((userlike) => (
            <NotificationItem
              key={userlike?.userId!}
              {...userlike}
              type="liked"
            />
          ))
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <Icon
              className="text-default-400"
              icon="solar:bell-off-linear"
              width={40}
            />
            <p className="text-small text-default-400">No notifications yet.</p>
          </div>
        )}
      </ScrollShadow>
    </CardBody>
  )
}

export default LikeCard
