import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = (props) => (
    <ul className="NavigationItems">
       <NavigationItem link="/" exact >Burger</NavigationItem>
       <NavigationItem link="/orders">Orders</NavigationItem>
       <NavigationItem link="/auth">Authentications</NavigationItem>
    </ul>
);

export default navigationItems;

