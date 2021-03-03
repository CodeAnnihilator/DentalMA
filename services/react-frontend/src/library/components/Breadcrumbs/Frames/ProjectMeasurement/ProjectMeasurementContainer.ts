import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	getCurrentMeasurementName,
} from 'library/common/selectors/projectSelectors';

import {
	editMeasurementName,
	deleteMeasurement,
} from 'library/common/actions/measurementActions';

import ProjectMeasurement from './ProjectMeasurement';

const mapStateToProps = (store: RootState) => ({
	measurementName: getCurrentMeasurementName(store) as string,
});

export default connect(mapStateToProps, {
	editMeasurementName,
	deleteMeasurement,
})(ProjectMeasurement);
