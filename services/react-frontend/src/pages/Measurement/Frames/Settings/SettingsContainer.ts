import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	getReadySteps,
	getCameras,
	getCalibrated,
	getMagnification,
	getIsCalibrationActive,
	getPictureLabel,
	getActiveCameraId,
	getActiveCameraLabel,
	getMeta,
} from 'library/common/selectors/settingsSelectors';

import {
	setActiveCameraId,
	setIsCalibrationActive,
	removeCalibration,
	removePictureLabel,
	setMagnification,
	setPictureLabel,
	setActiveStep,
	setMetaData,
} from 'library/common/actions/settingsActions';

import Settings from './Settings';

const mapStateToProps = (store: RootState) => ({
	readySteps: getReadySteps(store) as any,
	cameras: getCameras(store) as any,
	calibration: getCalibrated(store) as any,
	magnification: getMagnification(store) as any,
	isCalibrationActive: getIsCalibrationActive(store) as any,
	pictureLabel: getPictureLabel(store) as any,
	activeCameraId: getActiveCameraId(store) as any,
	activeCameraLabel: getActiveCameraLabel(store) as any,
	meta: getMeta(store) as any,
});

export default connect(mapStateToProps, {
	setActiveCameraId,
	setIsCalibrationActive,
	setPictureLabel,
	removeCalibration,
	setMagnification,
	removePictureLabel,
	setActiveStep,
	setMetaData,
})(Settings);
