import React, { useCallback, useMemo } from 'react';
import { GenericViewGenerator } from '../components';
import { colors, getRoleOptions, getStatusOptions } from '../utils';
import { useHistory } from 'react-router-dom';

export default function User() {
    const history = useHistory();

    const fields = useMemo(
        () => [
            {
                type: 'text',
                name: 'name',
                placeholder: 'Enter a name!',
                title: 'Name (Full name)',
                initialValue: null,
                validate: (values) => {
                    if (!values.name) return 'Name required!';

                    return null;
                },
            },
            {
                type: 'email',
                name: 'email',
                placeholder: 'Enter an email!',
                title: 'Email',
                initialValue: null,
                validate: (values) => {
                    if (!values.email) return 'Email required!';

                    return null;
                },
            },
            {
                type: 'password',
                name: 'password',
                placeholder: 'Choose a password!',
                title: 'Password',
                initialValue: null,
                validate: (values) => {
                    if (!values.password) return 'Password required!';

                    return null;
                },
            },
            {
                type: 'select-sync',
                name: 'role',
                placeholder: 'Select the role!',
                title: 'Role',
                initialValue: null,
                options: getRoleOptions(),
                validate: (values) => {
                    if (!values.role) return 'Role must be selected!';

                    if (values.role === 'super-admin') return 'You are not permitted create a super admin!';

                    return null;
                },
                col: 2,
            },
            {
                type: 'select-sync',
                name: 'status',
                placeholder: 'Select the status!',
                title: 'Status',
                initialValue: null,
                options: getStatusOptions(),
                validate: (values) => {
                    if (!values.status) return 'Status must be selected!';

                    return null;
                },
            },
        ],
        []
    );

    const getCreateFields = useCallback(() => {
        return fields;
    }, [fields]);

    const getUpdateFields = useCallback(() => {
        const temp = [...fields];
        temp.splice(2, 1);
        return temp;
    }, [fields]);

    return (
        <GenericViewGenerator
            name={'User'}
            title="Users"
            subtitle="Manage user here!"
            viewAll={{
                uri: `/api/v1/users`,
                ignoredColumns: ['password', 'otp', 'otpCount', 'createdAt', 'updatedAt'],
                actionIdentifier: 'id',
            }}
            viewOne={{
                uri: `/api/v1/users/{id}`,
                identifier: '{id}',
            }}
            addNew={{
                uri: `/api/v1/users`,
            }}
            editExisting={{
                uri: `/api/v1/users/{id}`,
                identifier: '{id}',
            }}
            customActions={[
                {
                    text: 'User Permission',
                    color: colors.danger,
                    callback: (identity) => {
                        console.debug({ identity });

                        history.push(`/users/${identity}/permissions`);
                    },
                },
            ]}
            removeOne={{
                uri: '/api/v1/users/{id}',
                identifier: '{id}',
            }}
            fields={getCreateFields()}
            editFields={getUpdateFields()}
        />
    );
}
