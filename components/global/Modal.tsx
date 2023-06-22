import React from 'react';
import { Dialog } from 'primereact/dialog';

const Modal = (props) => {
    const { isOpen, toggle, title, children: body, footer = null } = props;
    return (
        <>
            <Dialog visible={isOpen} style={{ width: '450px' }} header={title} modal footer={footer} onHide={toggle}>
                {body}
            </Dialog>
        </>
    );
};

export default Modal;
