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
          <NavItem href="/">Strona główna</NavItem>
          <NavItem href="/panel">Ustawienia</NavItem>
          <NavItem href="#">Użytkownik</NavItem>
          <NavItem href="/api/auth/signout" onClick={() => signOut()}>
            Wyloguj się
          </NavItem>
        </Nav>
        <Nav mainNav={true} panel={panel}>
          <NavItem href="/kroniki">Historia Awansów</NavItem>
          <NavItem href="/panel">Panel</NavItem>
        </Nav>
      </header>
    );

  return (
    <header className={'page ' + (asPath === '/' ? 'transparent' : '')}>
      <Nav mainNav={true}>
        <NavItem href="/">Strona główna</NavItem>
        <NavItem href="/kroniki">Kroniki</NavItem>
        <NavItem href="/panel">Panel</NavItem>
      </Nav>
    </header>
  );
};

export default Header;
