import {
  EnvelopeIcon,
  EyeIcon,
  FireIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'

type Props = {
  id: number
}

const Card = ({ id }: Props) => {
  return (
    <article className="group relative  rounded-md overflow-hidden shadow-md flex flex-col bg-secondary">
      <div className="overflow-hidden flex-[.9]">
        <Image
          src={`https://picsum.photos/id/${id}/300/300`}
          width={300}
          height={300}
          alt="clickdate"
          className="blur"
        />
      </div>
      <div className="flex-[.1] px-2 py-2 flex justify-between items-center">
        <EnvelopeIcon className="w-6 h-6 text-primary hover:text-white cursor-pointer" />
        <FireIcon className="w-6 h-6 hover:text-primary text-white cursor-pointer" />
        <EyeIcon className="w-6 h-6 hover:text-primary text-white cursor-pointer" />
        <StarIcon className="w-6 h-6 hover:text-primary text-white cursor-pointer z-10" />
      </div>
      <div className="flex-[.1] bg-gradient-to-r from-indigo-500 to-purple-500  absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 group-hover:bottom-10 h-12 group-hover:h-[180px] w-full transition-all duration-500 ease-out rounded p-2 flex flex-col gap-2">
        <h1 className="font-extrabold text-lg text-dark tracking-wide">
          *********
        </h1>
        <p className="text-sm tracking-wide text-white">Welcome</p>
        <p className="text-md text-dark tracking-wide">Please register</p>
        <p className="text-md text-dark tracking-wide">to meet your soulmate</p>
        <p className="text-md text-dark tracking-wide">********</p>
      </div>
    </article>
  )
}
export default Card
