import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilUser } from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
            color: 'info',
            text: 'NEW',
        },
    },
    {
        component: CNavTitle,
        name: 'User Management',
    },
    {
        component: CNavItem,
        name: 'Users',
        to: '/users',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
];

export default _nav;
