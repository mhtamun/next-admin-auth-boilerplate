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
                    ignoredColumns: [
                        'id',
                        'password',
                        'otp',
                        'otpCount',
                        'roleId',
                        'createdAt',
                        'updatedAt',
                        'isDeleted',
                    ],
                    actionIdentifier: 'id',
                }}
                removeOne={{
                    uri: '/api/v1/users/{id}',
                    identifier: '{id}',
                }}
            />
        </>
    );
};

export default users;
