import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	getActiveCameraId,
} from 'library/common/selectors/settingsSelectors';

import Analysis from './Analysis';

const mapStateToProps = (store: RootState) => ({
	activeCameraId: getActiveCameraId(store) as any,
});

export default connect(mapStateToProps)(Analysis);