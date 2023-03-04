import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Nav from '../nav/nav';
import NavItem from '../navItem/navItem';
import {Alert, DarkThemeToggle, Flowbite, Sidebar} from "flowbite-react";
import React from "react";
import {HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards} from "react-icons/all";

const Header = ({ panel = false }: { panel?: boolean }) => {
  const { asPath } = useRouter();

  if (panel)
    return (
   <>
    {/* <div className="text-center">
       <button
           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
           type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation"
           aria-controls="drawer-navigation">
         Show navigation
       </button>
     </div>*/}


   </>
    );

  return (
    <header className={'page ' + (asPath === '/' ? 'transparent' : '')}>
      <Nav mainNav={true}>
        <NavItem href="/kroniki">Kroniki</NavItem>
        <NavItem href="/galeria">Galeria</NavItem>
        <NavItem href="/panel">Panel</NavItem>
      </Nav>
    </header>
  );
};

export default Header;
