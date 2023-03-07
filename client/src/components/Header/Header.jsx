import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

export const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                  <li><Link to="/home" >Home</Link></li>
                  <li><Link to="/protected/voter" >Voter</Link></li>
                  <li><Link to="/protected/admin" >Admin</Link></li>
                </ul>
            </nav>
        </header>
    );
};
