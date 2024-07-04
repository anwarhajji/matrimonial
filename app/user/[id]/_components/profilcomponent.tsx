'use client'
import { User } from '@prisma/client'
import UserPost from './user-post'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Avatar,
  Tabs,
  Tab,
  Chip
} from '@nextui-org/react'

export async function Profiluser({ user }: { user: User }) {
  const { name, username, image, email, age, gender } = user!
  return (
    <div className="flex h-full  w-full items-start justify-center overflow-scroll">
      <Card className="my-10 w-[400px]">
        <CardHeader className="relative flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
          <Avatar className="h-20 w-20 translate-y-12 " src={image!} />
          <Button
            className="absolute right-3 top-3 bg-white/20 text-white dark:bg-black/20"
            radius="full"
            size="sm"
            variant="light"
          >
            Edit Profile
          </Button>
        </CardHeader>
        <CardBody>
          <div className="pb-4 pt-6">
            <p className="text-large font-medium"></p>
            <p className="max-w-[90%] text-small text-default-400">
              {username}
            </p>
            <div className="flex gap-2 pb-1 pt-2">
              <Chip variant="flat">{gender}</Chip>
              <Chip variant="flat">UI/UX</Chip>
              <Chip variant="flat">Photography</Chip>
            </div>
            <p className="py-2 text-small text-foreground">
              Creator of Radify Icons Set. 500+ icons in 6 styles, SVG and Figma
              files, and more.
            </p>
            <div className="flex gap-2">
              <p>
                <span className="text-small font-medium text-default-500">
                  13
                </span>
                &nbsp;
                <span className="text-small text-default-400">Following</span>
              </p>
              <p>
                <span className="text-small font-medium text-default-500">
                  2500
                </span>
                &nbsp;
                <span className="text-small text-default-400">Followers</span>
              </p>
            </div>
          </div>
          <Tabs
            fullWidth
            classNames={{
              panel: 'mt-2'
            }}
          >
            <Tab key="posts" title="Posts">
              {Array.from({ length: 6 }).map((_, i) => (
                <UserPost
                  key={i}
                  avatar="https://i.pravatar.cc/150?u=a04258114e29026708c"
                  comments={12}
                  date="2021-08-01"
                  likes={123}
                  name="Tony Reichert"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor."
                  username="@tony.reichert"
                />
              ))}
            </Tab>
            <Tab key="likes" title="Likes">
              {Array.from({ length: 2 }).map((_, i) => (
                <UserPost
                  key={i}
                  avatar="https://i.pravatar.cc/150?u=a04258114e29026708c"
                  comments={12}
                  date="2021-08-01"
                  likes={123}
                  name="Tony Reichert"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor."
                  username="@tony.reichert"
                />
              ))}
            </Tab>
            <Tab key="comments" title="Media">
              {Array.from({ length: 1 }).map((_, i) => (
                <UserPost
                  key={i}
                  avatar="https://i.pravatar.cc/150?u=a04258114e29026708c"
                  comments={12}
                  date="2021-08-01"
                  likes={123}
                  name="Tony Reichert"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor."
                  username="@tony.reichert"
                />
              ))}
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  )
}
