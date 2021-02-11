/* eslint-disable import/no-anonymous-default-export */
import {ActionType, getType} from 'typesafe-actions';

import * as actions from '../actions/authActions';

export type AuthState = Readonly<{
	user: null | object;
}>;

const initialState: AuthState = {
	user: null,
};

export type AuthActions = ActionType<typeof actions>;

export default (state = initialState, action: AuthActions): AuthState => {
	switch (action.type) {

		case getType(actions.requestUserSuccess):
			return {
				...state,
				user: action.payload,
			};

		default:
			return state;
	}
};
