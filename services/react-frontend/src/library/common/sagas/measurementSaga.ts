import {call, put, select, takeLatest} from 'redux-saga/effects';
import {push} from 'connected-react-router';

import {
	MeasurementTypes,
} from '../types/measurementTypes';

import {
	getCurrentProject,
} from '../selectors/projectSelectors';

import {
	createMeasurementRequest,
	getMeasurementByIdRequest,
} from '../apis/measurement';

import {
	createMeasurement,
	createMeasurementSuccess,
	editMeasurementName,
	deleteMeasurement,
	requestMeasurementById,
	requestMeasurementByIdSuccess,
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
		const {id: project} = yield select(getCurrentProject);
		// const measurement = yield select(getCurrentMeasurement);
		// const {data: updatedProject} = yield call(() => editProjectRequest(projectToUpdate));
		// const projectsToUpdate = projects.map((p: IProject) => p.id === project.id ? updatedProject : p);
		// yield put(editProjectNameSuccess(updatedProject));
		// yield put(requestProjectsSuccess(projectsToUpdate));
	} catch (error) {
		console.log(error);
	}
}

function* deleteMeasurementSaga(action: ReturnType<typeof deleteMeasurement>) {
	try {
		// const {id: projectId} = yield select(getCurrentProject);
		// const {data: measurement} = yield call(() => createMeasurementRequest({projectId}));
		// yield put(createMeasurementSuccess(measurement));
		// yield put(push(`/projects/${projectId}/${measurement.id}`));
	} catch (error) {
		console.log(error);
	}
}

function* requestMeasurementByIdSaga(action: ReturnType<typeof requestMeasurementById>) {
	try {
		const {data: measurement} = yield call(() => getMeasurementByIdRequest(action.payload));
		yield put(requestMeasurementByIdSuccess(measurement));
	} catch (error) {
		console.log(error);
	}
}

export default function* watchMeasurement() {
	yield takeLatest(MeasurementTypes.CREATE_MEASUREMENT, createMeasurementSaga);
	yield takeLatest(MeasurementTypes.EDIT_MEASUREMENT_NAME, editMeasurementNameSaga);
	yield takeLatest(MeasurementTypes.DELETE_MEASUREMENT, deleteMeasurementSaga);
	yield takeLatest(MeasurementTypes.REQUEST_MEASUREMENT_BY_ID, requestMeasurementByIdSaga);
}
