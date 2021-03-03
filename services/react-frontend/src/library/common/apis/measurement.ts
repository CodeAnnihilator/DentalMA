import {fetch} from 'library/utilities/fetch';

export const createMeasurementRequest = (data: {projectId: string}) => fetch.post('/measurements', data).then(measurement => measurement);

export const getMeasurementByIdRequest = (id: number) => fetch.get(`/measurements/${id}`);

export const saveCurrentMeasurementRequest = (data: any) => fetch.put('/measurements', data).then(measurement => measurement);

export const saveCameraSettingsRequest = (data: any) => fetch.post('/cameras', data).then(camera => camera);

export const saveAnalysisRequest = (data: any) => fetch.post('/analysis', data).then(analysis => analysis);

export const deleteMeasurementRequest = (id: number) => fetch.delete(`/measurements/${id}`);
