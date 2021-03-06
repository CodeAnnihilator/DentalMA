import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	getActiveStep,
} from 'library/common/selectors/settingsSelectors';

import Measurement from './Measurement';

const mapStateToProps = (store: RootState) => ({
	activeStep: getActiveStep(store),
});

export default connect(mapStateToProps)(Measurement);