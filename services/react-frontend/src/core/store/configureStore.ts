import createSagaMiddleware from 'redux-saga';
import {StateType} from 'typesafe-actions';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import createCoreReducer from '../coreReducer';
import coreSaga from '../coreSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = composeWithDevTools(
	applyMiddleware(sagaMiddleware),
);

export const history = require('history').createBrowserHistory();

const coreReducer = createCoreReducer(history);

export type RootState = StateType<typeof coreReducer>;

export default function configureStore(initialState = {}) {
	const store = createStore(coreReducer, initialState, middlewares);
	sagaMiddleware.run(coreSaga);

	return store;
}
