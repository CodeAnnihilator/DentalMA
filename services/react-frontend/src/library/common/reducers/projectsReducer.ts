/* eslint-disable import/no-anonymous-default-export */
import {ActionType, getType} from 'typesafe-actions';

import * as actions from '../actions/projectActions';

export type AuthState = Readonly<{
	data: object[];
}>;

const initialState: AuthState = {
	data: [],
};

export type AuthActions = ActionType<typeof actions>;

export default (state = initialState, action: AuthActions): AuthState => {
	switch (action.type) {

		case getType(actions.createProjectSuccess):
			return {
				...state,
				data: [...state.data, action.payload],
			};

		case getType(actions.requestProjectsSuccess):
			return {
				...state,
				data: [...state.data, ...action.payload],
			};

		default:
			return state;
	}
};
