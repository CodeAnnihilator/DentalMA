import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {
	getCurrentProjectName,
	getIsProjectLoaded
} from 'library/common/selectors/projectSelectors';

import {
	deleteProject,
	editProjectName,
} from 'library/common/actions/projectActions';

import CurrentProject from './CurrentProject';

const mapStateToProps = (store: RootState) => ({
	projectName: getCurrentProjectName(store) as string,
	isProjectLoaded: getIsProjectLoaded(store) as any,
});

export default connect(mapStateToProps, {
	deleteProject,
	editProjectName,
})(CurrentProject);
