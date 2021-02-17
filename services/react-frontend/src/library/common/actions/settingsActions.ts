import {createStandardAction} from 'typesafe-actions';

import {SettingsTypes} from '../types/settingsTypes';

export const saveCameras =
	createStandardAction(SettingsTypes.SAVE_CAMERAS)
		<object[]>();

export const setActiveCameraId =
	createStandardAction(SettingsTypes.SET_ACTIVE_CAMERA_ID)
		<string>();

export const requestOCRMeasurement =
	createStandardAction(SettingsTypes.REQUEST_OCR_MEASUREMENT)
		<any>();

export const requestOCRMeasurementSuccess =
	createStandardAction(SettingsTypes.REQUEST_OCR_MEASUREMENT_SUCCESS)
		<any>();

export const setIsCalibrationActive =
	createStandardAction(SettingsTypes.SET_IS_CALIBRATION_ACTIVE)
		<boolean>();

export const setIsCalibrationActiveSuccess =
	createStandardAction(SettingsTypes.SET_IS_CALIBRATION_ACTIVE_SUCCESS)
		<boolean>();

export const setPictureLabelSuccess =
	createStandardAction(SettingsTypes.SET_PICTURE_LABEL_SUCCESS)
		<string>();

export const setMagnification =
	createStandardAction(SettingsTypes.SET_MAGNIFICATION)
		<string>();

export const setPictureLabel = createStandardAction(SettingsTypes.SET_PICTURE_LABEL)();
export const removeCalibration = createStandardAction(SettingsTypes.REMOVE_CALIBRATION)();
export const removePictureLabel = createStandardAction(SettingsTypes.REMOVE_PICTURE_LABEL)();