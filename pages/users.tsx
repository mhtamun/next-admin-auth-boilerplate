import React from 'react';
import GenericViewGenerator from '../components/global/GenericViewGenerator';

const users = () => {
    return (
        <>
            <GenericViewGenerator
                name={'User'}
                title="Users"
                subtitle="Manage user here!"
                viewAll={{
                    uri: `/api/v1/users`,
                    ignoredColumns: ['password', 'otp', 'otpCount', 'createdAt', 'updatedAt', 'isDeleted'],
                    actionIdentifier: 'id',
                }}
            />
        </>
    );
};

export default users;
