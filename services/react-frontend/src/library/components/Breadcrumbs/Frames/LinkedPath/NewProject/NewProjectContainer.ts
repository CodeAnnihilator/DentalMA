import {connect} from 'react-redux';

import {
	createProject,
} from 'library/common/actions/projectActions';

import NewProject from './NewProject';

export default connect(null, {
	createProject,
})(NewProject);
