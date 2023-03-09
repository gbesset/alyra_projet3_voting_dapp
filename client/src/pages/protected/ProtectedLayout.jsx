import React from 'react';
import { Outlet } from 'react-router-dom';
import { EthProvider } from "../../contexts/EthContext";


export const ProtectedLayout = () => {
    return (
        <EthProvider> 
             <div>
                <Outlet/>
            </div>
        </EthProvider> 
    );
};
