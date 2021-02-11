import React from 'react';
import cn from 'classnames';
import {useHistory, useLocation} from 'react-router-dom';

import TextWithActionIcon from 'library/components/TextWithActionIcon';

import folderSVG from 'resources/icons/folder.svg';
import fileSVG from 'resources/icons/file.svg';
import rightArrowSVG from 'resources/icons/right-arrow.svg';

import styles from './breadcrumbs.module.scss';

const pushTo = (index: number, arr: string[]) => (`/${arr.slice(0, index + 1).join('/')}`);

const setLabel = (sub: string, index: number) => {
	if (index === 1) return `project #${sub}`;
	if (index === 2) return `measurement #${sub}`;

	return sub;
};

interface IBreadcrumbs {
	createProject: (text: string) => void;
}

const Breadcrumbs = ({
	createProject,
}: IBreadcrumbs) => {

	const history = useHistory();

	const {pathname} = useLocation();

	const splittedRoutePath = pathname.split('/').filter(sub => sub !== '');

	const routeRenderType = () => {
		const p = splittedRoutePath;
		const projectsPath = p.length === 1 && p[0] === 'projects';
		const projectPath = p.length === 2 && p[0] === 'projects';
		if (projectsPath) return 'newProject';
		if (projectPath) return 'currentProject';
		return 'projectMeasurement';

	};

	const type = routeRenderType();
	const currentIndex = splittedRoutePath[splittedRoutePath.length - 1];

	const onCreateNewProject = (value: string) => createProject(value);
	const onEditProjectName = (value: string) => console.log('edit project name: ' + value);
	const onRemoveProject = () => console.log('remove project' + currentIndex);
	const onEditMeasurementName = (value: string) => console.log('edit measurement name: ' + value);
	const onRemoveMeasurement = () => console.log('remove measurement' + currentIndex);

	return (
		<div className={styles.wrapper}>
			{
				splittedRoutePath.map((sub, index, arr) => (
					<div
						key={index}
						className={cn(styles.navEl, {[styles.current]: !arr[index + 1]})}
						onClick={() => history.push(pushTo(index, arr))}
					>
						{ !!index && <img alt='' className={styles.arrowRight} src={rightArrowSVG} /> }
						<div className={styles.el}>
							<img alt='' className={styles.img} src={index === 2 ? fileSVG : folderSVG} />
							<span className={cn({[styles.notLast]: arr[index + 1]})}>{setLabel(sub, index)}</span>
						</div>
					</div>
				))
			}
			{type === 'newProject' && (
				<TextWithActionIcon
					isNew={true}
					placeholder='create new project'
					onConfirm={onCreateNewProject}
				/>
			)}
			{type === 'currentProject' && (
				<TextWithActionIcon
					placeholder='edit project name'
					onConfirm={onEditProjectName}
					onRemove={onRemoveProject}
				/>
			)}
			{type === 'projectMeasurement' && (
				<TextWithActionIcon
					placeholder='edit measurement name'
					onConfirm={onEditMeasurementName}
					onRemove={onRemoveMeasurement}
				/>
			)}
		</div>
	);
};

export default Breadcrumbs;
