import { useMemo } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable as Table } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
// import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { ProductService } from '../../../demo/service/ProductService';
import { Demo } from '../../interfaces';

export interface IAction {
    text: string;
    icon: string;
    color: 'success' | 'warning' | 'info' | 'danger' | 'secondary' | 'help';
    action: () => {};
}

const DataTable = ({
    data,
    ignoredColumns = [],
    actionIdentifier = 'id',
    actions = [],
    title = null,
    subtitle = null,
    addNewItemButtonText = null,
    addNewItemCallback = null,
    scopedSlots = null,
    filtration = null,
    pagination = null,
    emptyListText = null,
}) => {
    let emptyProduct: Demo.Product = {
        id: '',
        name: '',
        image: '',
        description: '',
        category: '',
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK',
    };

    const columnHeads = [];

    if (!_.isUndefined(data) && !_.isNull(data) && _.size(data) > 0) {
        // const keys = _.keys(_.omit(data[0], ignoredColumns));

        _.map(_.keys(_.omit(data[0], [...ignoredColumns])), (key) => {
            columnHeads.push({
                key,
                label: _.upperCase(key),
                headerStyle: { minWidth: '10rem' },
            });
        });

        if (!_.isNull(actions) && _.size(actions) > 0) {
            columnHeads.push({
                key: 'actions',
                label: 'ACTIONS',
                headerStyle: { minWidth: '10rem' },
            });
        }
    }

    let mappedData = data;

    if (_.size(actions) > 0) {
        mappedData = _.map(data, (datum) => ({
            ...datum,
            // actions: (
            //     <>
            //         <Button
            //             icon={'pi pi-pencil'}
            //             rounded
            //             severity={'warning'}
            //             // onClick={(e) => {
            //             //     e.preventDefault();

            //             //     // console.debug({ actionIdentifier });

            //             //     if (actionIdentifier && action.callback) action.callback(item[actionIdentifier]);
            //             // }}
            //         />
            //         <Button
            //             className="mx-2"
            //             icon={'pi pi-trash'}
            //             rounded
            //             severity={'danger'}
            //             // onClick={(e) => {
            //             //     e.preventDefault();

            //             //     // console.debug({ actionIdentifier });

            //             //     if (actionIdentifier && action.callback) action.callback(item[actionIdentifier]);
            //             // }}
            //         />
            //     </>
            // ),
            // actions: 'Edit',
            actions: (
                <>
                    {_.map(actions, (action: IAction) => (
                        <Button
                            label={action.text}
                            icon={action.icon}
                            severity={action.color}
                            className="mx-2"
                            onClick={action.action}
                        />
                    ))}
                </>
            ),
        }));
    }

    console.debug({ mappedData });

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    {!addNewItemButtonText || !addNewItemCallback ? null : (
                        <Button
                            label={addNewItemButtonText ?? 'New'}
                            icon="pi pi-plus"
                            severity="success"
                            className=" mr-2"
                            onClick={addNewItemCallback}
                        />
                    )}
                    {/* <Button
                        label="Delete"
                        icon="pi pi-trash"
                        severity="danger"
                        onClick={confirmDeleteSelected}
                        disabled={!selectedProducts || !selectedProducts.length}
                    /> */}
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload
                    mode="basic"
                    accept="image/*"
                    maxFileSize={1000000}
                    chooseLabel="Import"
                    className="mr-2 inline-block"
                />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} /> */}
            </React.Fragment>
        );
    };

    const header = (
        <div>
            <h5 className="m-0">{title}</h5>
            <p className="m-0">{subtitle}</p>
        </div>
    );

    // const actionBodyTemplate = (rowData: Demo.Product) => {
    //     return (
    //         <>
    //             <Button
    //                 icon="pi pi-pencil"
    //                 rounded
    //                 severity="success"
    //                 className="mr-2"
    //                 // onClick={() => editProduct(rowData)}
    //             />
    //             <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProduct(rowData)} />
    //         </>
    //     );data
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    {!addNewItemButtonText || !addNewItemCallback ? null : (
                        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    )}
                    <Table value={mappedData} emptyMessage={emptyListText ?? 'No data found!'} header={header}>
                        {_.map(columnHeads, (item) => (
                            <Column
                                key={item.key}
                                field={item.key}
                                header={item.label}
                                sortable={false}
                                headerStyle={item.headerStyle}
                            ></Column>
                        ))}

                        {/* {!_.isNull(actions) &&
                            _.size(actions) > 0 &&
                            _.map(actions, (action, index) => (
                                <Column
                                    key={index}
                                    body={
                                        <Button
                                            icon={action.icon}
                                            rounded
                                            severity={action.severity}
                                            onClick={(e) => {
                                                e.preventDefault();

                                                // console.debug({ actionIdentifier });

                                                if (actionIdentifier && action.callback)
                                                    action.callback(item[actionIdentifier]);
                                            }}
                                        />
                                    }
                                    headerStyle={{ minWidth: '10rem' }}
                                ></Column>
                            ))} */}
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
