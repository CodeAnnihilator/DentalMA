import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import testReducer from 'library/common/reducers/testReducer';
import authReducer from 'library/common/reducers/authReducer';
import projectsReducer from 'library/common/reducers/projectsReducer';
import measurementsReducer from 'library/common/reducers/measurementsReducer';

const createCoreReducer = (history: any) => combineReducers({
	router: connectRouter(history),
	auth: authReducer,
	test: testReducer,
	projects: projectsReducer,
	measurements: measurementsReducer,
});

export default createCoreReducer;
