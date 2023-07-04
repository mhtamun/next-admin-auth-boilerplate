import React from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { PrimeIcons } from 'primereact/api';

// application
import { getAuthorized } from '../../libs/auth';
import GenericViewGenerator from '../../components/global/GenericViewGenerator';

export const getServerSideProps: GetServerSideProps = async (context) => getAuthorized(context);

const Page = () => {
    const router = useRouter();

    return (
        <>
            <GenericViewGenerator
                name={'role'}
                title="Roles"
                subtitle="Manage role here!"
                viewAll={{
                    uri: `/api/v1/roles`,
                    ignoredColumns: ['id', 'permissions', 'createdAt', 'updatedAt', 'isDeleted'],
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
                customActions={[
                    {
                        color: 'info',
                        icon: PrimeIcons.ARROW_RIGHT,
                        text: 'Permissions',
                        callback: (identifier) => {
                            router.push(`/roles/${identifier}/permissions`);
                        },
                    },
                ]}
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
