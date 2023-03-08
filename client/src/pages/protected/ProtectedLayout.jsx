import React from 'react';
import { Outlet } from 'react-router-dom';
import { EthProvider } from "../../contexts/EthContext";


export const ProtectedLayout = () => {
    return (
        <EthProvider> 
             <div className="notification is-danger">
                <Outlet/>
            </div>
        </EthProvider> 
    );
};
