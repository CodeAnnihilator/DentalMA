import {createStandardAction} from 'typesafe-actions';

import {ProjectTypes} from '../types/projectTypes';

export const createProject =
	createStandardAction(ProjectTypes.CREATE_PROJECT)
		<string>();

export const createProjectSuccess =
	createStandardAction(ProjectTypes.CREATE_PROJECT_SUCCESS)
		<object>();

export const requestProjects = createStandardAction(ProjectTypes.REQUEST_PROJECTS)();

export const requestProjectsSuccess =
	createStandardAction(ProjectTypes.REQUEST_PROJECTS_SUCCESS)
		<object[]>();

export const requestMeasurements =
	createStandardAction(ProjectTypes.REQUEST_MEASUREMENTS)
		<number>();

export const requestMeasurementsSuccess =
	createStandardAction(ProjectTypes.REQUEST_MEASUREMENTS_SUCCESS)
		<object[]>();
