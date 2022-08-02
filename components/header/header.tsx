import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Nav from '../nav/nav';
import NavItem from '../navItem/navItem';

const Header = ({ panel }: { panel?: boolean }) => {
  const { asPath } = useRouter();

  return (
    <header className={asPath === '/' ? 'transparent' : ''}>
      <Nav mainNav={true}>
        <NavItem href="/">Strona główna</NavItem>
        <NavItem href="/kroniki">Kroniki</NavItem>
        <NavItem href="/panel">Panel</NavItem>
        {panel ? (
          <NavItem href="/api/auth/signout" onClick={() => signOut()}>
            Wyloguj się
          </NavItem>
        ) : null}
      </Nav>
    </header>
  );
};

export default Header;
