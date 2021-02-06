import React from 'react';
import {Trans} from 'react-i18next';
import {Link} from 'react-router-dom';

import HeaderFrame from './Frames/HeaderFrame/';

import styles from './app.module.scss';

export interface IApp {
	isToggled: boolean;
	data: string;
	testAction: () => void;
	testActionWithData: (data: string) => void;
}

const App: React.FC<IApp> = ({
	isToggled,
	data,
	testAction,
	testActionWithData,
}: IApp) => (
	<div className={styles.app}>
		<HeaderFrame />
		<br />
		<div onClick={() => testAction()}>
			{data}{isToggled ? '+' : '-'}
		</div>
		<br />
		<div onClick={() => testActionWithData('new data')}>
			<Trans i18nKey='test' />
		</div>
		<Link to='/test'>go to test route</Link>
	</div>
);

export default App;
