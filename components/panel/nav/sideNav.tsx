import {ReactNode} from 'react';

type Props = {
    children: ReactNode;
};

const SideNav: React.FC<Props> = ({children}) => {


    return (
        <nav
            className={'fixed top-[76px] left-[-256px] bg-secondary min-h-panel w-[256px] shadow-panel font-panel leading-[1.25rem] side_nav'}>
            <ul className="nav_menu">{children}</ul>
        </nav>
    );
};

export default SideNav;
