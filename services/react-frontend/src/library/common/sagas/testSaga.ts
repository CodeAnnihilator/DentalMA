import {takeLatest} from 'redux-saga/effects';

import {testAction} from '../actions/testActions';
import {TestTypes} from '../types/testTypes';

function* testActionSaga(action: ReturnType<typeof testAction>) {
	yield true;
	console.log('here');
}

export default function* watchTest() {
	yield takeLatest(TestTypes.TEST_ACTION, testActionSaga);
}
