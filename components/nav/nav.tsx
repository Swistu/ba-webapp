import Link from 'next/link';
import { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
  mainNav?: boolean;
  panel?: boolean;
};

const Nav: React.FC<Props> = ({ children, mainNav = false, panel = false }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (page = false) => {
    if (page) {
      return setShowMenu(!showMenu);
    }
    setShowMenu(!showMenu);
    if (showMenu)
      document.getElementsByClassName('side_nav')[0].classList.add('open');
    else
      document.getElementsByClassName('side_nav')[0].classList.remove('open');
  };

  if (panel) {
    if (mainNav)
      return (
        <nav className="side_nav">
          <ul className="nav_menu">{children}</ul>
        </nav>
      );

    return (
      <nav className="top_nav">
        <div className="hamburger" onClick={() => toggleMenu()}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className="brand">
          <Link href={'/'}>Błękitna Armia</Link>
        </div>
        <ul className={'nav_menu '}>{children}</ul>
      </nav>
    );
  }
  return (
    <nav className="container">
      {mainNav ? (
        <>
          <div className="brand">
            <Link href="/">Błękitna Armia</Link>
          </div>
          <div className="hamburger" onClick={() => toggleMenu(true)}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </>
      ) : null}

      <ul className={'nav_menu ' + (showMenu ? 'open' : '')}>{children}</ul>
    </nav>
  );
};

export default Nav;
