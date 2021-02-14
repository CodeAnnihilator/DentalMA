import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import testReducer from 'library/common/reducers/testReducer';
import authReducer from 'library/common/reducers/authReducer';
import projectsReducer from 'library/common/reducers/projectsReducer';
import measurementsReducer from 'library/common/reducers/measurementsReducer';
import measurementReducer from 'library/common/reducers/measurementReducer';

const createCoreReducer = (history: any) => combineReducers({
	router: connectRouter(history),
	auth: authReducer,
	test: testReducer,
	projects: projectsReducer,
	project: measurementsReducer,
	measurement: measurementReducer,
});

export default createCoreReducer;
