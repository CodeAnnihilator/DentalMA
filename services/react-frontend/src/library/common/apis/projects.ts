import {fetch} from 'library/utilities/fetch';
import IProject from '../interfaces/projects';

export const createProjectRequest = (data: any) => fetch.post('/projects', data).then(project => project);

export const getProjectsRequest = () => fetch.get('/projects');

export const getProjectByIdRequest = (id: number) => fetch.get(`/projects/${id}`);

export const getMeasurementsRequest = (projectId: number) => fetch.get(`/measurements?projectId=${projectId}`);

export const excelMQsRequest = (projectId: number) => fetch.get(`/measurements/excel?projectId=${projectId}`);

export const editProjectRequest = (data: IProject) => fetch.put('/projects', data).then(project => project);

export const deleteProjectRequest = (id: number) => fetch.delete(`/projects/${id}`);