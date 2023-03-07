import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './header.css';

export const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                  <li><Link to="/home" >Home</Link></li>
                  <li><Link to="/voter" >Voter</Link></li>
                  <li><Link to="/admin" >Admin</Link></li>
                </ul>
            </nav>
        </header>
    );
};
