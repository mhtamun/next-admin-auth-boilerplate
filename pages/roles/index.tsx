import React from 'react';
import GenericViewGenerator from '../../components/global/GenericViewGenerator';

const Page = () => {
    return (
        <>
            <GenericViewGenerator
                name={'role'}
                title="Roles"
                subtitle="Manage role here!"
                viewAll={{
                    uri: `/api/v1/roles`,
                    ignoredColumns: ['permissions', 'createdAt', 'updatedAt', 'isDeleted'],
                    actionIdentifier: 'id',
                }}
                addNew={{
                    uri: `/api/v1/roles`,
                }}
                viewOne={{ uri: '/api/v1/roles/{id}', identifier: '{id}' }}
                editExisting={{ uri: '/api/v1/roles/{id}', identifier: '{id}' }}
                removeOne={{
                    uri: '/api/v1/roles/{id}',
                    identifier: '{id}',
                }}
                fields={[
                    {
                        type: 'text',
                        name: 'name',
                        placeholder: 'Enter a name!',
                        title: 'Role Name',
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

export default Page;
