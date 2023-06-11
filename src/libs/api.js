import axios from 'axios';
import { store } from 'src/store';
import { start, incrementProgress, finish } from 'src/store/apiCallSlice';
import { getCookie } from './cookie-manager';

const instance = axios.create({
    timeout: 300000,
    validateStatus: (status) => status === 200,
});

instance.defaults.onDownloadProgress = (progressEvent) => {
    console.debug({ progressEvent });

    store.dispatch(incrementProgress((progressEvent.loaded / progressEvent.total) * 100));
};

instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent

        store.dispatch(start());

        console.debug('request', config);

        return config;
    },
    function (error) {
        // Do something with request error

        console.error('error', error);

        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        store.dispatch(finish());

        console.debug('response', response);

        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        store.dispatch(finish());

        if (!error) return null;

        if (!error.response) return null;

        if (!error.response.data) return null;

        console.error('response', error.response);

        return error.response.data;
    }
);

const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        Authorization: getCookie('token'),
    };
};

export const callPostApi = (url, payload) =>
    instance.post(url, payload, {
        headers: getHeaders(),
    });

export const callGetApi = (url) =>
    instance.get(url, {
        headers: getHeaders(),
    });

export const callPutApi = (url, payload) =>
    instance.put(url, payload, {
        headers: getHeaders(),
    });

export const callDeleteApi = (url) =>
    instance.delete(url, {
        headers: getHeaders(),
    });
