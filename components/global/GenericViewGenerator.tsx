import React, { useEffect, useState } from 'react';
// import { DataTable, Modal, ModalConfirmation, GenericFormGenerator } from '../index';
import { DataTable } from '../index';
import { callGetApi, callDeleteApi } from '../../libs/api';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import { colors } from '../../utils';
import _ from 'lodash';

// const DeleteItemComponent = ({
//     isConfirmationModalOpen,
//     setConfirmationModalOpen,
//     deleteApiUri,
//     deleteIdentifier,
//     datumId,
//     onSuccess,
// }) => {
//     return (
//         <ModalConfirmation
//             isOpen={isConfirmationModalOpen}
//             toggle={() => {
//                 setConfirmationModalOpen(!isConfirmationModalOpen);
//             }}
//             title="Are you sure you want to delete this entry?"
//             subtitle="You cannot undo this operation."
//             cancelCallback={() => {
//                 setConfirmationModalOpen(!isConfirmationModalOpen);
//             }}
//             confirmCallback={() => {
//                 setConfirmationModalOpen(!isConfirmationModalOpen);
//                 callDeleteApi(_.replace(deleteApiUri, deleteIdentifier, datumId))
//                     .then((response) => {
//                         if (!response) throw { message: 'Server not working!' };

//                         if (response.statusCode !== 200) throw { message: response.message };

//                         showSuccessToast(response.message);

//                         onSuccess(datumId, response.message);
//                     })
//                     .catch((error) => {
//                         console.error('error', error);

//                         showErrorToast(error.message);
//                     });
//             }}
//         />
//     );
// };

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
//             {/* <GenericFormGenerator
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
//             /> */}
//         </Modal>
//     );
// };

// const AddNewItemComponent = ({
//     isFormModalOpen,
//     setFormModalOpen,
//     postApiUri,
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
//             title={`Create new ${_.lowerCase(name)}`}
//         >
//             <GenericFormGenerator
//                 fields={fields}
//                 nonEdibleFields={nonEdibleFields}
//                 method={'post'}
//                 uri={postApiUri}
//                 callback={(data) => {
//                     // console.debug({ data });

//                     setFormModalOpen(false);
//                     onSuccess(data);
//                 }}
//                 // resetButtonText="Reset"
//             />
//         </Modal>
//     );
// };

export default function GenericViewGenerator({
    name = null,
    title = null,
    subtitle = null,
    viewAll = null,
    viewOne = null,
    addNew = null,
    addNewItemButtonText = null,
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
        scopedSlots = null,
        actionIdentifier = null,
        actionDatum = null,
        onDataModify: getAllDataModificationCallback = null,
        onSuccess: getAllSuccessCallback = null,
    } = viewAll;
    const {
        uri: getOneApiUri,
        identifier: getOneIdentifier,
        onDataModify: getOneDataModificationCallback,
        onSuccess: getOneSuccessCallback,
    } = viewOne || {};
    const { uri: postApiUri, callback: addNewCallback } = addNew || {};
    const { uri: putApiUri, identifier: putIdentifier, callback: editExistingCallback } = editExisting || {};
    const { uri: deleteApiUri, identifier: deleteIdentifier, callback: removeOneCallback } = removeOne || {};
    // Props
    // States
    const [data, setData] = useState(null);
    const [datum, setDatum] = useState(null);
    const [datumId, setDatumId] = useState(null);
    const [isAddFormModalOpen, setAddFormModalOpen] = useState(false);
    const [isEditFormModalOpen, setEditFormModalOpen] = useState(false);
    const [isDeleteFormModalOpen, setDeleteFormModalOpen] = useState(false);
    const [actions, setActions] = useState(customActions);
    // States

    const getAllData = (getApiUri, handleDataCallback) => {
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

                showErrorToast(error.message);
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
        const tempActions = actions;

        if (actionIdentifier && getOneApiUri && getOneIdentifier && putApiUri && putIdentifier) {
            tempActions.push({
                text: 'Edit',
                color: colors.primary,
                callback: (id) => {
                    // console.debug({ id });

                    getDatum(getOneApiUri, getOneIdentifier, id, getOneDataModificationCallback);
                },
            });
        }

        if (actionIdentifier && deleteApiUri && deleteIdentifier)
            tempActions.push({
                text: 'Delete',
                color: colors.danger,
                callback: (id) => {
                    // console.debug({ id });

                    setDatumId(id);
                    setDeleteFormModalOpen(true);
                },
            });

        setActions(tempActions);
    }, []);

    useEffect(() => {
        getAllData(getAllApiUri, getAllDataModificationCallback);
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
            {!data ? null : (
                <DataTable
                    data={data}
                    ignoredColumns={ignoredColumns}
                    actionIdentifier={actionIdentifier}
                    actions={actions}
                    title={title}
                    subtitle={subtitle}
                    addNewItemButtonText={addNewItemButtonText}
                    addNewItemCallback={
                        !postApiUri
                            ? null
                            : () => {
                                  setAddFormModalOpen(true);
                              }
                    }
                    scopedSlots={scopedSlots}
                    filtration={filtration}
                    pagination={pagination}
                />
            )}
            {/* {!fields || _.size(fields) === 0 ? null : (
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
            {(!fields && !editFields) || !datum ? null : (
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
            )}
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
            )} */}
        </>
    );
}
