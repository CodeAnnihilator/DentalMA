import {createStandardAction} from 'typesafe-actions';

import {SettingsTypes} from '../types/settingsTypes';

export const saveCameras =
	createStandardAction(SettingsTypes.SAVE_CAMERAS)
		<object[]>();

export const setActiveCameraId =
	createStandardAction(SettingsTypes.SET_ACTIVE_CAMERA_ID)
		<string>();