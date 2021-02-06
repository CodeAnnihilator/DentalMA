import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	testAction,
	testActionWithData,
} from 'library/common/actions/testActions';

import {
	getIsToggled,
	getData,
} from 'library/common/selectors/testSelectors';

import App from './App';

const mapStateToProps = (store: RootState) => ({
	isToggled: getIsToggled(store),
	data: getData(store),
});

export default connect(mapStateToProps, {
	testAction,
	testActionWithData,
})(App);
