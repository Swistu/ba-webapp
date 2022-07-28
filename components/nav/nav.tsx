import { signIn, signOut, useSession } from "next-auth/react"
import NavItem from "../navItem/navItem"

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav>
      <ul>
        <NavItem href="/">Strona główna</NavItem>
        <NavItem href="/panel">Panel</NavItem>
        {
          session ?
            <NavItem href="/api/auth/signout" onClick={() => signOut()}>Wyloguj się</NavItem>
            :
            <NavItem href="/api/auth/signin" onClick={() => signIn()}>Zaloguj się</NavItem>
        }
      </ul>
    </nav>
  )
}

export default Nav