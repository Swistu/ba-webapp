import {signOut} from 'next-auth/react';
import TopNav from "../nav/topNav";
import SideNav from "../nav/sideNav";
import NavItem from "../../navItem/navItem";

const Header = () => {
    return (
        <header className="panel">
            <TopNav>
                <NavItem href="/kroniki">Kroniki</NavItem>
                <NavItem href="/galeria">Galeria</NavItem>
                <NavItem href="/api/auth/signout" onClick={() => signOut()}>
                    Wyloguj się
                </NavItem>
            </TopNav>
            <SideNav>

                <NavItem href="/panel">Panel</NavItem>
                <NavItem href="/panel/activity-log">Activity log</NavItem>
                <NavItem href="/panel/tools" className="sub-menu-title">
                    Przydatne narzędzia
                </NavItem>
            </SideNav>
        </header>
    );
};

export default Header;
