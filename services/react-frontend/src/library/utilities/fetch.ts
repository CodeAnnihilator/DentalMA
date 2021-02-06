import axios from 'axios';

export const fetch = axios.create({
	baseURL: 'http://0.0.0.0:5000/api/v1',
});
