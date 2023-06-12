import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard'));
const UserPage = React.lazy(() => import('./views/user'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/users', name: 'User', element: UserPage },
];

export default routes;
