import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'primereact';
import PropTypes from 'prop-types';

const Modal = (props) => {
    const { isOpen, toggle, title, children: body, footer = null } = props;

    return (
        <Modal
            allowFullScreen={true}
            scrollable
            size="xl"
            show={isOpen}
            onClose={toggle}
            backdrop={true}
            closeOnBackdrop={false}
        >
            <ModalHeader closeButton>{title}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
        </Modal>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
};

export default Modal;
