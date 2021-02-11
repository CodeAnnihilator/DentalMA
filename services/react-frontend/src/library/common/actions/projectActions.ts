import {createStandardAction} from 'typesafe-actions';

import {ProjectTypes} from '../types/projectTypes';

import IProject from '../interfaces/projects';

export const createProject =
	createStandardAction(ProjectTypes.CREATE_PROJECT)
		<string>();

export const createProjectSuccess =
	createStandardAction(ProjectTypes.CREATE_PROJECT_SUCCESS)
		<IProject>();

export const requestProjects = createStandardAction(ProjectTypes.REQUEST_PROJECTS)();

export const requestProjectsSuccess =
	createStandardAction(ProjectTypes.REQUEST_PROJECTS_SUCCESS)
		<IProject[]>();

export const requestMeasurements =
	createStandardAction(ProjectTypes.REQUEST_MEASUREMENTS)
		<number>();

export const requestMeasurementsSuccess =
	createStandardAction(ProjectTypes.REQUEST_MEASUREMENTS_SUCCESS)
		<object[]>();

export const requestProjectById =
	createStandardAction(ProjectTypes.REQUEST_PROJECT_BY_ID)
		<number>();

export const requestProjectByIdSuccess =
	createStandardAction(ProjectTypes.REQUEST_PROJECT_BY_ID_SUCCESS)
		<IProject>();

export const editProjectName =
	createStandardAction(ProjectTypes.EDIT_PROJECT_NAME)
		<string>();
	
export const editProjectNameSuccess =
	createStandardAction(ProjectTypes.EDIT_PROJECT_NAME_SUCCESS)
		<IProject>();

export const deleteProject = createStandardAction(ProjectTypes.DELETE_PROJECT)();

export const deleteProjectSuccess =
	createStandardAction(ProjectTypes.DELETE_PROJECT_SUCCESS)
		<number>();
