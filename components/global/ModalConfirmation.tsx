import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
('prop-types');

const Modal = ({
    isOpen,
    toggle,
    title,
    subtitle,
    cancelCallback,
    cancelColor = 'info',
    confirmCallback,
    confirmColor = 'danger',
}) => {
    const deleteProductDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={(e) => {
                    e.preventDefault();

                    cancelCallback();
                }}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                onClick={(e) => {
                    e.preventDefault();

                    confirmCallback();
                }}
            />
        </>
    );
    return (
        <Dialog
            visible={isOpen}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={deleteProductDialogFooter}
            onHide={toggle}
        >
            <div className="flex align-items-center justify-content-center">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />

                <span>
                    <b>{title}</b>?<br />
                    {subtitle}
                </span>
            </div>
        </Dialog>
    );
};

export default Modal;
