import {call, put, select, takeLatest} from 'redux-saga/effects';
import {push} from 'connected-react-router';

import { getMQDistances } from './../selectors/analysisSelectors';
import { getLocation } from './../selectors/routerSelectors';
import { getIsUser } from 'library/common/selectors/authSelectors';
import { getMeta, getActiveCameraId, getCalibrationRect } from 'library/common/selectors/settingsSelectors';
import { getCurrentMeasurement } from './../selectors/projectSelectors';
import { requestCompleteMeasurement } from '../actions/analysisActions';
import { saveMeasurementDone as saveMeasurementDoneInSettings } from './../actions/settingsActions';
import { saveMeasurementDone as saveMeasurementDoneInAnalysis, requestExcelMQs, requestExcelMQsSuccess} from './../actions/analysisActions';
import { saveCurrentMeasurementRequest, saveCameraSettingsRequest, saveAnalysisRequest } from './../apis/measurement';
import { excelMQsRequest } from './../apis/projects';

import {AnalysisTypes} from '../types/analysisTypes';

function* requestCompleteMeasurementSaga(action: ReturnType<typeof requestCompleteMeasurement>) {

	try {

		const currentMeasurement = yield select(getCurrentMeasurement);
		const meta = yield select(getMeta);
		const camera = yield select(getActiveCameraId);
		const rect = yield select(getCalibrationRect);
		const user = yield select(getIsUser);
		const distances = yield select(getMQDistances);

		const newCurrentMeasurement = {...currentMeasurement, ...meta};
		const {createdAt, updatedAt, ...measurement} = newCurrentMeasurement;

		const cameraObj = {
			device_name: camera,
			calibrationX1: rect[0],
			calibrationY1: rect[1],
			calibrationX2: rect[2],
			calibrationY2: rect[3],
			userId: user.id
		}

		yield call(saveCurrentMeasurementRequest, measurement);
		yield call(saveCameraSettingsRequest, cameraObj);
		yield call(saveAnalysisRequest, {measurementId: measurement.id, data: distances});

		yield put(push(`/projects/${measurement.projectId}`));
		yield put(saveMeasurementDoneInSettings());
		yield put(saveMeasurementDoneInAnalysis());

	} catch (error) {
		console.log(error);
	}

}

function* requestExcelMQsSaga(action: ReturnType<typeof requestExcelMQs>) {
	try {
		const path = yield select(getLocation);
		const id = path.split('/')[2];
		const {data: excelMQs} = yield call(excelMQsRequest, id);
		yield put(requestExcelMQsSuccess(excelMQs));
	} catch (error) {
		console.log(error);
	}
}

export default function* analysisSaga() {
	yield takeLatest(AnalysisTypes.REQUEST_COMPLETE_MEASUREMENT, requestCompleteMeasurementSaga);
	yield takeLatest(AnalysisTypes.REQUEST_EXCEL_MQS, requestExcelMQsSaga);
}
