import React from 'react';
import './NavigationItem.css';

const navigationItem = (props) => (
    <li className="NavigationItem">
        <a
            href="/"
            className={props.active ? "active" : ""}
        >{props.children}</a>
    </li>
);

export default navigationItem;

