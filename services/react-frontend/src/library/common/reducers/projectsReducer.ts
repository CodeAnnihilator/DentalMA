/* eslint-disable import/no-anonymous-default-export */
import {ActionType, getType} from 'typesafe-actions';

import * as actions from '../actions/projectActions';

import IProject from '../interfaces/projects';

import sortByDate from 'library/utilities/sortByDate';

export type ProjectsState = Readonly<{
	data: IProject[];
	currentProject: null | IProject;
	isLoading: boolean;
}>;

const initialState: ProjectsState = {
	data: [],
	currentProject: null,
	isLoading: false,
};

export type ProjectsActions = ActionType<typeof actions>;

export default (state = initialState, action: ProjectsActions): ProjectsState => {
	switch (action.type) {

		case getType(actions.createProjectSuccess):
			return {
				...state,
				data: [...state.data, action.payload] as IProject[],
			};

		case getType(actions.requestProjectsSuccess):
			return {
				...state,
				data: sortByDate(action.payload, 'updatedAt', 'DESC'),
			};

		case getType(actions.requestProjectById):
			return {
				...state,
				isLoading: true
			};

		case getType(actions.requestProjectByIdSuccess):
			return {
				...state,
				currentProject: action.payload as IProject,
				isLoading: false
			};			

		case getType(actions.editProjectNameSuccess):
			return {
				...state,
				currentProject: action.payload as IProject,
			};		

		case getType(actions.deleteProjectSuccess):
			return {
				...state,
				currentProject: null,
			};

		default:
			return state;
	}
};