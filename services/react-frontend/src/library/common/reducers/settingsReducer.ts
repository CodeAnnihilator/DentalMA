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
	base64Img: string | null;
	xDeviation: number;
	yDeviation: number;
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
	base64Img: null,
	xDeviation: 1,
	yDeviation: 1,
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

		case getType(actions.saveBase64Img):

			return {
				...state,
				base64Img: action.payload,
			};

		case getType(actions.setXDeviation):

			return {
				...state,
				xDeviation: action.payload,
			};

		case getType(actions.setYDeviation):

			return {
				...state,
				yDeviation: action.payload,
			};

		case getType(actions.saveMeasurementDone):

			return {
				...initialState,
			};

		case getType(actions.setCameraFromCache):

			return {
				...state,
				camera: action.payload.device_name,
				calibrationRect: [
					parseFloat(action.payload.calibrationX1),
					parseFloat(action.payload.calibrationY1),
					parseFloat(action.payload.calibrationX2),
					parseFloat(action.payload.calibrationY2),
				]
			};

		default:
			return state;
	}
};
