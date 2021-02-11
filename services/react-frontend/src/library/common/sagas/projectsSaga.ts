import {call, put, select, takeLatest} from 'redux-saga/effects';
import {push} from 'connected-react-router';

import {getIsUser} from '../selectors/authSelectors';

import {ProjectTypes} from '../types/projectTypes';

import {
	getCurrentProject,
	getProjects,
} from '../selectors/projectSelectors';

import {
	createProjectRequest,
	getProjectsRequest,
	getProjectByIdRequest,
	getMeasurementsRequest,
	editProjectRequest,
	deleteProjectRequest,
} from '../apis/projects';

import {
	createProject,
	createProjectSuccess,
	requestProjects,
	requestProjectsSuccess,
	requestProjectById,
	requestProjectByIdSuccess,
	requestMeasurements,
	requestMeasurementsSuccess,
	editProjectName,
	editProjectNameSuccess,
	deleteProject,
	deleteProjectSuccess
} from '../actions/projectActions';

import IProject from '../interfaces/projects';

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

function* requestProjectByIdSaga(action: ReturnType<typeof requestProjectById>) {
	try {
		const {data: project} = yield call(() => getProjectByIdRequest(action.payload));
		yield put(requestProjectByIdSuccess(project));
	} catch (error) {
		console.log(error);
	}
}

function* editProjectNameSaga(action: ReturnType<typeof editProjectName>) {
	try {
		const project = yield select(getCurrentProject);
		const projects = yield select(getProjects)
		const projectToUpdate = Object.assign(project, {name: action.payload})
		const {data: updatedProject} = yield call(() => editProjectRequest(projectToUpdate));
		const projectsToUpdate = projects.map((p: IProject) => p.id === project.id ? updatedProject : p);
		yield put(editProjectNameSuccess(updatedProject));
		yield put(requestProjectsSuccess(projectsToUpdate));
	} catch (error) {
		console.log(error);
	}
}

function* deleteProjectSaga(action: ReturnType<typeof deleteProject>) {
	try {
		const project = yield select(getCurrentProject);
		const projects = yield select(getProjects);
		const isRemoved = yield call(() => deleteProjectRequest(project.id));
		if (isRemoved) {
			const projectsToUpdate = projects.filter((p: IProject) => p.id !== project.id);
			yield put(deleteProjectSuccess(project.id));
			yield put(requestProjectsSuccess(projectsToUpdate));
		}
		yield put(push('/projects'))
	} catch (error) {
		console.log(error);
	}
}

export default function* watchProjects() {
	yield takeLatest(ProjectTypes.CREATE_PROJECT, createProjectSaga);
	yield takeLatest(ProjectTypes.REQUEST_PROJECTS, requestProjectsSaga);
	yield takeLatest(ProjectTypes.REQUEST_MEASUREMENTS, requestMeasurementsSaga);
	yield takeLatest(ProjectTypes.REQUEST_PROJECT_BY_ID, requestProjectByIdSaga);
	yield takeLatest(ProjectTypes.EDIT_PROJECT_NAME, editProjectNameSaga);
	yield takeLatest(ProjectTypes.DELETE_PROJECT, deleteProjectSaga);
}
