import React, { Component, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './scss/style.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SyncLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/auth/login'));
const Register = React.lazy(() => import('./views/auth/reset-password'));
const Page404 = React.lazy(() => import('./views/error/page404'));
const Page500 = React.lazy(() => import('./views/error/page500'));

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

const Loading = ({ show }) => (
    <div
        style={{
            display: !show ? 'none' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            width: '100%',
            height: '100%',
            zIndex: '999999',
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(5px)',
        }}
    >
        <SyncLoader color="#303C54" loading={show} size={15} />
    </div>
);

const App = () => {
    const apiCallIsFinished = useSelector((state) => state.apiCall.isFinished);

    return (
        <HashRouter>
            <Suspense fallback={loading}>
                <Loading show={!apiCallIsFinished} />
                <ToastContainer />
                <Routes>
                    <Route exact path="/login" name="Login Page" element={<Login />} />
                    <Route exact path="/register" name="Register Page" element={<Register />} />
                    <Route exact path="/404" name="Page 404" element={<Page404 />} />
                    <Route exact path="/500" name="Page 500" element={<Page500 />} />
                    <Route path="*" name="Home" element={<DefaultLayout />} />
                </Routes>
            </Suspense>
        </HashRouter>
    );
};

export default App;
