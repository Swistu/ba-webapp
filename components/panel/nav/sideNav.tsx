import React, {ReactNode} from 'react';
import routes from './routes.json';
import Route from "./route";
import NavItem from "../../navItem/navItem";

type Props = {
    children: ReactNode;
};

const SideNav: React.FC<Props> = () => {
    const routesList = routes as Route[]

    return (
        <nav
            className={'bg-secondary p-[1em] xl:bg-transparent fixed top-[76px] left-[-256px] min-h-panel w-[256px]  font-panel leading-[1.25rem] side_nav'}>
            <ul className="nav_menu">
                {routesList
                    ? routesList.map((route: Route) => {
                        return (
                            <NavItem key={route.slug} href={route.route}>{route.name}</NavItem>
                        );
                    })
                    : null}
            </ul>
        </nav>
    );
};

export default SideNav;
