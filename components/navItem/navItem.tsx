import {HTMLAttributeAnchorTarget} from "react";

type NavItemProps = {
    children: React.ReactNode;
    href: string;
    className?: string;
    target?: HTMLAttributeAnchorTarget;
    onClick?: React.MouseEventHandler;
};

const NavItem: React.FC<NavItemProps> = ({
                                             children,
                                             href,
                                             onClick,
                                             className,
                                             target,
                                         }) => {
    return (
        <li className="w-full">
            <a href={href} target={target} rel="noreferrer" onClick={onClick}
               className={'w-full h-full pt-[1.5rem] pr-[2rem] text-[1.3em] block bg-[rgba(3,3,3,0.3)] mt-[0.3rem] rounded-lg hover:ml-[15px] hover:bg-[rgba(3,3,3,0.6)] hover:transition-all ' + className}>
                {children}
            </a>
        </li>
    );

};

export default NavItem;
