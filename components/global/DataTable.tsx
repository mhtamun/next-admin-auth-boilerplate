import React, { useMemo } from 'react';
import { DataTable, Badge, Button, Col, Row, Card, CardBody } from 'primereact';
import { DraggableContainer } from '../';
import { getGenericBadgeColorText } from '../../utils';
import _ from 'lodash';

export default function Data_Table({
    children,
    data,
    ignoredColumns = [],
    actionIdentifier = null,
    actions = null,
    title = null,
    subtitle = null,
    addNewItemButtonText = null,
    addNewItemCallback = null,
    scopedSlots = null,
    filtration = null,
    pagination = null,
}) {
    let columnHeads = [];
    // let rows = [];

    // console.debug({ actions, addNewItemCallback });

    if (!_.isUndefined(data) && !_.isNull(data) && _.size(data) > 0) {
        const keys = _.keys(_.omit(data[0], ignoredColumns));

        columnHeads = _.map(keys, (key) => ({
            key,
            label: _.upperCase(key),
        }));

        if (!_.isNull(actions) && _.size(actions) > 0) {
            columnHeads.push({
                key: 'actions',
                label: 'ACTIONS',
                _style: { width: '5%' },
            });
        }

        /* todo: We do not require rows block for this theme
        rows = _.map(data, (datum) => {
            if (!_.isNull(actions) && _.size(actions) > 0) {
                datum['action-buttons'] = null;
            }

            const columns = _.reduce(
                _.omit(datum, ignoredColumns),
                (result, value, key) => {
                    // Data object
                    const temp = result;

                    if (!_.isEqual(key, 'action-buttons')) {
                        temp.push({
                            key,
                            value,
                            isBadge: _.lowerCase(key) === 'status' || _.lowerCase(key) === 'priority',
                        });
                    } else {
                        // todo: Setup action buttons here
                        temp.push({ key, value: '', isBadge: false });
                    }

                    return temp;
                },
                []
            );

            return {
                columns,
                identity: datum[actionIdentifier],
            };
        });
        */
    }

    // console.debug({ columnHeads });
    // console.debug({ rows });

    // UI Setup

    const fields = useMemo(() => columnHeads, [columnHeads]);
    const items = useMemo(() => data, [columnHeads]);

    // console.debug({ fields, items });

    return (
        <>
            <Card>
                <CardBody>
                    {!title ? null : <h3>{title}</h3>}
                    {!subtitle ? null : <p>{subtitle}</p>}
                </CardBody>
            </Card>
            {!filtration ? null : (
                <Card>
                    <CardBody>{filtration}</CardBody>
                </Card>
            )}
            <Card>
                <CardBody>
                    {!addNewItemCallback ? null : (
                        <Button
                            className="mb-3"
                            color="primary"
                            size="sm"
                            onClick={(e) => {
                                e.preventDefault();

                                if (addNewItemCallback) addNewItemCallback();
                            }}
                        >
                            {!addNewItemButtonText ? `+ Add New Item` : addNewItemButtonText}
                        </Button>
                    )}

                    <Row>
                        <Col xl="12">
                            {useMemo(
                                () => (
                                    <DraggableContainer>
                                        <DataTable
                                            scopedSlots={{
                                                status: (item) => {
                                                    // console.debug({ item });

                                                    return (
                                                        <td>
                                                            <Badge color={getGenericBadgeColorText(item.status)}>
                                                                {item.status}
                                                            </Badge>
                                                        </td>
                                                    );
                                                },

                                                actions: (item) => {
                                                    // console.debug({ item });

                                                    return (
                                                        <td>
                                                            {!_.isNull(actions) &&
                                                                _.size(actions) > 0 &&
                                                                _.map(actions, (action, index) => (
                                                                    <CButton
                                                                        key={index}
                                                                        className="btn-block"
                                                                        variant="outline"
                                                                        color={action.color}
                                                                        size="sm"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            // console.debug({ actionIdentifier });

                                                                            if (actionIdentifier && action.callback)
                                                                                action.callback(item[actionIdentifier]);
                                                                        }}
                                                                    >
                                                                        {action.text}
                                                                    </CButton>
                                                                ))}
                                                        </td>
                                                    );
                                                },

                                                ...scopedSlots,
                                            }}
                                            fields={fields}
                                            items={data}
                                            sorter
                                            columnFilter
                                            hover
                                            border
                                            outlined
                                            responsive={false}
                                            footer={false}
                                        />
                                    </DraggableContainer>
                                ),
                                [items, fields]
                            )}
                        </Col>
                    </Row>

                    {pagination}
                </CardBody>
            </Card>
        </>
    );
}
