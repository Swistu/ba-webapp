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
            </SideNav>
        </header>
    );
};

export default Header;
