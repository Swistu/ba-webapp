import Link from 'next/link';
import {ReactNode, useState} from 'react';

type Props = {
    children: ReactNode;
};

const TopNav: React.FC<Props> = ({children}) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = (page = false) => {
        if (page) {
            return setShowMenu(!showMenu);
        }
        setShowMenu(!showMenu);
        if (showMenu)
            document.getElementsByClassName('side_nav')[0].classList.add('open');
        else
            document.getElementsByClassName('side_nav')[0].classList.remove('open');
    };
    return (
        <nav
            className={'w-[100%] h-[76px] flex justify-between p-[1.25rem] shadow-panel fixed top-0 left-0 z-100 bg-secondary'}>
            <div className="hamburger" onClick={() => toggleMenu()}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            <div className="brand">
                <Link href={'/'}>Błękitna Armia</Link>
            </div>
            <ul className={'nav_menu '}>{children}</ul>
        </nav>
    );
};

export default TopNav;
