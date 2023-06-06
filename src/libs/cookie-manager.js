import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getCookie = (key) => {
    return cookies.get(key);
};

const setCookie = (key, value) => {
    cookies.set(key, value, { path: '/' });
};

const removeCookie = (key) => {
    return cookies.remove(key, { path: '/' });
};

export { getCookie, setCookie, removeCookie };
