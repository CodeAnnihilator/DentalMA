import React, { useEffect } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import cn from 'classnames';

import TextWithActionIcon from 'library/components/TextWithActionIcon';
import Modal from 'library/components/Modal';

import folderSVG from 'resources/icons/folder.svg';
import fileSVG from 'resources/icons/file.svg';
import rightArrowSVG from 'resources/icons/right-arrow.svg';

import useObjectState from 'library/common/hooks/useObjectState';

import styles from './breadcrumbs.module.scss';

const pushTo = (index: number, arr: string[]) => (`/${arr.slice(0, index + 1).join('/')}`);

interface IBreadcrumbs {
	createProject: (text: string) => void;
	deleteProject: () => void;
	requestProjectById: (id: number) => void;
	editProjectName: (value: string) => void;
	projectName: string;
	isProjectLoaded: boolean;
}

const Breadcrumbs = ({
	createProject,
	deleteProject,
	requestProjectById,
	editProjectName,
	projectName,
	isProjectLoaded,
}: IBreadcrumbs) => {

	const [state, setState] = useObjectState({
		isDeleteProjectModalOpen: false,
	})

	const history = useHistory();
	const {pathname} = useLocation();
	const splittedRoutePath = pathname.split('/').filter(sub => sub !== '');

	useEffect(() => {
		if (type === 'currentProject' || type === 'projectMeasurement') {
			const projectId = parseInt(splittedRoutePath[1], 10);
			requestProjectById(projectId);
		}
	}, [pathname]);

	const routeRenderType = () => {
		const p = splittedRoutePath;
		const projectsPath = p.length === 1 && p[0] === 'projects';
		const projectPath = p.length === 2 && p[0] === 'projects';
		if (projectsPath) return 'newProject';
		if (projectPath) return 'currentProject';
		return 'projectMeasurement';

	};

	const type = routeRenderType();
	const currentIndex = parseInt(splittedRoutePath[splittedRoutePath.length - 1], 10);

	const setBreadcrumbLabel = (sub: string, index: number) => {
		if (index === 1) return projectName;
		if (index === 2) return `measurement #${sub}`;
	
		return sub;
	};

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
							<span className={cn({[styles.notLast]: arr[index + 1]})}>{setBreadcrumbLabel(sub, index)}</span>
						</div>
					</div>
				))
			}
			{type === 'newProject' && (
				<TextWithActionIcon
					isNew={true}
					placeholder='create new project'
					onConfirm={(value: string) => createProject(value)}
				/>
			)}
			{type === 'currentProject' && isProjectLoaded && (
				<>
					<TextWithActionIcon
						value={projectName}
						placeholder='edit project name'
						onConfirm={(value: string) => editProjectName(value)}
						onRemove={() => setState({isDeleteProjectModalOpen: true})}
					/>
					{
						state.isDeleteProjectModalOpen && (
							<Modal
								onClose={() => setState({isDeleteProjectModalOpen: false})}
								onConfirm={deleteProject}
								headerMessage='Are you sure?'
								bodyMessage='You are about to DELETE project. This action cannot be undone, and all project measurements would be removed along with it.'
							/>
						)
					}
				</>
			)}
			{type === 'projectMeasurement' && (
				<TextWithActionIcon
					placeholder='edit measurement name'
					onConfirm={(value: string) => console.log('edit measurement name: ' + value)}
					onRemove={() => console.log('remove measurement' + currentIndex)}
				/>
			)}
		</div>
	);
};

export default Breadcrumbs;
