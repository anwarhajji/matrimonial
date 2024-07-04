'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaHeart, FaSmile, FaStar } from 'react-icons/fa'
import Like from './liked'
import MATCHED from './match'
import Interested from './interested'

interface MenuItemProps {
  //href: string
  icon: JSX.Element
  text: string
  onClick: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onClick }) => {
  return (
    <a
      //href={href}
      className="bg-rose-100 hover:bg-rose-200 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
      onClick={onClick}
    >
      {icon} {text}
    </a>
  )
}

const MenuActivity: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState('LIKE')

  const router = useRouter()
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'LIKE':
        return <Like />
      case 'MATCH':
        return <MATCHED />
      case 'INTERESTED':
        return <Interested />
    }
  }

  return (
    <div>
      <nav className="flex justify-between items-center mb-4">
        <ul className="flex flex-wrap justify-center md:flex-nowrap">
          <li className="mr-6 md:mr-3">
            <MenuItem
              //href="/"
              icon={<FaHeart className="mr-2" />}
              text="Interested"
              onClick={() => setSelectedComponent('INTERESTED')}
            />
          </li>
          <li className="mr-6 md:mr-3">
            <MenuItem
              //href="#"
              icon={<FaSmile className="mr-2" />}
              text="Match"
              onClick={() => setSelectedComponent('MATCH')}
            />
          </li>
          <li>
            <MenuItem
              // href="#"
              icon={<FaStar className="mr-2" />}
              text="Like"
              onClick={() => setSelectedComponent('LIKE')}
            />
          </li>
        </ul>
      </nav>
      {renderComponent()}
    </div>
  )
}

export default MenuActivity
