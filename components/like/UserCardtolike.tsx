import {
  EnvelopeIcon,
  EyeIcon,
  FireIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'
import UserStatus from '../chat/userstatus'
import LikeButton from './likebutton'
import SendInvitation from '@/app/notification/_components/sendIvitation'
import { iUserPropstatus } from '@/actions/userdata'

export interface iUserProps {
  imagePath: string
  country: string
  name: string
  age: number
  gender: string
  occupation: string
  userId: string | undefined
  //isInFavoriteList: boolean;
  //favoriteId: string;
  //homeId: string;
  //pathName: string;
}

const UserCard = ({
  userId,
  imagePath,
  country,
  name,
  age,
  gender,
  occupation,
  isLiked,
  isMatched
}: iUserPropstatus) => {
  return (
    <article className="group relative  rounded-md overflow-hidden shadow-md flex flex-col bg-secondary">
      <div className="overflow-hidden flex-[.9]">
        <Image
          //src={imagePath}
          src={imagePath}
          width={300}
          height={300}
          alt="clickdate"
          //className="blur2"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
      </div>
      <div className="flex-[.1] px-12 py-2 flex justify-between items-center">
        {/*         <EnvelopeIcon className="w-6 h-6 text-primary hover:text-secondary cursor-pointer" />
         */}{' '}
        {/*         <FireIcon className="w-9 h-9 hover:text-secondary text-primary cursor-pointer" />
         */}{' '}
        {/*         <LikeButton receiverId={userId!} />
         */}{' '}
        <SendInvitation
          receiverId={userId!}
          islike={isLiked}
          ismatch={isMatched}
        />
        <EyeIcon className="w-9 h-9 hover:text-secondary text-primary cursor-pointer" />
        {/*         <StarIcon className="w-6 h-6 hover:text-secondary text-primary cursor-pointer z-10" />
         */}{' '}
      </div>
      <div className="flex-[.1] bg-gradient-to-r from-indigo-500 to-purple-500  absolute bottom-16 left-0 opacity-0 group-hover:opacity-100 group-hover:bottom-16 h-12 group-hover:h-[180px] w-full transition-all duration-500 ease-out rounded p-2 flex flex-col gap-2">
        <h1 className="font-extrabold text-lg text-dark tracking-wide">
          {name}
        </h1>
        <UserStatus userId={userId!} />
        <p className="text-md text-dark tracking-wide">Lives {country} </p>
        <p className="text-md text-dark tracking-wide">Works : {occupation}</p>
        <p className="text-md text-dark tracking-wide">AGE : {age}</p>
      </div>
    </article>
  )
}
export default UserCard
