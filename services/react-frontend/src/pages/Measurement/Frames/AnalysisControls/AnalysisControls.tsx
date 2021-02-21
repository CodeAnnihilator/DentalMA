import DropDown from 'library/components/DropDown';
import DotTextButton from 'library/components/Buttons/DotTextButton';
import ImgButton from 'library/components/Buttons/ImgButton';
import Devider from 'library/components/Devider';
import SlimButton from 'library/components/Buttons/SlimButton';

import moveSVG from 'resources/icons/move.svg';
import connectionSVG from 'resources/icons/connection.svg';
import backArrowSVG from 'resources/icons/back-arrow.svg';
import tableSVG from 'resources/icons/table.svg';

import styles from './analysisControls.module.scss';

const pickerData = [
	{id: '0', color: '#A4FF91', text: 'MQ1'},
	{id: '1', color: '#91FFF8', text: 'MQ2'},
	{id: '2', color: '#91AFFF', text: 'MQ3'},
	{id: '3', color: '#FBFF91', text: 'MQ4'},
	{id: '4', color: '#FFC391', text: 'MQ5'},
	{id: '5', color: '#FF9791', text: 'MQ6'},
	{id: '6', color: '#D691FF', text: 'MQ7'},
];

interface IAnalysisControls {
	readySteps: number[];
	setActiveStep: (v: number) => void;
}

const AnalysisControls = ({
	readySteps,
	setActiveStep,
}: IAnalysisControls) => {

	let settingsLabel = `SETTINGS: ${readySteps[0]}/${readySteps[1]}`;
	const stepOptions = [{label: settingsLabel, value: 0}, {label: 'MEASUREMENT', value: 1}]

	return (
		<div className={styles.wrapper}>
			<DropDown
				options={[...stepOptions]}
				placeholder='MEASUREMENT'
				isCompleted={false}
				onSelect={setActiveStep}
			/>
			<Devider type='double' />
			<ImgButton img={moveSVG} />
			<ImgButton img={connectionSVG} />
			<Devider type='double' />
			{ pickerData.map(o => <DotTextButton key={o.id} color={o.color} text={o.text} />) }
			<Devider type='double' />
			<ImgButton img={backArrowSVG} />
			<ImgButton img={backArrowSVG} direction='reverse' />
			<Devider type='double' />
			<ImgButton img={tableSVG} />
			<Devider type='double' />
			<SlimButton text={'complete'} />
		</div>
	);
};

export default AnalysisControls;
