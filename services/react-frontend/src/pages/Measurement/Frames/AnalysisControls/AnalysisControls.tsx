import DropDown from 'library/components/DropDown';
import DotTextButton from 'library/components/Buttons/DotTextButton';
import ImgButton from 'library/components/Buttons/ImgButton';
import Devider from 'library/components/Devider';
import SlimButton from 'library/components/Buttons/SlimButton';
import { IMQSettings } from 'library/common/reducers/analysisReducer';
import Modal from 'library/components/Modal';
import Table from 'library/components/Table';
import Dot from 'library/components/Dot';
import useObjectState from 'library/common/hooks/useObjectState';

import moveSVG from 'resources/icons/move.svg';
import connectionSVG from 'resources/icons/connection.svg';
import tableSVG from 'resources/icons/table.svg';

import styles from './analysisControls.module.scss';

interface IAnalysisControls {
	readySteps: number[];
	activeControl: number;
	mqSettings: IMQSettings[];
	activeMQ: number;
	excelData: any;
	setActiveControl: (v: number) => void;
	setActiveStep: (v: number) => void;
	setActiveMq: (v: number) => void;
}

const AnalysisControls = ({
	readySteps,
	activeControl,
	mqSettings,
	activeMQ,
	excelData,
	setActiveControl,
	setActiveStep,
	setActiveMq,
}: IAnalysisControls) => {

	let settingsLabel = `SETTINGS: ${readySteps[0]}/${readySteps[1]}`;
	const stepOptions = [{label: settingsLabel, value: 0}, {label: 'MEASUREMENT', value: 1}]

	const [state, setState] = useObjectState({
		isTableModalOpen: false,
	});

	const tHead = !!excelData ? Object.keys(excelData[0]) : [];
	const tData = !!excelData ? excelData.map((row: any) => Object.values({...row, color: (
		<Dot key={row[1]} color={row.color} />
	)})) : [];

	return (
		<>
			{
				state.isTableModalOpen && (
					<Modal
						style={{width: '90%', height: '50%'}}
						bodyComponent={() => (
							<>
								<div
									className={styles.close}
									onClick={() => setState({isTableModalOpen: false})}
								>x</div>
								<Table
									head={tHead}
									data={tData}
									onRowClick={() => console.log('asdasd')}
								/>
							</>
						)}
					/>
				)
			}
			<div className={styles.wrapper}>
				<DropDown
					options={[...stepOptions]}
					placeholder='MEASUREMENT'
					isCompleted={false}
					onSelect={setActiveStep}
				/>
				<Devider type='double' />
				<ImgButton
					img={moveSVG}
					isActive={!activeControl}
					onClick={() => setActiveControl(0)}
				/>
				<ImgButton
					img={connectionSVG}
					isActive={!!activeControl}
					onClick={() => setActiveControl(1)}
				/>
				<Devider type='double' />
				{
					mqSettings.map(o => (
						<DotTextButton
							key={o.id}
							color={o.color}
							text={o.text}
							isActive={o.id === activeMQ}
							onClick={() => setActiveMq(o.id)}
						/>
					))
				}
				<Devider type='double' />
				<ImgButton
					img={tableSVG}
					onClick={() => setState({isTableModalOpen: true})}
				/>
				<Devider type='double' />
				<SlimButton text={'complete'} />
			</div>
		</>
	);
};

export default AnalysisControls;
