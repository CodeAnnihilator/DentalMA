import React from 'react';
import {useHistory} from 'react-router-dom';

import SubHeader from 'library/components/SubHeader';
import TextWithActionIcon from 'library/components/TextWithActionIcon';
import Table from 'library/components/Table';

import styles from './projects.module.scss';

const table = {
	head: ['id', 'name', 'created at', 'updated at', 'groups count', 'teeth count', 'measurements'],
	data: [
		[0, 'Great Project #123', '21.01.2025', '25.05.2025', 2, 4, 5],
		[15, 'Great Project #123', '21.01.2025', '25.05.2025', 2, 4, 5],
		[18, 'Great Project #123', '21.01.2025', '25.05.2025', 2, 4, 5],
		[22, 'Great Project #123', '21.01.2025', '25.05.2025', 2, 4, 5],
		[25, 'Great Project #123', '21.01.2025', '25.05.2025', 2, 4, 5],
		[221, 'Great Project #123', '21.01.2025', '25.05.2025', 2, 4, 5],
		[224, 'Great Project #123', '21.01.2025', '25.05.2025', 2, 4, 5],
		[258, 'Great Project #123', '21.01.2025', '25.05.2025', 2, 4, 5],
		[259, 'Great Project #123', '21.01.2025', '25.05.2025', 2, 4, 5],
	],
};

const Projects = () => {

	const history = useHistory();

	const onRowClick = (id: number) => history.push(`/projects/${id}`);

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
