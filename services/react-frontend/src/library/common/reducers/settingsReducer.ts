/* eslint-disable import/no-anonymous-default-export */
import {ActionType, getType} from 'typesafe-actions';

import * as actions from '../actions/settingsActions';

interface IMeta {
	groupId: number;
	toothId: number;
	time: number;
	substrate: number;
	location: number;
}

export type SettingsState = Readonly<{
	cameras: object[];
	camera: string | null;
	magnification: number | null;
	calibration: number | null;
	picture: string | null;
	meta: IMeta | null;
	activeStep: number;
}>;

const initialState: SettingsState = {
	cameras: [],
	camera: null,
	magnification: null,
	calibration: null,
	picture: null,
	meta: null,
	activeStep: 0,
};

export type SettingsActions = ActionType<typeof actions>;

export default (state = initialState, action: SettingsActions): SettingsState => {
	switch (action.type) {

		case getType(actions.saveCameras):

			return {
				...state,
				cameras: action.payload,
			};

		case getType(actions.setActiveCameraId):

			return {
				...state,
				camera: action.payload,
			};

		default:
			return state;
	}
};
