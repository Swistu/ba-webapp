import Link from 'next/link';

type NavItemProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: boolean;
  onClick?: React.MouseEventHandler;
};

const NavItem: React.FC<NavItemProps> = ({
  children,
  href,
  onClick,
  className,
  target,
}) => {
  if (target) {
    return (
      <li className="nav_item">
        <a href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      </li>
    );
  }
  console.log(className);
  return (
    <li className={'nav_item ' + (className ? className : '')}>
      <Link href={href} {...onClick}>
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
