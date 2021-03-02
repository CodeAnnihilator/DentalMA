import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import configureStore, {history} from 'core/store/configureStore';
import configureI18n from 'core/i18n/configureI18n';

import RoutesContainer from 'core/RoutesContainer';

import 'react-notifications-component/dist/theme.css'
import 'resources/styles/index.scss';

async function render() {
	await configureI18n();
	ReactDOM.render((
			<Provider store={configureStore()}>
				<ConnectedRouter history={history}>
					<RoutesContainer />
				</ConnectedRouter>
			</Provider>
		),
		document.getElementById('root'),
	);
}

render();
