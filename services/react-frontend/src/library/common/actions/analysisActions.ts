import {createStandardAction} from 'typesafe-actions';

import {AnalysisTypes} from '../types/analysisTypes';

import { ICoord } from 'pages/Measurement/Frames/Analysis/Analysis';

export const setActiveControl =
	createStandardAction(AnalysisTypes.SET_ACTIVE_CONTROL)
		<number>();

export const setActiveMq =
	createStandardAction(AnalysisTypes.SET_ACTIVE_MQ)
		<number>();

export const updateCoordinates =
	createStandardAction(AnalysisTypes.UPDATE_COORDINATES)
		<ICoord[]>();


export const removeMQNode =
	createStandardAction(AnalysisTypes.REMOVE_MQ_NODE)
		<number>();

export const replaceMQNode =
	createStandardAction(AnalysisTypes.REPLACE_MQ_NODE)
		<any>();