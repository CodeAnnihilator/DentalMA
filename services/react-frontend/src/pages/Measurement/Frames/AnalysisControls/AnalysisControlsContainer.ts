import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	setActiveStep,
} from 'library/common/actions/settingsActions';

import {
	getReadySteps,
} from 'library/common/selectors/settingsSelectors';

import {
	setActiveControl,
	setActiveMq,
} from 'library/common/actions/analysisActions';

import {
	getActiveControl,
	getMqSettings,
	getActiveMQ,
	getExcelData,
} from 'library/common/selectors/analysisSelectors';

import Settings from './AnalysisControls';

const mapStateToProps = (store: RootState) => ({
	readySteps: getReadySteps(store) as any,
	activeControl: getActiveControl(store) as any,
	mqSettings: getMqSettings(store) as any,
	activeMQ: getActiveMQ(store) as any,
	excelData: getExcelData(store) as any,
});

export default connect(mapStateToProps, {
	setActiveStep,
	setActiveControl,
	setActiveMq,
})(Settings);