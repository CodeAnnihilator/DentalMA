import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import configureStore, {history} from 'core/store/configureStore';
import configureI18n from 'core/i18n/configureI18n';

import Routes from 'core/Routes';

import 'resources/styles/index.scss';

async function render() {
	await configureI18n();
	ReactDOM.render((
			<Provider store={configureStore()}>
				<ConnectedRouter history={history}>
					<Routes />
				</ConnectedRouter>
			</Provider>
		),
		document.getElementById('root'),
	);
}

render();
