import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	getReadySteps,
	getCameras,
	getCalibrated,
	getMagnification,
	getIsCalibrationActive,
	getPictureLabel,
} from 'library/common/selectors/settingsSelectors';

import {
	setActiveCameraId,
	setIsCalibrationActive,
	removeCalibration,
	removePictureLabel,
	setMagnification,
	setPictureLabel,
} from 'library/common/actions/settingsActions';

import Settings from './Settings';

const mapStateToProps = (store: RootState) => ({
	readySteps: getReadySteps(store) as any,
	cameras: getCameras(store) as any,
	calibration: getCalibrated(store) as any,
	magnification: getMagnification(store) as any,
	isCalibrationActive: getIsCalibrationActive(store) as any,
	pictureLabel: getPictureLabel(store) as any,
});

export default connect(mapStateToProps, {
	setActiveCameraId,
	setIsCalibrationActive,
	setPictureLabel,
	removeCalibration,
	setMagnification,
	removePictureLabel,
})(Settings);
