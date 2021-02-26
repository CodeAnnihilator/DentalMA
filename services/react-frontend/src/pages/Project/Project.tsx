/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import cn from 'classnames';

import Table from 'library/components/Table';

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

	const onRowClick = (id: number) => history.push(`${path}/${id}`);

	const tHead = measurements.length ? Object.keys(measurements[0]) : [];
	const tData = measurements.map((project: object) => Object.values(project));

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
