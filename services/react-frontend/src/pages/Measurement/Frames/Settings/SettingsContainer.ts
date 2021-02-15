import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {getReadySteps, getCameras} from 'library/common/selectors/settingsSelectors';
import {setActiveCameraId} from 'library/common/actions/settingsActions';

import Settings from './Settings';

const mapStateToProps = (store: RootState) => ({
	readySteps: getReadySteps(store) as any,
	cameras: getCameras(store) as any,
});

export default connect(mapStateToProps, {
	setActiveCameraId
})(Settings);
