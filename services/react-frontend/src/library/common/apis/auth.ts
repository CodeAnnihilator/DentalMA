import {fetch} from 'library/utilities/fetch';

export const getUserRequest = () => fetch.get('/users/shadow');
