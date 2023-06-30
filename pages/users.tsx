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
                addNew={{
                    uri: `/api/v1/users`,
                }}
                removeOne={{
                    uri: '/api/v1/users/{id}',
                    identifier: '{id}',
                }}
                fields={[
                    {
                        type: 'text',
                        name: 'name',
                        placeholder: 'Enter a name!',
                        title: 'Name (Full name)',
                        initialValue: null,
                        validate: (values: any) => {
                            if (!values.name) return 'Name required!';

                            return null;
                        },
                    },
                ]}
            />
        </>
    );
};

export default users;
