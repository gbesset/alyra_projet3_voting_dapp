import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

export const ProtectedLayout = () => {
    return (
        <>
            <Header/>     
             <div className="container min-height">
                <Outlet/>
            </div>
            
            <Footer/>
        </>
    );
};
