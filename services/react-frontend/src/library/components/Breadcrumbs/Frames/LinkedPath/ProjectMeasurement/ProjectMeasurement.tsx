import TextWithActionIcon from 'library/components/TextWithActionIcon';
import Modal from 'library/components/Modal';
import useObjectState from 'library/common/hooks/useObjectState';

interface IProjectMeasurement {
	editMeasurementName: (value: string) => void;
	deleteMeasurement: () => void;
}

const ProjectMeasurement = ({
	editMeasurementName,
	deleteMeasurement,
}: IProjectMeasurement) => {

	const [state, setState] = useObjectState({
		isModalOpen: false,
	})

	return (
		<>
			<TextWithActionIcon
				placeholder='edit measurement name'
				onConfirm={editMeasurementName}
				onRemove={() => setState({isModalOpen: true})}
			/>
			{
				state.isModalOpen && (
					<Modal
						onClose={() => setState({isModalOpen: false})}
						onConfirm={deleteMeasurement}
						headerMessage='Are you sure?'
						bodyMessage='You are about to DELETE measurement. This action cannot be undone, and your data would be lost.'
					/>
				)
			}
		</>
	);
};

export default ProjectMeasurement;
