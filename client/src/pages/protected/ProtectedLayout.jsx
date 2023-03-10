import React from 'react';
import { Outlet } from 'react-router-dom';
import { Account } from '../../components/Account/Account';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { EthProvider } from "../../contexts/EthContext";


export const ProtectedLayout = () => {
    return (
        <EthProvider> 
            <Header/>
            <Account/>
  
            <div className="container">
                <Outlet/>
            </div>

            <Footer/>
        </EthProvider> 
    );
};
