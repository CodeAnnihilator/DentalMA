import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	setActiveStep,
} from 'library/common/actions/settingsActions';

import {
	getReadySteps,
} from 'library/common/selectors/settingsSelectors';

import Settings from './AnalysisControls';

const mapStateToProps = (store: RootState) => ({
	readySteps: getReadySteps(store) as any,
});

export default connect(mapStateToProps, {
	setActiveStep,
})(Settings);
