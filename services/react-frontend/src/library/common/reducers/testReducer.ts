import {ActionType, getType} from 'typesafe-actions';

import * as actions from '../actions/testActions';

export type TestState = Readonly<{
	isToggled: boolean;
	data: string;
}>;

const initialState: TestState = {
	isToggled: false,
	data: 'no data',
};

export type TestActions = ActionType<typeof actions>;

export default (state = initialState, action: TestActions): TestState => {
	switch (action.type) {

		case getType(actions.testAction):
			return {
				...state,
				isToggled: !state.isToggled,
			};

		case getType(actions.testActionWithData):
			return {
				...state,
				data: action.payload,
			};

		default:
			return state;
	}
};
