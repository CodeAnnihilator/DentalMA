import {createStandardAction} from 'typesafe-actions';

import {AuthTypes} from '../types/authTypes';

export const requestUser = createStandardAction(AuthTypes.REQUEST_USER)();

export const requestUserSuccess =
	createStandardAction(AuthTypes.REQUEST_USER_SUCCESS)
		<object>();
