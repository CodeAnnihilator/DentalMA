import DropDown from 'library/components/DropDown';
import TextInput from 'library/components/Input';
import MetaButton from 'library/components/Buttons/MetaButton';
import Modal from 'library/components/Modal';
import useObjectState from 'library/common/hooks/useObjectState';
import { IMeta } from 'library/common/interfaces/settings';

import checkIfAnyEmptyField from 'pages/Measurement/utils/checkIfAnyEmptyField';

import MetaModalContent from './Frames/MetaModalContent';

import styles from './settings.module.scss';

interface ISettings {
	readySteps: number[];
	cameras: object[];
	calibration?: string;
	isCalibrationActive?: any;
	setIsCalibrationActive?: ((isActive: boolean) => void) | any;
	magnification: number;
	pictureLabel: string;
	activeCameraId: string;
	activeCameraLabel: string;
	setMagnification?: ((v: string) => void) | any;
	meta: IMeta;
	setMetaData: (o: IMeta) => void;
	setActiveCameraId: (v: string) => void;
	removeCalibration?: () => void | any;
	removePictureLabel?: () => void | any;
	setPictureLabel?: (v: number) => void | any;
	setActiveStep: (v: number) => void;
}

const Settings = ({
	readySteps,
	cameras,
	calibration,
	isCalibrationActive,
	setIsCalibrationActive,
	magnification,
	pictureLabel,
	setMagnification,
	activeCameraId,
	activeCameraLabel,
	meta,
	setActiveCameraId,
	removeCalibration,
	removePictureLabel,
	setPictureLabel,
	setActiveStep,
	setMetaData,
}: ISettings) => {

	const [state, setState] = useObjectState({
		isModalOpen: false,
		meta,
	})

	const onHandleMagnChange = (e: any) => {
		if (e.target.validity.valid) {
			setMagnification(e.target.value)
		}
	}

	const onHandleMetaDataModalClose = () => setState({isModalOpen: false});
	const onHandleMetaDataChange = (metaState: object) => setState({...state, meta: metaState});

	const onHandleMetaDataConfirm = () => {
		if (!checkIfAnyEmptyField(state.meta)) {
			onHandleMetaDataModalClose();
			setMetaData(state.meta);
		}
	}

	let settingsLabel = `SETTINGS: ${readySteps[0]}/${readySteps[1]}`;
	const stepOptions = [{label: settingsLabel, value: 0}, {label: 'MEASUREMENT', value: 1}]

	return (
		<div className={styles.wrapper}>
			{
				state.isModalOpen && (
					<Modal
						onClose={onHandleMetaDataModalClose}
						onConfirm={onHandleMetaDataConfirm}
						bodyComponent={() => (
							<MetaModalContent
								onChange={onHandleMetaDataChange}
								meta={meta}
							/>
						)}
					/>
				)
			}
			<DropDown
				options={[...stepOptions]}
				placeholder={settingsLabel}
				isCompleted={readySteps[0] === readySteps[1]}
				onSelect={setActiveStep}
				lockedIndex={1}
			/>
			<MetaButton
				label='meta'
				hasNoValue
				isCompleted={!checkIfAnyEmptyField(meta)}
				onClick={() => setState({isModalOpen: true})}
			/>
			<TextInput
				isCompleted={!!magnification}
				value={magnification}
				pattern='[0-9]*'
				placeholder='magnification...'
				onChange={onHandleMagnChange}
			/>
			{
				!!magnification && (
					<MetaButton
						label='calibration'
						value={calibration}
						isActive={isCalibrationActive}
						onClick={setIsCalibrationActive}
						onRemove={removeCalibration}
					/>
				)
			}
			<DropDown
				isCompleted={!!activeCameraId}
				options={cameras}
				placeholder={activeCameraLabel}
				onSelect={setActiveCameraId}
			/>
			<MetaButton
				label='take picture'
				value={pictureLabel}
				onClick={setPictureLabel}
				onRemove={removePictureLabel}
			/>
		</div>
	);
};

export default Settings;
