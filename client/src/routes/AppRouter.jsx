import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRouter } from './ProtectedRouter';
import { PublicRouter } from './PublicRouter';

export const AppRouter = () => {
    return (

            <Routes>
                <Route path="/*" element={<PublicRouter/>} />
                <Route path="/protected/*" element={<ProtectedRouter/>}/>
            </Routes>

    );
};
