import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {requestUser} from 'library/common/actions/authActions';
import {getIsUser} from 'library/common/selectors/authSelectors';

import {createMeasurement} from 'library/common/actions/measurementActions';

import Routes from './Routes';

const mapStateToProps = (store: RootState) => ({
	isUser: getIsUser(store),
});

export default connect(mapStateToProps, {
	requestUser,
	createMeasurement,
})(Routes);
