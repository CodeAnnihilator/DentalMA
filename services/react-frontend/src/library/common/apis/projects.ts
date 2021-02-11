import {fetch} from 'library/utilities/fetch';

export const createProjectRequest = (data: any) => fetch.post('/projects', data).then(project => project);

export const getProjectsRequest = () => fetch.get('/projects');

export const getMeasurementsRequest = (projectId: number) => fetch.get(`/measurements?projectId=${projectId}`);
