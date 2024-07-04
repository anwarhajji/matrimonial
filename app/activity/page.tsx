// app/page.tsx
import React from 'react'
import ClientTabs from './_componenets/ClientTabs'
import Videos1 from './_componenets/likevideo1'
import Videos2 from './_componenets/likevideo2'
import Likes from './_componenets/like'

export default function Home() {
  return (
    <div className="flex justify-center  items-center bg-black h-full ">
      <ClientTabs photos={<Likes />} music={<Videos1 />} videos={<Videos2 />} />
    </div>
  )
}
