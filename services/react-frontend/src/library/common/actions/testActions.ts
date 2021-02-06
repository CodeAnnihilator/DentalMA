import {createStandardAction} from 'typesafe-actions';

import {TestTypes} from '../types/testTypes';

export const testAction = createStandardAction(TestTypes.TEST_ACTION)();

export const testActionWithData =
	createStandardAction(TestTypes.TEST_ACTION_WITH_DATA)
		<string>();
