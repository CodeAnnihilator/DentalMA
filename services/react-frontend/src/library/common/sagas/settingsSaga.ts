import {call, put, select, takeLatest} from 'redux-saga/effects';
import dayjs from 'dayjs';

import {SettingsTypes} from '../types/settingsTypes';
import {magnificationOCRRequest} from '../apis/settings';
import {
	getActiveCameraId,
	getIsCalibrationActive,
} from '../selectors/settingsSelectors';
import {
	requestOCRMeasurement,
	requestOCRMeasurementSuccess,
	setIsCalibrationActive,
	setIsCalibrationActiveSuccess,
	setActiveCameraId,
	setPictureLabelSuccess,
} from '../actions/settingsActions';

function* requestOCRMeasurementSaga(action: ReturnType<typeof requestOCRMeasurement>) {
	try {
		const {coords, img} = action.payload;
		var formData = new FormData();
		formData.set('file', img)
		const {data: calibration} = yield call(magnificationOCRRequest, formData);
		yield put(requestOCRMeasurementSuccess({calibration, coords}));
	} catch (error) {
		console.log(error);
	}
}

function* setIsCalibrationActiveSaga(action: ReturnType<typeof setIsCalibrationActive>) {
	try {
		const cameraId = yield select(getActiveCameraId);
		const isCalibrationActive = yield select(getIsCalibrationActive);
		if (!isCalibrationActive && cameraId) return yield put(setIsCalibrationActiveSuccess(true));
		if (!isCalibrationActive) return;
		yield put(setIsCalibrationActiveSuccess(false));
	} catch (error) {
		console.log(error);
	}
}

function* setActiveCameraIdSaga(action: ReturnType<typeof setActiveCameraId>) {
	try {
		const localizedFormat = require('dayjs/plugin/localizedFormat')
		dayjs.extend(localizedFormat)
		const timeLabel = dayjs(new Date()).format('LLL');
		yield put(setPictureLabelSuccess(`CREATED AT: ${timeLabel}`));
	} catch (error) {
		console.log(error);
	}
}

export default function* settingsSaga() {
	yield takeLatest(SettingsTypes.REQUEST_OCR_MEASUREMENT, requestOCRMeasurementSaga);
	yield takeLatest(SettingsTypes.SET_IS_CALIBRATION_ACTIVE, setIsCalibrationActiveSaga);
	yield takeLatest(SettingsTypes.SET_ACTIVE_CAMERA_ID, setActiveCameraIdSaga);
	yield takeLatest(SettingsTypes.SET_PICTURE_LABEL, setActiveCameraIdSaga);
}
