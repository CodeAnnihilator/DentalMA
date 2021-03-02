/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import cn from 'classnames';

import Table from 'library/components/Table';
import formatDatesInArray from 'library/utilities/formatDatesInArray';

import styles from './projects.module.scss';

interface IProjects {
	projects: object[] | any;
	requestProjects: () => void;
}

const Projects = ({
	projects,
	requestProjects
}: IProjects) => {

	useEffect(() => {
		if (!projects.length) {
			requestProjects()
		}
	}, []);

	const history = useHistory();
	
	const onRowClick = (row: any) => history.push(`/projects/${row[0]}`);

	const tHead = projects.length ? Object.keys(projects[0]) : [];
	const tData = formatDatesInArray(projects, ['createdAt', 'updatedAt'], 'H:m:s DD/MM/YYYY');

	return (
		<div className={cn(styles.wrapper, {[styles.empty]: !projects.length})}>
			{
				projects.length
					? (
						<Table
							head={tHead}
							data={tData}
							onRowClick={onRowClick}
						/> 
					)
					: <div>There are no projects. You need to create one.</div>
			}
		</div>
	);
};

export default Projects;