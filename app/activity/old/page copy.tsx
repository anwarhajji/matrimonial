import React from 'react'
import MenuActivity from './_componenets/menu-activity'
import Like from './_componenets/liked'
import MATCHED from './_componenets/match'
import Interested from './_componenets/interested'
import ClientComponent from './_componenets/prov'
const Activity: React.FC = () => {
  return (
    <div className="flex justify-center  bg-coral-400 rounded-full">
      <ClientComponent>
        <Interested />
        <MATCHED />

        <Like />
      </ClientComponent>
    </div>
  )
}

export default Activity
