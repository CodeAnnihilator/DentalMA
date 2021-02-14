import {connect} from 'react-redux';

import {
	editMeasurementName,
	deleteMeasurement,
} from 'library/common/actions/measurementActions';

import ProjectMeasurement from './ProjectMeasurement';

export default connect(null, {
	editMeasurementName,
	deleteMeasurement,
})(ProjectMeasurement);
