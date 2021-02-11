import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	requestProjects,
} from 'library/common/actions/projectActions';

import {
	getProjects,
} from 'library/common/selectors/projectSelectors';

import Projects from './Projects';

const mapStateToProps = (store: RootState) => ({
	projects: getProjects(store),
});

export default connect(mapStateToProps, {
	requestProjects,
})(Projects);