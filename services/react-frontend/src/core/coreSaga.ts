import {all, fork} from 'redux-saga/effects';

import testSaga from 'library/common/sagas/testSaga';
import authSaga from 'library/common/sagas/authSaga';
import projectsSaga from 'library/common/sagas/projectsSaga';
import measurementsSaga from 'library/common/sagas/measurementSaga';

export default function* coreSaga() {
	yield all([
		fork(testSaga),
		fork(authSaga),
		fork(projectsSaga),
		fork(measurementsSaga),
	]);
}
