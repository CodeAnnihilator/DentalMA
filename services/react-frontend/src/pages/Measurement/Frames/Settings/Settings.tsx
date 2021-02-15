import DropDown from 'library/components/DropDown';
import MetaButton from 'library/components/MetaButton';

import styles from './settings.module.scss';

interface ISettings {
	readySteps: number[];
	cameras: object[];
	setActiveCameraId: (cameraId: string) => void;
}

const Settings = ({
	readySteps,
	cameras,
	setActiveCameraId
}: ISettings) => {
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
			<DropDown
				options={cameras}
				placeholder='select camera...'
				onSelect={setActiveCameraId}
			/>
			<MetaButton label='magnification' />
			<MetaButton label='calibration' value='200 px' />
			<MetaButton label='take picture' />
			<MetaButton label='meta' value='meta' />
		</div>
	);
};

export default Settings;
