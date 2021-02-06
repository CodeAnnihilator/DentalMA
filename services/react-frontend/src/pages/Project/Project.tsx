import React from 'react';
import {useHistory} from 'react-router-dom';

import SubHeader from 'library/components/SubHeader';
import Table from 'library/components/Table';
import TextWithActionIcon from 'library/components/TextWithActionIcon';
import Button from 'library/components/Button';
// import SteppedProgress from 'library/components/SteppedProgress';

import ExcelSVG from 'resources/icons/excel.svg';
import DesignSVG from 'resources/icons/design.svg';

import styles from './project.module.scss';

const table = {
	head: ['id', 'name', 'created at', 'updated at', 'margins', 'group', 'tooth', 'time'],
	data: [
		[0, 'Measurement #22222', '21.01.2025', '25.05.2025', 2, 4, 5],
		[15, 'Measurement #22222', '21.01.2025', '25.05.2025', 2, 4, 5],
		[18, 'Measurement #22222', '21.01.2025', '25.05.2025', 2, 4, 5],
		[22, 'Measurement #22222', '21.01.2025', '25.05.2025', 2, 4, 5],
		[25, 'Measurement #22222', '21.01.2025', '25.05.2025', 2, 4, 5],
	],
};

const getProjectByRoute = (path: string) => {
	const pathArr = path.split('/');
	const projectId = pathArr[pathArr.length - 1];

	return `Project #${projectId}`;
};

const Projects = () => {

	const history = useHistory();

	const path = history.location.pathname;

	const onRowClick = (id: number) => history.push(`${path}/${id}`);

	return (
		<div className={styles.wrapper}>
			<Table
				head={table.head}
				data={table.data}
				onRowClick={onRowClick}
			/>
		</div>
	);
};

export default Projects;
