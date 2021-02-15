/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';

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

	return (
		<div className={styles.wrapper}>
			<Table
				head={tHead}
				data={tData}
				onRowClick={onRowClick}
			/>
		</div>
	);
};

export default Projects;