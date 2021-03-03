import {call, put, select, takeLatest} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import {store} from 'react-notifications-component';

import {
	MeasurementTypes,
} from '../types/measurementTypes';

import {
	getCurrentProject,
	getCurrentMeasurement,
} from '../selectors/projectSelectors';
import {getLocation} from './../selectors/routerSelectors';

import {
	createMeasurementRequest,
	getMeasurementByIdRequest,
	saveCurrentMeasurementRequest,
	deleteMeasurementRequest,
} from '../apis/measurement';

import {
	createMeasurement,
	createMeasurementSuccess,
	editMeasurementName,
	deleteMeasurement,
	requestMeasurementById,
	requestMeasurementByIdSuccess,
	editMeasurementNameSuccess,
	deleteMeasurementSuccess,
} from '../actions/measurementActions';

function* createMeasurementSaga(action: ReturnType<typeof createMeasurement>) {
	try {
		const {id: projectId} = yield select(getCurrentProject);
		const {data: measurement} = yield call(() => createMeasurementRequest({projectId}));
		yield put(createMeasurementSuccess(measurement));
		yield put(push(`/projects/${projectId}/${measurement.id}`));
	} catch (error) {
		console.log(error);
	}
}

function* editMeasurementNameSaga(action: ReturnType<typeof editMeasurementName>) {
	try {
		const measurement = yield select(getCurrentMeasurement);
		const measurementToUpdate = Object.assign(measurement, {name: action.payload})
		const {data: updatedMeasurement} = yield call(() => saveCurrentMeasurementRequest(measurementToUpdate));
		yield put(editMeasurementNameSuccess(updatedMeasurement));
	} catch (error) {
		console.log(error);
	}
}

function* deleteMeasurementSaga(action: ReturnType<typeof deleteMeasurement>) {
	try {
		const measurement = yield select(getCurrentMeasurement);
		const path = yield select(getLocation);
		const pushTo = path.split('/').filter((s: string, i: number, arr: string[]) => !!arr[i + 1]).join('/');
		yield call(deleteMeasurementRequest, measurement.id);
		yield put(deleteMeasurementSuccess());
		yield put(push(pushTo));
	} catch (error) {
		console.log(error);
	}
}

function* requestMeasurementByIdSaga(action: ReturnType<typeof requestMeasurementById>) {
	try {
		const {data: measurement} = yield call(getMeasurementByIdRequest, action.payload);
		yield put(requestMeasurementByIdSuccess(measurement));
	} catch (err) {
		const {status, error} = err.response.data;
		if (status === 400) {
			yield put(push('/projects'));
			store.addNotification({
				title: `Issue with measurement: ${action.payload}`,
				message: error,
				type: 'danger',
				insert: 'top',
				container: 'top-right',
				animationIn: ['animate__animated', 'animate__fadeIn'],
				animationOut: ['animate__animated', 'animate__fadeOut'],
				dismiss: {
					duration: 3000,
					onScreen: true
				}
			});
		}
	}
}

export default function* watchMeasurement() {
	yield takeLatest(MeasurementTypes.CREATE_MEASUREMENT, createMeasurementSaga);
	yield takeLatest(MeasurementTypes.EDIT_MEASUREMENT_NAME, editMeasurementNameSaga);
	yield takeLatest(MeasurementTypes.DELETE_MEASUREMENT, deleteMeasurementSaga);
	yield takeLatest(MeasurementTypes.REQUEST_MEASUREMENT_BY_ID, requestMeasurementByIdSaga);
}
