/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import cn from 'classnames';
import dayjs from 'dayjs';

import Table from 'library/components/Table';

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
	
	const onRowClick = (id: number) => history.push(`/projects/${id}`);

	const tHead = projects.length ? Object.keys(projects[0]) : [];
	const tData = projects.map((project: object) => Object.values(project));

	tData.forEach((value: any[])  => {
		value[3] = dayjs(value[3]).format('H:m:s DD/MM/YYYY')
		value[4] = dayjs(value[4]).format('H:m:s DD/MM/YYYY')
	});

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