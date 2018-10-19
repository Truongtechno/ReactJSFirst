import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DraweToogle/DrawerToogle';

const toolbar = (props) => (
    <header className="Toolbar"> 
        <DrawerToogle clicked={props.sideDrawerToogleHandler}/>
        <Logo height="80%"/>
        <nav className="DesktopOnly"> 
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;