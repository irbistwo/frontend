import React, {useEffect, useState} from 'react';
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {ProviderContextAuth} from "./providers/ContextAuthProvider";

function RouteApp() {
    return (
            <Routes>
                <Route path="/"  element={
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                }/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
    );
}

function RequireAuth({children}: { children: JSX.Element }) {
    const auth = React.useContext(ProviderContextAuth);
    let location = useLocation();
    if ( !auth.get_token()) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}

export default RouteApp;
