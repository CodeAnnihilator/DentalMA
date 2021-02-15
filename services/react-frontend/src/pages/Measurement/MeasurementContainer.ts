import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {getActiveStep, getActiveCameraId} from 'library/common/selectors/settingsSelectors';

import {saveCameras} from 'library/common/actions/settingsActions';

import Measurement from './Measurement';

const mapStateToProps = (store: RootState) => ({
	activeStep: getActiveStep(store),
	activeCameraId: getActiveCameraId(store) as any,
});

export default connect(mapStateToProps, {
	saveCameras,
})(Measurement);
