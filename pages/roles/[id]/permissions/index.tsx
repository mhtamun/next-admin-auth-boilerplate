import React from 'react';

// third-party
import { GetServerSideProps } from 'next';

// application
import { getAuthorized } from '../../../../libs/auth';
import GenericViewGenerator from '../../../../components/global/GenericViewGenerator';

export const getServerSideProps: GetServerSideProps = async (context) =>
    getAuthorized(context, () => {
        const roleId = context.query.id;

        // console.debug({ roleId });

        return {
            roleId,
        };
    });

const Page = ({ roleId }: { roleId: number }) => {
    return (
        <>
            <GenericViewGenerator
                name={'permission'}
                title="Permissions"
                subtitle="Manage permission here!"
                viewAll={{
                    uri: `/api/v1/roles/${roleId}/permissions`,
                    ignoredColumns: ['id', 'roleId', 'role', 'createdAt', 'updatedAt', 'isDeleted'],
                    actionIdentifier: 'id',
                }}
                // addNew={{
                //     uri: `/api/v1/permissions`,
                // }}
                // viewOne={{ uri: '/api/v1/permissions/{id}', identifier: '{id}' }}
                // editExisting={{ uri: '/api/v1/permissions/{id}', identifier: '{id}' }}
                // removeOne={{
                //     uri: '/api/v1/permissions/{id}',
                //     identifier: '{id}',
                // }}
                // fields={[]}
            />
        </>
    );
};

export default Page;
