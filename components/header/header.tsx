import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Nav from '../nav/nav';
import NavItem from '../navItem/navItem';

const Header = ({ panel = false }: { panel?: boolean }) => {
  const { asPath } = useRouter();

  if (panel)
    return (
      <header className="panel">
        <Nav panel={panel}>
          <NavItem href="/kroniki">Kroniki</NavItem>
          <NavItem href="/galeria">Galeria</NavItem>
          <NavItem href="/api/auth/signout" onClick={() => signOut()}>
            Wyloguj się
          </NavItem>
        </Nav>
        <Nav mainNav={true} panel={panel}>
          <NavItem href="#" className="sub-menu-title">
            Kalkulatory
          </NavItem>
          <div className="sub-menu">
            <NavItem href="https://foxholelogi.com/" target={true}>
              Logistyka
            </NavItem>
            <NavItem
              href="https://diantos.itch.io/artyleria-kalkulator"
              target={true}
            >
              Artyleria
            </NavItem>
            <NavItem href="https://bunker.drownedvale.club/" target={true}>
              Budowlanka (Kreator)
            </NavItem>
            <NavItem
              href="https://docs.google.com/spreadsheets/d/1z7fxtztOao1AduM47Yb-UicgA3ElpE2dz-4zFw2Swxs/edit#gid=236720178"
              target={true}
            >
              Budowlanka (Liczydło)
            </NavItem>
          </div>
          <NavItem href="/panel/activity-log">Activity log</NavItem>
          <NavItem href="/panel">Panel</NavItem>
        </Nav>
      </header>
    );

  return (
    <header className={'page ' + (asPath === '/' ? 'transparent' : '')}>
      <Nav mainNav={true}>
        <NavItem href="/kroniki">Kroniki</NavItem>
        <NavItem href="/galeria">Galeria</NavItem>
        <NavItem href="/panel">Panel</NavItem>
      </Nav>
    </header>
  );
};

export default Header;
