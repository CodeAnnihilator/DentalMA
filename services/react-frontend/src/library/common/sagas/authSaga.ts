import {call, put, select, takeLatest} from 'redux-saga/effects';

import {getUserRequest} from '../apis/auth';
import {getIsUser} from '../selectors/authSelectors';
import {requestUser, requestUserSuccess} from '../actions/authActions';
import {AuthTypes} from '../types/authTypes';

function* authActionSaga(action: ReturnType<typeof requestUser>) {
	const user = yield select(getIsUser);
	if (user) return;
	try {
		const {data} = yield call(getUserRequest);
		yield put(requestUserSuccess(data));
	} catch (error) {
		console.log(error);
	}
}

export default function* watchTest() {
	yield takeLatest(AuthTypes.REQUEST_USER, authActionSaga);
}
