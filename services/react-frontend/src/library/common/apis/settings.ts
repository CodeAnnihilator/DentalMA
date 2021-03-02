import {ocrFetch} from 'library/utilities/fetch';
import {fetch} from 'library/utilities/fetch';

export const magnificationOCRRequest = (formData: any) => ocrFetch.post('/detect-magnification', formData).then(data => data);

export const getMeasurementsRequest = (projectId: number) => fetch.get(`/measurements?projectId=${projectId}`);

export const lastCameraRequest = () => fetch.get('/cameras');

export const lastMeasurementRequest = () => fetch.get('/measurements/last');