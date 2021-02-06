import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import testReducer from 'library/common/reducers/testReducer';

const createCoreReducer = (history: any) => combineReducers({
	router: connectRouter(history),
	test: testReducer,
});

export default createCoreReducer;
