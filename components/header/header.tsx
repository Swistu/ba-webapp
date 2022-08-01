import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Nav from '../nav/nav';
import NavItem from '../navItem/navItem';

const Header = () => {
  const { data: session } = useSession();
  const { asPath } = useRouter();

  return (
    <header className={asPath === '/' ? 'transparent' : ''}>
      <Nav mainNav={true}>
        <NavItem href="/">Strona główna</NavItem>
        <NavItem href="/kroniki">Kroniki</NavItem>
        <NavItem href="/panel">Panel</NavItem>
        {session ? (
          <NavItem href="/api/auth/signout" onClick={() => signOut()}>
            Wyloguj się
          </NavItem>
        ) : (
          <NavItem href="/api/auth/signin" onClick={() => signIn()}>
            Zaloguj się
          </NavItem>
        )}
      </Nav>
    </header>
  );
};

export default Header;
