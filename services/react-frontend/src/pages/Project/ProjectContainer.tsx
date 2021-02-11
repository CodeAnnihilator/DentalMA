import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	requestMeasurements,
} from 'library/common/actions/projectActions';

import {
	getMeasurements,
} from 'library/common/selectors/projectSelectors';

import Project from './Project';

const mapStateToProps = (store: RootState) => ({
	measurements: getMeasurements(store),
});

export default connect(mapStateToProps, {
	requestMeasurements,
})(Project);