import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	getCurrentProjectName,
	getCurrentMeasurementName,
} from 'library/common/selectors/projectSelectors';
import {requestProjectById} from 'library/common/actions/projectActions';
import {requestMeasurementById} from 'library/common/actions/measurementActions';

import Breadcrumbs from './Breadcrumbs';

const mapStateToProps = (store: RootState) => ({
	projectName: getCurrentProjectName(store) as string,
	measurementName: getCurrentMeasurementName(store) as string,
});

export default connect(mapStateToProps, {
	requestProjectById,
	requestMeasurementById,
})(Breadcrumbs);
