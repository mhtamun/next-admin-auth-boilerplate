import React, { useEffect, useState, useMemo } from 'react';
// import { DataTable, Modal, ModalConfirmation, GenericFormGenerator } from '../index';
import { DataTable, ModalConfirmation, Modal, GenericFormGenerator } from '../index';
import { callGetApi, callDeleteApi, callPutApi, callPostApi } from '../../libs/api';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import _ from 'lodash';
import { IAction } from './DataTable';

const DeleteItemComponent = ({
    isConfirmationModalOpen,
    setConfirmationModalOpen,
    deleteApiUri,
    deleteIdentifier,
    datumId,
    onSuccess,
}: {
    isConfirmationModalOpen: boolean;
    setConfirmationModalOpen: (isConfirmationModalOpen: boolean) => void;
    deleteApiUri: string;
    deleteIdentifier: string;
    datumId: string;
    onSuccess: () => void;
}) => {
    return (
        <ModalConfirmation
            isOpen={isConfirmationModalOpen}
            onCancel={() => {
                setConfirmationModalOpen(!isConfirmationModalOpen);
            }}
            title="Are you sure you want to delete this entry?"
            subtitle="You cannot undo this operation."
            cancelCallback={() => {
                setConfirmationModalOpen(!isConfirmationModalOpen);
            }}
            confirmCallback={() => {
                setConfirmationModalOpen(!isConfirmationModalOpen);
                callDeleteApi(_.replace(deleteApiUri, deleteIdentifier, datumId))
                    .then((response) => {
                        if (!response) showErrorToast('Server not working!');

                        if (response.statusCode !== 200) showErrorToast(response.message);

                        showSuccessToast(response.message);

                        onSuccess();
                    })
                    .catch((error) => {
                        console.error('error', error);

                        showErrorToast('Something went wrong!');
                    });
            }}
        />
    );
};

// const EditItemComponent = ({
//     isFormModalOpen,
//     setFormModalOpen,
//     putApiUri,
//     putIdentifier,
//     datumId,
//     datum,
//     fields,
//     nonEdibleFields = [],
//     onSuccess,
//     name = null,
// }) => {
//     return (
//         <Modal
//             isOpen={isFormModalOpen}
//             toggle={() => {
//                 setFormModalOpen(!isFormModalOpen);
//             }}
//             title={`Edit ${name}`}
//         >
//             <GenericFormGenerator
//                 datum={datum}
//                 fields={fields}
//                 nonEdibleFields={nonEdibleFields}
//                 method={'put'}
//                 uri={_.replace(putApiUri, putIdentifier, datumId)}
//                 callback={(data) => {
//                     // console.debug({ data });

//                     setFormModalOpen(false);
//                     onSuccess(data);
//                 }}
//             />
//         </Modal>
//     );
// };

const AddNewItemComponent = ({
    isFormModalOpen,
    setFormModalOpen,
    fields,
    nonEdibleFields,
    postApiUri,
    onSuccess,
    name,
}: {
    isFormModalOpen: boolean;
    setFormModalOpen: (value: boolean) => void;
    fields: any;
    nonEdibleFields?: string[];
    postApiUri: string;
    onSuccess: (data: any) => void;
    name: string;
}) => {
    return (
        <Modal
            visible={isFormModalOpen}
            header={`Create new ${_.lowerCase(name)}`}
            onHide={() => {
                setFormModalOpen(false);
            }}
        >
            <GenericFormGenerator
                fields={fields}
                nonEdibleFields={nonEdibleFields}
                callback={(data) => {
                    // console.debug({ data });

                    callPostApi(postApiUri, data)
                        .then((response) => {
                            if (!response) showErrorToast('Server not working!');

                            if (response.statusCode !== 200) showErrorToast(response.message);

                            showSuccessToast(response.message);

                            onSuccess(data);
                        })
                        .catch((error) => {
                            console.error('error', error);

                            showErrorToast('Something went wrong!');

                            onSuccess(null);
                        })
                        .finally(() => {
                            setFormModalOpen(false);
                        });
                }}
            />
        </Modal>
    );
};

