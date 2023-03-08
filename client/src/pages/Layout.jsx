import React from 'react';
import { Outlet } from 'react-router-dom';
import {Footer } from '../components/Footer/Footer';


export const Layout = () => {
    return (
            <>
                <Outlet/>
                <Footer />
             </>
    );
};
