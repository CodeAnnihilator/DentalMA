import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	getActiveStep,
	getActiveCameraId,
	getIsCalibrationActive,
	getCalibration,
	getPictureLabel
} from 'library/common/selectors/settingsSelectors';

import {
	saveCameras,
	requestOCRMeasurement,
	removeCalibration,
	setIsCalibrationActive,
} from 'library/common/actions/settingsActions';

import Measurement from './Measurement';

const mapStateToProps = (store: RootState) => ({
	activeStep: getActiveStep(store),
	activeCameraId: getActiveCameraId(store) as any,
	isCalibrationActive: getIsCalibrationActive(store) as any,
	pictureLabel: getPictureLabel(store) as any,
	calibration: getCalibration(store) as any,
});

export default connect(mapStateToProps, {
	saveCameras,
	requestOCRMeasurement,
	removeCalibration,
	setIsCalibrationActive,
})(Measurement);