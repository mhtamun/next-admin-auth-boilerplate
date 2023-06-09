import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from 'src/libs/cookie-manager';

const AuthProvider = (WrappedComponent) => {
    const Wrapper = (props) => {
        if (!getCookie('access_token') || !getCookie('access_type') || !getCookie('user')) {
            // console.debug('I am inside auth provider logic!');

            return <Navigate to={'/login'} />;
        }

        return <WrappedComponent {...props} isLoggedIn={true} />;
    };

    return Wrapper;
};

export default AuthProvider;
