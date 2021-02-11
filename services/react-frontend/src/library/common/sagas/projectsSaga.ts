import {call, put, select, takeLatest} from 'redux-saga/effects';

import {getIsUser} from '../selectors/authSelectors';

import {ProjectTypes} from '../types/projectTypes';

import {
	createProjectRequest,
	getProjectsRequest,
	getMeasurementsRequest,
} from '../apis/projects';

import {
	createProject,
	createProjectSuccess,
	requestProjects,
	requestProjectsSuccess,
	requestMeasurements,
	requestMeasurementsSuccess,
} from '../actions/projectActions';

function* createProjectSaga(action: ReturnType<typeof createProject>) {
	try {
		const name = action.payload;
		const {id: userId} = yield select(getIsUser);
		const {data: project} = yield call(() => createProjectRequest({name, userId}));
		yield put(createProjectSuccess(project));
	} catch (error) {
		console.log(error);
	}
}

function* requestProjectsSaga(action: ReturnType<typeof requestProjects>) {
	try {
		const {data: projects} = yield call(getProjectsRequest);
		yield put(requestProjectsSuccess(projects));
	} catch (error) {
		console.log(error);
	}
}

function* requestMeasurementsSaga(action: ReturnType<typeof requestMeasurements>) {
	try {
		const {data: measurements} = yield call(() => getMeasurementsRequest(action.payload));
		yield put(requestMeasurementsSuccess(measurements));
	} catch (error) {
		console.log(error);
	}
}

export default function* watchProjects() {
	yield takeLatest(ProjectTypes.CREATE_PROJECT, createProjectSaga);
	yield takeLatest(ProjectTypes.REQUEST_PROJECTS, requestProjectsSaga);
	yield takeLatest(ProjectTypes.REQUEST_MEASUREMENTS, requestMeasurementsSaga);
}
