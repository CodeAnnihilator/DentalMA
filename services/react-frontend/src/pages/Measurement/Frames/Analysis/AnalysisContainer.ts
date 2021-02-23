import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	getActiveControl,
	getMqSettings,
	getActiveMQ,
	getCoords,
} from 'library/common/selectors/analysisSelectors';

import {
	updateCoordinates,
} from 'library/common/actions/analysisActions';

import {
	getBase64Img,
} from 'library/common/selectors/settingsSelectors';

import Analysis from './Analysis';

const mapStateToProps = (store: RootState) => ({
	base64Img: getBase64Img(store) as any,
	activeControl: getActiveControl(store) as any,
	mqSettings: getMqSettings(store) as any,
	activeMQ: getActiveMQ(store) as any,
	coords: getCoords(store) as any,
});

export default connect(mapStateToProps, {
	updateCoordinates,
})(Analysis);