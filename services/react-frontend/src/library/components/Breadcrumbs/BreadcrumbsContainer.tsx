import {connect} from 'react-redux';

import {
	createProject,
} from 'library/common/actions/projectActions';

import Breadcrumbs from './Breadcrumbs';

export default connect(null, {
	createProject,
})(Breadcrumbs);
