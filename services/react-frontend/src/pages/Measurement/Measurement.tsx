/* eslint-disable react-hooks/exhaustive-deps */
import SubHeader from 'library/components/SubHeader';

import SettingsContainer from './Frames/Settings/SettingsContainer';
import StreamingOutputContainer from './Frames/StreamingOutput/StreamingOutputContainer';
import AnalysisControlsContainer from './Frames/AnalysisControls/AnalysisControlsContainer';
import AnalysisContainer from './Frames/Analysis/AnalysisContainer';

import styles from './measurement.module.scss';

interface IMeasurement {
	activeStep: number;
}

const Measurements = ({
	activeStep,
}: IMeasurement) => (
	<div className={styles.wrapper}>
		<SubHeader bottomBorder>
			{ activeStep === 0 && <SettingsContainer /> }
			{ activeStep === 1 && <AnalysisControlsContainer /> }
		</SubHeader>
		<div className={styles.outputWrapper}>
			{ activeStep === 0 && <StreamingOutputContainer /> }
			{ activeStep === 1 && <AnalysisContainer /> }
		</div>
	</div>
);

export default Measurements;
