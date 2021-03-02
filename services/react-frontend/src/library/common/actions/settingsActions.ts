import {createStandardAction} from 'typesafe-actions';

import {SettingsTypes} from '../types/settingsTypes';
import { IMeta } from './../interfaces/settings';

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

export const setMetaData =
	createStandardAction(SettingsTypes.SET_META_DATA)
		<IMeta>();

export const setActiveStep =
	createStandardAction(SettingsTypes.SET_ACTIVE_STEP)
		<number>();

export const saveBase64Img =
	createStandardAction(SettingsTypes.SAVE_BASE64_IMG)
		<string>();

export const setXDeviation =
	createStandardAction(SettingsTypes.SET_X_DEVIATION)
		<number>();

export const setYDeviation =
	createStandardAction(SettingsTypes.SET_Y_DEVIATION)
		<number>();

export const setCameraFromCache =
	createStandardAction(SettingsTypes.SET_CAMERA_FROM_CACHE)
		<any>();

export const setMetaFromCache =
	createStandardAction(SettingsTypes.SET_META_FROM_CACHE)
		<any>();

export const setPictureLabel = createStandardAction(SettingsTypes.SET_PICTURE_LABEL)();
export const removeCalibration = createStandardAction(SettingsTypes.REMOVE_CALIBRATION)();
export const removePictureLabel = createStandardAction(SettingsTypes.REMOVE_PICTURE_LABEL)();
export const saveMeasurementDone = createStandardAction(SettingsTypes.SAVE_MEASUREMENT_DONE)();
export const requestLastCamera = createStandardAction(SettingsTypes.REQUEST_LAST_CAMERA)();