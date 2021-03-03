/* eslint-disable import/no-anonymous-default-export */
import {ActionType, getType} from 'typesafe-actions';

import * as actions from '../actions/measurementActions';

export type MeasurementState = Readonly<{
	currentMeasurement: any;
}>;

const initialState: MeasurementState = {
	currentMeasurement: null,
};

export type MeasurementActions = ActionType<typeof actions>;

export default (state = initialState, action: MeasurementActions): MeasurementState => {
	switch (action.type) {

		case getType(actions.requestMeasurementByIdSuccess):
			return {
				...state,
				currentMeasurement: action.payload,
			};

		case getType(actions.editMeasurementNameSuccess):
			return {
				...state,
				currentMeasurement: action.payload,
			};

		case getType(actions.deleteMeasurementSuccess):
			return {
				...initialState,
			};

		default:
			return state;
	}
};
