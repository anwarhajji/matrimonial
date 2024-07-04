'use client'

import React, { useState, ReactNode, ReactElement } from 'react'
import { FaHeart, FaSmile, FaStar } from 'react-icons/fa'

interface ClientComponentProps {
  children: ReactElement | ReactElement[]
}

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

const ClientComponent: React.FC<ClientComponentProps> = ({ children }) => {
  const [selectedComponent, setSelectedComponent] =
    useState<string>('component3')

  const renderComponent = () => {
    const components = Array.isArray(children) ? children : [children]
    switch (selectedComponent) {
      case 'component1':
        return components[0]
      case 'component2':
        return components[1]
      case 'component3':
        return components[2]
      default:
        return null
    }
  }

  return (
    <div className="items-center ">
      <nav className="flex justify-between items-center mb-4 pt-4  ">
        <ul className="flex flex-wrap justify-center md:flex-nowrap">
          <li className="mr-6 md:mr-3">
            <MenuItem
              //href="/"
              icon={<FaHeart className="mr-2" />}
              text="Interested"
              onClick={() => setSelectedComponent('component1')}
            />
          </li>
          <li className="mr-6 md:mr-3">
            <MenuItem
              //href="#"
              icon={<FaSmile className="mr-2" />}
              text="Match"
              onClick={() => setSelectedComponent('component2')}
            />
          </li>
          <li>
            <MenuItem
              // href="#"
              icon={<FaStar className="mr-2" />}
              text="Like"
              onClick={() => setSelectedComponent('component3')}
            />
          </li>
        </ul>
      </nav>

      {renderComponent()}
    </div>
  )
}

export default ClientComponent
