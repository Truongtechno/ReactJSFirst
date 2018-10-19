import React from 'react';
import './Logo.css';
import burgerLog from '../../assets/images/burger_logo.png';
const logo = (props) => (
    <div className="Logo" style={{ height: props.height}}>
        <img src={burgerLog} alt="MyBurger"/>
    </div>
);
export default logo;