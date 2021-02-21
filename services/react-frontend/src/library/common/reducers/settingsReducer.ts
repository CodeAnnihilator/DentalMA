/* eslint-disable import/no-anonymous-default-export */
import {ActionType, getType} from 'typesafe-actions';

import * as actions from '../actions/settingsActions';

import { IMeta } from '../interfaces/settings';

export type SettingsState = Readonly<{
	cameras: object[];
	camera: string | null;
	magnification: string | null;
	calibration: number | null;
	calibrationRect: object | null;
	pictureLabel: string | null;
	meta: IMeta | null;
	activeStep: number;
	isCalibrationActive: boolean;
}>;

const initialState: SettingsState = {
	cameras: [],
	camera: null,
	magnification: '',
	calibration: null,
	calibrationRect: null,
	pictureLabel: null,
	meta: null,
	activeStep: 0,
	isCalibrationActive: false,
};

export type SettingsActions = ActionType<typeof actions>;

export default (state = initialState, action: SettingsActions): SettingsState => {
	switch (action.type) {

		case getType(actions.saveCameras):

			return {
				...state,
				cameras: action.payload,
			};

		case getType(actions.setPictureLabelSuccess):

			return {
				...state,
				pictureLabel: action.payload,
			};

		case getType(actions.setActiveCameraId):

			return {
				...initialState,
				cameras: state.cameras,
				magnification: state.magnification,
				camera: action.payload,
			};

		case getType(actions.requestOCRMeasurementSuccess):
			const {calibration, coords} = action.payload;
			return {
				...state,
				calibration: calibration,
				calibrationRect: coords,
			};

		case getType(actions.removeCalibration):

			return {
				...state,
				calibration: null,
				isCalibrationActive: false,
			};

		case getType(actions.setIsCalibrationActiveSuccess):

			return {
				...state,
				isCalibrationActive: action.payload,
			};

		case getType(actions.removePictureLabel):

			return {
				...state,
				pictureLabel: null,
			};

		case getType(actions.setMagnification):

			return {
				...state,
				magnification: action.payload,
			};

		case getType(actions.setMetaData):

			return {
				...state,
				meta: action.payload,
			};

		case getType(actions.setActiveStep):

			return {
				...state,
				activeStep: action.payload,
			};

		default:
			return state;
	}
};
