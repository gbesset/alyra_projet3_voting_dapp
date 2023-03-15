import React from 'react';
import { Outlet } from 'react-router-dom';
import {Footer } from '../components/Footer/Footer';
import { HeaderHome } from '../components/Header/HeaderHome';

export const Layout = () => {
    return (
            <>
             <HeaderHome/>
  
            <div className="container">
                <Outlet/>
            </div>
 
            <Footer />
             </>
    );
};
