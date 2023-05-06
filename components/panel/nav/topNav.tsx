import Link from 'next/link';
import {ReactNode, useState} from 'react';
import UserDropdown from "./userDropdown";

type Props = {
    children: ReactNode;
};

const TopNav: React.FC<Props> = () => {
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
            className={'w-[100%] h-[76px] flex justify-between p-[1.25rem] fixed top-0 left-0 z-100'}>
            <div className="hamburger" onClick={() => toggleMenu()}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            <div className="brand">
                <Link href={'/'}>Błękitna Armia</Link>
            </div>
            <UserDropdown/>
        </nav>
    );
};

export default TopNav;
