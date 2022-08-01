import Link from 'next/link';
import { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
  mainNav?: boolean;
};

const Nav: React.FC<Props> = ({ children, mainNav = false }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="container">
      {mainNav ? (
        <>
          <div className="brand">
            <Link href="/">Błękitna Armia</Link>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </>
      ) : null}

      <ul className={'nav-menu ' + (showMenu ? 'open' : '')}>{children}</ul>
    </nav>
  );
};

export default Nav;
