import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

interface Props {
  onMenuButtonClick: () => void;
}

const Navbar: React.FC<Props> = (props) => {
  const { onMenuButtonClick } = props;

  return (
    <nav
      className={classNames({
        'bg-white text-zinc-500': true,
        'flex items-center': true,
        'w-full fixed z-10 px-4 shadow-sm h-16': true,
      })}
    >
      <div className="font-bold text-lg">Logo</div>
      <div className="flex-grow"></div>
      <button className="md:hidden" onClick={onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default Navbar;
