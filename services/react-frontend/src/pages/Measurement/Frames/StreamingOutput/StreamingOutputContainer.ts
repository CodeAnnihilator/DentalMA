import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	getActiveCameraId,
	getIsCalibrationActive,
	getCalibration,
	getPictureLabel,
	getCalibrationRect,
} from 'library/common/selectors/settingsSelectors';

import {
	saveCameras,
	requestOCRMeasurement,
	removeCalibration,
	setIsCalibrationActive,
	saveBase64Img,
} from 'library/common/actions/settingsActions';

import StreamingOutput from './StreamingOutput';

const mapStateToProps = (store: RootState) => ({
	activeCameraId: getActiveCameraId(store) as any,
	isCalibrationActive: getIsCalibrationActive(store) as any,
	pictureLabel: getPictureLabel(store) as any,
	calibration: getCalibration(store) as any,
	calibrationRect: getCalibrationRect(store) as any,
});

export default connect(mapStateToProps, {
	saveCameras,
	requestOCRMeasurement,
	removeCalibration,
	setIsCalibrationActive,
	saveBase64Img,
})(StreamingOutput);