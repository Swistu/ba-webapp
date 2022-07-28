import Link from "next/link";

type NavItemProps = {
  children: React.ReactNode;
  href: string;
  onClick?:  React.MouseEventHandler
};

const NavItem: React.FC<NavItemProps> = ({ children, href, onClick }) => {

  return (
    <li>
      <Link href={href} {...onClick}>{children}</Link>
    </li>
  )
}

export default NavItem;