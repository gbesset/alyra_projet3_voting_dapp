import React from 'react';
import { Outlet } from 'react-router-dom';
import { Account } from '../../components/Account/Account';
import { EthProvider } from "../../contexts/EthContext";


export const ProtectedLayout = () => {
    return (
        <EthProvider> 
            <Account/>
             <div>
                <Outlet/>
            </div>
        </EthProvider> 
    );
};
