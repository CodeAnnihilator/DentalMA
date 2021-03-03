/* eslint-disable import/no-anonymous-default-export */
import {ActionType, getType} from 'typesafe-actions';

import sortByDate from 'library/utilities/sortByDate';

import * as actions from '../actions/projectActions';

export type MeasurementsState = Readonly<{
	data: object[];
}>;

const initialState: MeasurementsState = {
	data: [],
};

export type MeasurementsActions = ActionType<typeof actions>;

export default (state = initialState, action: MeasurementsActions): MeasurementsState => {
	switch (action.type) {

		case getType(actions.requestMeasurementsSuccess):
			return {
				...state,
				data: sortByDate([...initialState.data, ...action.payload], 'updatedAt', 'DESC'),
			};

		default:
			return state;
	}
};
