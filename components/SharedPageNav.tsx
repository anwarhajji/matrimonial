'use-client'
import React, { ReactNode } from 'react'
import styles from './NavigationBar.module.css'

const SharedPageNav = ({ sharednavLinks }: any) => {
  /*   className="overflow-x-scroll absolute top-12 left-0 overflow-hidden w-screen text-dark bg-gradient  px-2 sm:px-8 lg:px-32"
   */ return (
    <div className={styles.navbar}>
      {/*             <ul className="flex w-full items-center gap-4 md:gap-16 pr-16 text-gray-100 h-12 tracking-wide  ">
       */}
      <ul className={styles.navbar}>
        {sharednavLinks.map((L: any, I: number) => {
          return (
            <li
              key={I}
              className="group relative cursor-pointer flex items-center gap-2 hover:bg-accent hover:text-dark transition-all duration-300 ease-in-out px-4 h-full flex-shrink-0"
            >
              {L.icon}
              <span>{L.title}</span>
              <span className="w-4 h-4 rotate-45 -z-0 bg-gray-100 absolute opacity-0  group-hover:opacity-100 durarion-300 -bottom-3 left-[50%] right-[50%]"></span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default SharedPageNav