export default function GenericViewGenerator({
    name = null,
    title = null,
    subtitle = null,
    viewAll = null,
    addNew = null,
    addNewItemButtonText = null,
    viewOne = null,
    editExisting = null,
    removeOne = null,
    fields = null,
    editFields = null,
    nonEdibleFields = [],
    customActions = [],
    filtration = null,
    pagination = null,
}) {
    // Props
    const {
        uri: getAllApiUri,
        ignoredColumns = null,
        actionIdentifier = null,
        actionDatum = null,
        onDataModify: getAllDataModificationCallback = null,
        onSuccess: getAllSuccessCallback = null,
    } = viewAll;
    const { uri: postApiUri, callback: addNewCallback } = addNew || {};
    const {
        uri: getOneApiUri,
        identifier: getOneIdentifier,
        onDataModify: getOneDataModificationCallback,
        onSuccess: getOneSuccessCallback,
    } = viewOne || {};
    const { uri: putApiUri, identifier: putIdentifier, callback: editExistingCallback } = editExisting || {};
    const { uri: deleteApiUri, identifier: deleteIdentifier, callback: removeOneCallback } = removeOne || {};
    // Props
    // States
    const [data, setData] = useState<any>(null);
    const [datum, setDatum] = useState(null);
    const [datumId, setDatumId] = useState(null);
    const [isAddFormModalOpen, setAddFormModalOpen] = useState(false);
    const [isEditFormModalOpen, setEditFormModalOpen] = useState(false);
    const [isDeleteFormModalOpen, setDeleteFormModalOpen] = useState(false);
    const [actions, setActions] = useState<IAction[]>(customActions);
    // States

    // console.debug({
    //     isAddFormModalOpen,
    // });

    const getAllData = (getApiUri: string, handleDataCallback?: (data: any) => void) => {
        callGetApi(getApiUri)
            .then((response) => {
                if (!response) throw { message: 'Server not working!' };

                if (response.statusCode !== 200) throw { message: response.message };

                const tempData = !handleDataCallback ? response.data : handleDataCallback(response.data);

                setData(tempData);

                if (!_.isUndefined(getAllSuccessCallback) && !_.isNull(getAllSuccessCallback))
                    getAllSuccessCallback(response.data);
            })
            .catch((error) => {
                console.error('error', error);

                showErrorToast(error.message ?? 'Something went wrong!');
            });
    };

    const getDatum = (getOneApiUri, getOneIdentifier, value, handleDataCallback) => {
        callGetApi(_.replace(getOneApiUri, getOneIdentifier, value))
            .then((response) => {
                if (!response) throw { message: 'Server not working!' };

                if (response.statusCode !== 200) throw { message: response.message };

                setDatum(!handleDataCallback ? response.data : handleDataCallback(response.data));

                if (!_.isUndefined(getOneSuccessCallback) && !_.isNull(getOneSuccessCallback))
                    getOneSuccessCallback(response.data);
            })
            .catch((error) => {
                console.error('error', error);

                showErrorToast(error.message);
            });
    };

    useEffect(() => {
        const tempActions: IAction[] = [...actions];

        if (actionIdentifier && getOneApiUri && getOneIdentifier && putApiUri && putIdentifier) {
            tempActions.push({
                text: 'Edit',
                icon: 'pi pi-pencil',
                color: 'warning',
                callback: (id) => {
                    // console.debug({ id });

                    getDatum(getOneApiUri, getOneIdentifier, id, getOneDataModificationCallback);
                },
            });
        }

        if (actionIdentifier && deleteApiUri && deleteIdentifier)
            tempActions.push({
                text: 'Delete',
                icon: 'pi pi-trash',
                color: 'danger',
                callback: (id) => {
                    // console.debug({ id });

                    setDatumId(id);
                    setDeleteFormModalOpen(true);
                },
            });

        // console.debug({ tempActions });

        setActions(tempActions);
    }, []);

    useEffect(() => {
        getAllData(getAllApiUri, getAllDataModificationCallback);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAllApiUri]);

    useEffect(() => {
        if (!_.isUndefined(actionDatum) && !_.isNull(actionDatum) && !_.isNull(data) && _.size(data) > 0) {
            const tempData = [...data];
            const actionChangeIndex = _.findIndex(data, (element) => element.id === actionDatum.id);
            if (actionChangeIndex !== -1) tempData.splice(actionChangeIndex, 1, actionDatum);

            // console.debug({ actionDatum, data, tempData });

            setData(tempData);
        }
    }, [actionDatum]);

    useEffect(() => {
        if (!_.isUndefined(datum) && !_.isNull(datum)) setEditFormModalOpen(true);
    }, [datum]);

    return (
        <>
            {useMemo(
                () =>
                    !data ? null : (
                        <>
                            <DataTable
                                data={data}
                                ignoredColumns={ignoredColumns}
                                actionIdentifier={actionIdentifier}
                                actions={actions}
                                title={title}
                                subtitle={subtitle}
                                addNewItemButtonText={addNewItemButtonText ?? 'Add new item'}
                                addNewItemCallback={
                                    !postApiUri
                                        ? undefined
                                        : () => {
                                              setAddFormModalOpen(true);
                                          }
                                }
                            />
                        </>
                    ),
                // eslint-disable-next-line react-hooks/exhaustive-deps
                [data]
            )}
            {!fields || _.size(fields) === 0 ? null : (
                <AddNewItemComponent
                    isFormModalOpen={isAddFormModalOpen}
                    setFormModalOpen={(value) => {
                        setAddFormModalOpen(value);
                    }}
                    postApiUri={postApiUri}
                    fields={fields}
                    nonEdibleFields={nonEdibleFields}
                    onSuccess={(data) => {
                        // console.debug({ data });

                        getAllData(getAllApiUri, getAllDataModificationCallback);

                        addNewCallback(data);
                    }}
                    name={name}
                />
            )}
            {/* {(!fields && !editFields) || !datum ? null : (
                <EditItemComponent
                    isFormModalOpen={isEditFormModalOpen}
                    setFormModalOpen={(value) => {
                        setEditFormModalOpen(value);
                    }}
                    putApiUri={putApiUri}
                    putIdentifier={putIdentifier}
                    datumId={datum.id}
                    datum={datum}
                    fields={!editFields ? fields : editFields}
                    nonEdibleFields={nonEdibleFields}
                    onSuccess={(data) => {
                        getAllData(getAllApiUri, getAllDataModificationCallback);

                        if (!_.isUndefined(editExistingCallback) && !_.isNull(editExistingCallback))
                            editExistingCallback(data);
                    }}
                    name={name}
                />
            )} */}
            {!deleteApiUri || !deleteIdentifier || !datumId ? null : (
                <DeleteItemComponent
                    isConfirmationModalOpen={isDeleteFormModalOpen}
                    setConfirmationModalOpen={setDeleteFormModalOpen}
                    deleteApiUri={deleteApiUri}
                    deleteIdentifier={deleteIdentifier}
                    datumId={datumId}
                    onSuccess={() => {
                        getAllData(getAllApiUri, getAllDataModificationCallback);

                        if (!_.isUndefined(removeOneCallback) && !_.isNull(removeOneCallback)) removeOneCallback();
                    }}
                />
            )}
        </>
    );
}
