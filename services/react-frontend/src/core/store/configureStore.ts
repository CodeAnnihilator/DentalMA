import createSagaMiddleware from 'redux-saga';
import {StateType} from 'typesafe-actions';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router'

import createCoreReducer from '../coreReducer';
import coreSaga from '../coreSaga';

const sagaMiddleware = createSagaMiddleware();

export const history = require('history').createBrowserHistory();

const middlewares = composeWithDevTools(
	applyMiddleware(
		routerMiddleware(history),
		sagaMiddleware,
	),
);

const coreReducer = createCoreReducer(history);

export type RootState = StateType<typeof coreReducer>;

export default function configureStore(initialState = {}) {
	const store = createStore(coreReducer, initialState, middlewares);
	sagaMiddleware.run(coreSaga);

	return store;
}
