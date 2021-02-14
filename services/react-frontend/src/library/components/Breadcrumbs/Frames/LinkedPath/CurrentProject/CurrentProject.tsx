import TextWithActionIcon from 'library/components/TextWithActionIcon';
import Modal from 'library/components/Modal';
import useObjectState from 'library/common/hooks/useObjectState';
import { useEffect } from 'react';

interface ICurrentProject {
	deleteProject: () => void;
	editProjectName: (value: string) => void;
	projectName: string;
	isProjectLoaded: string;
}

const CurrentProject = ({
	deleteProject,
	editProjectName,
	projectName,
	isProjectLoaded,
}: ICurrentProject) => {

	const [state, setState] = useObjectState({
		isModalOpen: false,
	})

	useEffect(() => {
	}, [projectName])

	if (!isProjectLoaded) return <div />;

	return (
		<>
			<TextWithActionIcon
				value={projectName}
				placeholder='edit project name'
				onConfirm={editProjectName}
				onRemove={() => setState({isModalOpen: true})}
			/>
			{
				state.isModalOpen && (
					<Modal
						onClose={() => setState({isModalOpen: false})}
						onConfirm={deleteProject}
						headerMessage='Are you sure?'
						bodyMessage='You are about to DELETE project. This action cannot be undone, and all project measurements would be removed along with it.'
					/>
				)
			}
		</>
	);
};

export default CurrentProject;
