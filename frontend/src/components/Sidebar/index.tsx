import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

const NAVBAR_HEIGHT = 64
const MOBILE_NAVBAR_HEIGHT = `calc(100vh_-_${NAVBAR_HEIGHT}px)`

interface Props {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidebar: React.FC<Props> = (props) => {
  const { open, setOpen } = props

  return (
    <div 
      className={classNames({
        "flex flex-col justify-between": true,
        "bg-indigo-700 text-zinc-50": true,
        "md:w-[300px] md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true,
        [`md:h-[${MOBILE_NAVBAR_HEIGHT}] w-full`]: true,
        "transition-transform .3s ease-in-out md:translate-x-0": true,
        "-translate-x-full": !open
      })}
    >
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
