import React from 'react';
import { Link } from 'react-router-dom';

export const HeaderHome = () => {

    return (
        <header>
            <nav className="navbar is-spaced" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/sites/2147485225/images/a4df30a-cf3c-ee5a-b52a-4d6484824c0b_logo_bleu_2000x.png" width="112" height="28" />
                </Link>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/home" className="navbar-item">Home</Link>
                    <Link to="/protected/voter" className="navbar-item">Voter</Link>
                </div>
            </div>
            
           
        </nav>
    </header>
        
    );
};
