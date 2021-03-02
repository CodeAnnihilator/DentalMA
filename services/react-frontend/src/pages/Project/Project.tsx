/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {store} from 'react-notifications-component';
import cn from 'classnames';

import Table from 'library/components/Table';
import formatDatesInArray from 'library/utilities/formatDatesInArray';

import styles from './project.module.scss';

interface IMeasurements {
	measurements: object[];
	requestMeasurements: (projectId: number) => void;
	match: any;
}

const Project = ({
	measurements,
	requestMeasurements,
	...props
}: IMeasurements) => {

	useEffect(() => {
		const projectId = props.match.params.projectId;
		requestMeasurements(projectId);
	}, [])

	const history = useHistory();
	const path = history.location.pathname;

	const onRowClick = (row: any) => {
		if (typeof row[2] === 'number') {
			store.addNotification({
				title: 'Current version limitation',
				message: 'Editing completed measurement is not implemented in this version of the application',
				type: 'info',
				insert: 'top',
				container: 'top-right',
				animationIn: ['animate__animated', 'animate__fadeIn'],
				animationOut: ['animate__animated', 'animate__fadeOut'],
				dismiss: {
					duration: 3000,
					onScreen: true
				}
			});
			return;
		};
		history.push(`${path}/${row[0]}`)
	};

	const tHead = measurements.length ? Object.keys(measurements[0]) : [];
	const tData = formatDatesInArray(measurements, ['createdAt', 'updatedAt'], 'H:m:s DD/MM/YYYY');

	return (
		<div className={cn(styles.wrapper, {[styles.empty]: !measurements.length})}>
			{
				measurements.length
					? (
						<Table
							head={tHead}
							data={tData}
							onRowClick={onRowClick}
						/> 
					)
					: <div>There are no measurements. You need to create one.</div>
			}
		</div>
	);
};

export default Project;
