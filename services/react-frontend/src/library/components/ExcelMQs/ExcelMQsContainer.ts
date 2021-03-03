import {connect} from 'react-redux';

import {RootState} from 'core/store/configureStore';

import {getExcelMQs, getColorMQById} from 'library/common/selectors/analysisSelectors';

import {requestExcelMQs} from 'library/common/actions/analysisActions';

import ExcelMQs from './ExcelMQs';

const mapStateToProps = (store: RootState) => ({
	excelMQs: getExcelMQs(store) as any,
	colorMQById: (id: number) => getColorMQById(store, id) as any,
});

export default connect(mapStateToProps, {
	requestExcelMQs,
})(ExcelMQs);
