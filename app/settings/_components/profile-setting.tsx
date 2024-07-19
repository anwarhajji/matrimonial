'use client'
import {
  Card,
  CardBody,
  Avatar,
  Badge,
  Button,
  Input,
  Spacer,
  Textarea,
  RadioGroup
} from '@nextui-org/react'
import { Icon } from '@iconify/react'
import UploadAvatar from '@/app/user/profile/_components/UploadAvatar'
import { useCurrentUser } from '@/hooks/user-current-user'
import { useEffect, useState } from 'react'
import { User, UserProfile } from '@prisma/client'
import { SettigStep1 } from '@/components/auth/setting-STEP1'
import { getUserById, getUserProfileById } from '@/data/user'
import { useQuery } from '@tanstack/react-query'
import { LogoutButton } from '@/components/auth/logout-button'
import { LogOutIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export const dynamic = 'force-dynamic'
const ProfileSetting = () => {
  const [profil, setProfile] = useState<UserProfile | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | undefined>(undefined)
  //const [refresh, setRefresh] = useState(prev)
  // const image = dbUser?.image!
  const dbUser = useCurrentUser()
  if (!dbUser) {
    return null
  }

  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading
  } = useQuery({
    queryKey: ['user', dbUser?.id],
    queryFn: () => getUserById(dbUser?.id!)
  })

  const {
    data: profileData,
    error: profileError,
    isLoading: isProfileLoading
  } = useQuery({
    queryKey: ['profile', dbUser?.id],
    queryFn: () => getUserProfileById(dbUser?.id!)
  })

  useEffect(() => {
    if (userData) {
      setUser(userData!)
    }
  }, [userData])

  useEffect(() => {
    if (profileData) {
      setProfile(profileData)
    }
    if (!isUserLoading && !isProfileLoading) {
      setLoading(false)
    }
  }, [profileData, isUserLoading, isProfileLoading])

  if (loading) {
    return <div>Loading...</div>
  }

  if (userError || profileError) {
    return <div>Error loading data</div>
  }

  return (
    <div className="p-2">
      {/* Profile */}
      <div>
        <p className="text-base font-medium text-default-700">Profile</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          This displays your public information and profile photo, and can be
          changed on the site.
        </p>

        <Card className="mt-4 bg-default-100" shadow="none">
          <CardBody>
            <div className="flex items-center gap-4">
              <Badge
                classNames={{
                  badge: 'w-5 h-5'
                }}
                content={
                  /* 
                  <Button
                    isIconOnly
                    className="h-5 w-5 min-w-5 bg-background p-0 text-default-500"
                    radius="full"
                    size="sm"
                    variant="bordered"
                  >
                    <Icon className="h-[9px] w-[9px]" icon="solar:pen-linear" />
                  </Button> */

                  <UploadAvatar userId={user?.id!} />
                }
                placement="bottom-right"
                shape="circle"
              >
                <Avatar
                  className="h-16 w-16"
                  src={user?.image! ?? '/images/user.png'}
                />
              </Badge>
              <div>
                <p className="text-sm font-medium text-default-600">
                  {user?.name!}
                </p>
                <p className="text-xs text-default-400">{user?.email!}</p>
                <p className="mt-1 text-xs text-default-400">
                  @{user?.username} {user?.fullname}
                </p>
              </div>{' '}
              <LogoutButton>
                <LogOutIcon />
              </LogoutButton>
            </div>
          </CardBody>
        </Card>
      </div>
      {/* Title */}
      {/*  */}
      <Spacer y={2} />
      {/*   <div>
        <p className="text-base font-medium text-default-700">Theme</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Change the appearance of the web.
        </p>
            <RadioGroup className="mt-4 flex-wrap" orientation="horizontal">
          <ThemeCustomRadio
            value="light"
            variant="light"
            onChange={() => handleThemeChange('light')}
            checked={theme === 'light'}
          >
            Light
          </ThemeCustomRadio>
          <ThemeCustomRadio
            value="dark"
            variant="dark"
            onChange={() => handleThemeChange('dark')}
            checked={theme === 'dark'}
          >
            Dark
          </ThemeCustomRadio>
        </RadioGroup> 
      </div> */}
      <Spacer y={4} />
      {/* Location */}
      <Card className="mt-1 bg-default-100 " shadow="none">
        <CardBody className="">
          <div className="flex items-center w-full ">
            <SettigStep1 user={user!} Uprofil={profil!} />
          </div>
        </CardBody>
      </Card>

      <Spacer y={4} />
      {/* Biography */}
      {/* <Button
        className="mt-4 bg-default-foreground text-background"
        size="sm"
        onClick={handleSubmit}
      >
        Update Profile
      </Button> */}
    </div>
  )
}

export default ProfileSetting
