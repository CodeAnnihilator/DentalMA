import {createSelector} from 'reselect';

import {RootState} from 'core/store/configureStore';

const getAllSettingsData = (state: RootState) => state.settings;
const getAllCameras = (state: RootState) => state.settings.cameras;

export const getActiveCameraId = (state: RootState) => state.settings.camera;

export const getActiveStep = (state: RootState) => state.settings.activeStep;

export const getCameras = createSelector(
	[getAllCameras],
	(cameras: any) => cameras.map((c: any) => ({value: c.deviceId, label: c.label}))
)

export const getReadySteps = createSelector(
	[getAllSettingsData],
	(s: any) => {
		let completedSteps = 0;
		const skipFiels = ['activeStep', 'cameras'];
		const totalSteps = Object.keys(s).filter(v => !skipFiels.some(f => f === v));
		totalSteps.forEach(v => s[v] !== null && ++completedSteps)
		return [completedSteps, totalSteps.length]
	}
)