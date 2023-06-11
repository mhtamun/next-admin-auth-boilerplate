import { toast, Zoom } from 'react-toastify';

const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: 'colored',
    transition: Zoom,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (message, type = 'default' | 'info' | 'success' | 'warning' | 'error', altOptions) => {
    toast(message, { ...toastOptions, ...altOptions, type });
};
