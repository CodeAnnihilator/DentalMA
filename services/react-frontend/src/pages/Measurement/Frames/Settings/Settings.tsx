import DropDown from 'library/components/DropDown';
import TextInput from 'library/components/Input';
import MetaButton from 'library/components/MetaButton';

import styles from './settings.module.scss';

interface ISettings {
	readySteps: number[];
	cameras: object[];
	calibration?: string;
	isCalibrationActive?: any;
	setIsCalibrationActive?: ((isActive: boolean) => void) | any;
	magnification: number;
	pictureLabel: string;
	setActiveCameraId: (cameraId: string) => void;
	removeCalibration?: () => void | any;
	removePictureLabel?: () => void | any;
	setMagnification?: ((v: string) => void) | any;
	setPictureLabel?: (v: number) => void | any;
}

const Settings = ({
	readySteps,
	cameras,
	calibration,
	isCalibrationActive,
	setIsCalibrationActive,
	magnification,
	pictureLabel,
	setActiveCameraId,
	removeCalibration,
	removePictureLabel,
	setMagnification,
	setPictureLabel,
}: ISettings) => {

	const onHandleMagnChange = (e: any) => {
		if (e.target.validity.valid) {
			setMagnification(e.target.value)
		}
	}

	let settingsLabel = `SETTINGS: ${readySteps[0]}/${readySteps[1]}`;
	const stepOptions = [{label: settingsLabel, value: 0}, {label: 'MEASUREMENT', value: 1}]

	return (
		<div className={styles.wrapper}>
			<DropDown
				options={[...stepOptions]}
				placeholder={settingsLabel}
				isComplete={false}
				lockedIndex={1}
			/>
			<MetaButton label='meta' value='meta' />
			<TextInput
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
				options={cameras}
				placeholder='select camera...'
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
