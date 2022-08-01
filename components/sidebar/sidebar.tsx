import React from 'react';
import Nav from '../nav/nav';
import NavItem from '../navItem/navItem';

type Props = {
  children?: React.ReactNode;
};

const Sidebar: React.FC<Props> = ({ children }) => {
  return (
    <aside className="panel_aside">
      <section className="sidebar_menu">
        <Nav>
          <NavItem href="/panel/konto">Konto</NavItem>
          <NavItem href="/panel/awanse">Twoje awanse</NavItem>
        </Nav>
      </section>
      {children}
    </aside>
  );
};

export default Sidebar;
