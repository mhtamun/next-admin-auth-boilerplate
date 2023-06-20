import { toast, Zoom } from 'react-toastify';

const toastOptions = {
    position: 'top-right',
    theme: 'colored',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    transition: Zoom,
};

export const showSuccessToast = (message) => {
    toast.success(message, toastOptions);
};

export const showErrorToast = (message) => {
    toast.error(message, toastOptions);
};

export const showApiCallLoaderToast = (newPromise, pendingMessage) => {
    const id = toast.loading(pendingMessage, { ...toastOptions, autoClose: false, hideProgressBar: false });

    return new Promise((resolve, reject) => {
        newPromise
            .then((response) => {
                toast.dismiss(id.current);

                resolve(response);
            })
            .catch((error) => {
                toast.dismiss(id.current);

                reject(error);
            });
    });
};

export const showSimpleToast = (message) => {
    toast.info(message, toastOptions);
};
