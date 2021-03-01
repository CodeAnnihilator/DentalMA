/* eslint-disable react-hooks/exhaustive-deps */
import DropDown from 'library/components/DropDown';
import TextInput from 'library/components/Input';
import MetaButton from 'library/components/Buttons/MetaButton';
import Modal from 'library/components/Modal';
import useObjectState from 'library/common/hooks/useObjectState';
import { IMeta } from 'library/common/interfaces/settings';

import checkIfAnyEmptyField from 'pages/Measurement/utils/checkIfAnyEmptyField';

import MetaModalContent from './Frames/MetaModalContent';

import styles from './settings.module.scss';
import { useEffect } from 'react';

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
	setXDeviation?: ((v: string) => void) | any;
	setYDeviation?: ((v: string) => void) | any;
	meta: IMeta;
	xDeviation: number;
	yDeviation: number;
	setMetaData: (o: IMeta) => void;
	setActiveCameraId: (v: string) => void;
	removeCalibration?: () => void | any;
	removePictureLabel?: () => void | any;
	setPictureLabel?: (v: number) => void | any;
	setActiveStep: (v: number) => void;
	requestLastCamera: () => void;
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
	xDeviation,
	yDeviation,
	setActiveCameraId,
	removeCalibration,
	removePictureLabel,
	setPictureLabel,
	setActiveStep,
	setMetaData,
	requestLastCamera,
	setXDeviation,
	setYDeviation,
}: ISettings) => {

	const [state, setState] = useObjectState({
		isModalOpen: false,
		meta,
	})

	useEffect(() => {
		if (cameras.length) {
			requestLastCamera();
		}
	}, [cameras]);

	const onHandleInputChange = (cb: any) => (e: any) => {
		if (e.target.validity.valid) {
			cb(e.target.value);
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
				isCompleted={!!xDeviation}
				value={xDeviation}
				pattern='[0-9\.]*'
				placeholder='x deviation...'
				onChange={onHandleInputChange(setXDeviation)}
			/>
			<TextInput
				isCompleted={!!yDeviation}
				value={yDeviation}
				pattern='[0-9\.]*'
				placeholder='y deviation...'
				onChange={onHandleInputChange(setYDeviation)}
			/>
			<TextInput
				isCompleted={!!magnification}
				value={magnification}
				pattern='[0-9]*'
				placeholder='magnification...'
				onChange={onHandleInputChange(setMagnification)}
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
			{
				activeCameraId && (
					<MetaButton
						label='take picture'
						value={pictureLabel}
						onClick={setPictureLabel}
						onRemove={removePictureLabel}
					/>
				)
			}
		</div>
	);
};

export default Settings;
