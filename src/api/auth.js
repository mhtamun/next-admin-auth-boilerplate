import { callPostApi } from '../libs/api';
import { apiBaseUrl } from '../data/env';

export const login = (payload) => callPostApi(apiBaseUrl + '/api/v1/auth/sign-in', payload);

export const resetPassword = () => {};
