import {createSelector} from 'reselect';

import {RootState} from 'core/store/configureStore';

const getAllSettingsData = (state: RootState) => state.settings;
const getAllCameras = (state: RootState) => state.settings.cameras;

export const getCalibration = (state: RootState) => state.settings.calibration;
export const getActiveCameraId = (state: RootState) => state.settings.camera;
export const getIsCalibrationActive = (state: RootState) => state.settings.isCalibrationActive;
export const getActiveStep = (state: RootState) => state.settings.activeStep;
export const getPictureLabel = (state: RootState) => state.settings.pictureLabel;

export const getCameras = createSelector(
	[getAllCameras],
	(cameras: any) => cameras.map((c: any) => ({value: c.deviceId, label: c.label}))
)

export const getMagnification = (state: RootState) => state.settings.magnification;

export const getCalibrated = createSelector(
	[getCalibration, getMagnification],
	(calibration, magnification) => {
		if (!magnification || !calibration) return null;
		return `${parseInt(magnification, 10) / calibration} um/px`;
	}
)

export const getReadySteps = createSelector(
	[getAllSettingsData],
	(s: any) => {
		let completedSteps = 0;
		const skipFiels = ['activeStep', 'cameras', 'calibrationRect', 'isCalibrationActive'];
		const totalSteps = Object.keys(s).filter(v => !skipFiels.some(f => f === v));
		totalSteps.forEach(v => !!s[v] && ++completedSteps)
		return [completedSteps, totalSteps.length]
	}
)