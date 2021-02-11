import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	getCurrentProjectName,
	getIsProjectLoaded,
} from 'library/common/selectors/projectSelectors';

import {
	createProject,
	deleteProject,
	requestProjectById,
	editProjectName,
} from 'library/common/actions/projectActions';

import Breadcrumbs from './Breadcrumbs';

const mapStateToProps = (store: RootState) => ({
	projectName: getCurrentProjectName(store) as string,
	isProjectLoaded: getIsProjectLoaded(store) as boolean,
});

export default connect(mapStateToProps, {
	createProject,
	deleteProject,
	requestProjectById,
	editProjectName,
})(Breadcrumbs);
