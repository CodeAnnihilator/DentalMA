import React, {useState} from 'react';

import OptionPicker from 'library/components/OptionPicker';

import Parameters from './Frames/Parameters';

import SettingsSVG from 'resources/icons/settings.svg';
import Camera1SVG from 'resources/icons/camera1.svg';
import Design1SVG from 'resources/icons/measurement.svg';

import styles from './settings.module.scss';
import Output from './Frames/Output';
import Calibration from './Frames/Calibration';



const options = [
	{icon: SettingsSVG, text: 'meta data', desc: 'initial parameters'},
	{icon: Camera1SVG, text: 'device info', desc: 'streaming camera' },
	{icon: Design1SVG, text: 'calibration', desc: 'canvas adjustments'},
]

const Settings = () => {

	const [activeId, setActiveId] = useState(0);

	return (
		<div className={styles.wrapper}>
			<OptionPicker
				title='settings'
				options={options}
				activeId={activeId}
				enabled={[0, 1, 2]}
				onSelect={setActiveId}
			/>
			{activeId === 0 && <Parameters />}
			{activeId === 1 && <Output />}
			{activeId === 2 && <Calibration />}
		</div>
	);
};

export default Settings;
