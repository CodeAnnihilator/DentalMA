import TextWithActionIcon from 'library/components/TextWithActionIcon';

interface ICreateProject {
	createProject: (text: string) => void;
}

const CreateProject = ({
	createProject,
}: ICreateProject) => (
	<TextWithActionIcon
		isNew={true}
		placeholder='create new project'
		onConfirm={createProject}
	/>
)

export default CreateProject;
