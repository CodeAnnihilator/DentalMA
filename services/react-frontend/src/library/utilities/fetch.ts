import axios from 'axios';

export const fetch = axios.create({
	baseURL: 'http://0.0.0.0:9000/api/v1',
});

export const ocrFetch = axios.create({
	baseURL: 'http://0.0.0.0:5000/api/v1',
	headers: {'Access-Control-Allow-Origin': '*'}
});