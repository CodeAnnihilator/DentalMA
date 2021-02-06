import React from 'react';
import {useHistory} from 'react-router-dom';

import DentalCareSVG from 'resources/icons/dental-care.svg';

import styles from './header.module.scss';

const Header = () => {

	const history = useHistory();

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper} onClick={() => history.push('/projects')}>
				<img alt='' className={styles.img} src={DentalCareSVG} />
				<div>
					<div className={styles.appName}>Dental-Ma</div>
					<div className={styles.appDesc}>tooth margin analysis</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
