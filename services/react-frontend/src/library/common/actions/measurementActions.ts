import {createStandardAction} from 'typesafe-actions';

import {MeasurementTypes} from '../types/measurementTypes';

export const createMeasurement = createStandardAction(MeasurementTypes.CREATE_MEASUREMENT)();

export const createMeasurementSuccess =
	createStandardAction(MeasurementTypes.CREATE_MEASUREMENT_SUCCESS)
		<object>();


export const editMeasurementName =
	createStandardAction(MeasurementTypes.EDIT_MEASUREMENT_NAME)
		<string>();

export const deleteMeasurement = createStandardAction(MeasurementTypes.DELETE_MEASUREMENT)();

export const requestMeasurementById =
	createStandardAction(MeasurementTypes.REQUEST_MEASUREMENT_BY_ID)
		<number>();

export const requestMeasurementByIdSuccess =
	createStandardAction(MeasurementTypes.REQUEST_MEASUREMENT_BY_ID_SUCCESS)
		<object>();

export const editMeasurementNameSuccess =
	createStandardAction(MeasurementTypes.EDIT_MEASUREMENT_NAME_SUCCESS)
		<any>();

export const deleteMeasurementSuccess = createStandardAction(MeasurementTypes.DELETE_MEASUREMENT_SUCCESS)();