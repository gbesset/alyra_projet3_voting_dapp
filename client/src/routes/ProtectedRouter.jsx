import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { Admin } from '../pages/protected/Admin';
import { ProtectedLayout } from '../pages/protected/ProtectedLayout';
import { Voter } from '../pages/protected/Voter';
import { EthProvider } from "../contexts/EthContext";

export const ProtectedRouter = () => {
    return (
        <EthProvider>
            <Routes>
                <Route element={<ProtectedLayout/>}>
                    <Route path="/voter" element={<Voter />} />
                    <Route path="/admin" element={<Admin />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </EthProvider>
    );
};
