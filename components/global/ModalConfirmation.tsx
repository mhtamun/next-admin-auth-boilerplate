import React from 'react';
import { CModal, CModalBody, CButton } from '@coreui/react';
import PropTypes from 'prop-types';

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
    return (
        <CModal show={isOpen} onClose={toggle} backdrop={true} closeOnBackdrop={false}>
            <CModalBody>
                <div className="text-center p-5">
                    <div className="avatar-icon-wrapper rounded-circle m-0">
                        <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
                            {/* <FontAwesomeIcon icon={icon} className="d-flex align-self-center display-3" /> */}
                        </div>
                    </div>
                    <h4 className="font-weight-bold mt-4">{title}</h4>
                    {!subtitle ? null : <p className="mb-0 font-size-lg text-muted">{subtitle}</p>}
                    <div className="pt-4">
                        <CButton
                            variant="ghost"
                            color={cancelColor}
                            onClick={(e) => {
                                e.preventDefault();

                                cancelCallback();
                            }}
                        >
                            Cancel
                        </CButton>
                        <CButton
                            className="ml-3"
                            color={confirmColor}
                            onClick={(e) => {
                                e.preventDefault();

                                confirmCallback();
                            }}
                        >
                            Confirm
                        </CButton>
                    </div>
                </div>
            </CModalBody>
        </CModal>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    cancelCallback: PropTypes.func.isRequired,
    cancelColor: PropTypes.string,
    confirmCallback: PropTypes.func.isRequired,
    confirmColor: PropTypes.string,
};

export default Modal;
