import {fetch} from 'library/utilities/fetch';

export const createMeasurementRequest = (data: {projectId: string}) => fetch.post('/measurements', data).then(measurement => measurement);

export const getMeasurementByIdRequest = (id: number) => fetch.get(`/measurements/${id}`);