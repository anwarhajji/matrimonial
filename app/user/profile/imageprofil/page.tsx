import { getUserProfileByUserId } from '@/data/user'
import React, { ReactNode } from 'react'
//import SectionTitle from "./_components/sectionTitle";
import { Avatar, Card } from '@nextui-org/react'
import SectionTitle from '../_components/sectionTitle'
import UploadAvatar from '../_components/UploadAvatar'
import { getCurrentUser } from '@/actions/userdata'

const ProfilePage = async () => {
  const dbUser = await getCurrentUser()

  console.log('dbUser', dbUser)

  const dbuserprofile = await getUserProfileByUserId(dbUser?.id!)

  console.log('dbuserprofile', dbuserprofile)

  return (
    <section className="py-24  items-center">
      <Card className="m-4 p-4  max-w-[600px] bg-background/60 dark:bg-default-100/50 flex flex-col gap-5">
        <SectionTitle title="Basic Information" />

        <div className="flex">
          <div className="flex flex-col items-center ">
            <Avatar
              className="w-20 h-20"
              src={dbUser?.image ?? '/images/user.png'}
            />
            <UploadAvatar userId={dbUser?.id!} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Attribute title="Name" value={`${dbUser?.name} `} />
          <Attribute title="income" value={dbuserprofile?.income} />
          <Attribute title="Email" value={dbUser?.email} />
          <Attribute title="Registered On" value={'vide'} />
          <Attribute title="Properties Posted" value={1} />
        </div>
      </Card>
    </section>
  )
}

export default ProfilePage

const Attribute = ({ title, value }: { title: string; value: ReactNode }) => (
  <div className="flex flex-col text-sm">
    <span className="text-slate-200 font-semibold">{title}</span>
    <span className="text-slate-400">{value}</span>
  </div>
)
