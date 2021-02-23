/* eslint-disable import/no-anonymous-default-export */
import {ActionType, getType} from 'typesafe-actions';

import * as actions from '../actions/analysisActions';

export interface IMQSettings {
	id: number;
	color: string;
	text: string;
	key: number;
}

interface IControlsSettings {
	id: number;
	text: string;
	key: number;
}

interface ICommonSettings {
	lineWidth: number;
	nodeRadius: number;
}

interface ICoord {
	coord: number[];
	colorId: string;
}

export type AnalysisState = Readonly<{
	activeControl: number;
	activeMQ: number;
	controlsSettings: IControlsSettings[];
	mqSettings: IMQSettings[];
	commonSettings: ICommonSettings;
	coords: ICoord[];
	eventsStack: any[];
}>;

const initialState: AnalysisState = {
	activeControl: 1,
	activeMQ: 0,
	controlsSettings: [
		{id: 0, text: 'adjustments', key: 81},
		{id: 1, text: 'next node', key: 87},
	],
	commonSettings: {
		lineWidth: 10,
		nodeRadius: 5,
	},
	mqSettings: [
		{id: 0, color: '#A4FF91', text: 'MQ1', key: 49},
		{id: 1, color: '#91FFF8', text: 'MQ2', key: 50},
		{id: 2, color: '#91AFFF', text: 'MQ3', key: 51},
		{id: 3, color: '#FBFF91', text: 'MQ4', key: 52},
		{id: 4, color: '#FFC391', text: 'MQ5', key: 53},
		{id: 5, color: '#FF9791', text: 'MQ6', key: 54},
		{id: 6, color: '#D691FF', text: 'MQ7', key: 55},
	],
	coords: [],
	eventsStack: [],
};

export type AnalysisActions = ActionType<typeof actions>;

export default (state = initialState, action: AnalysisActions): AnalysisState => {
	switch (action.type) {

		case getType(actions.setActiveControl):
			return {
				...state,
				activeControl: action.payload,
			};

		case getType(actions.setActiveMq):
			return {
				...state,
				activeMQ: action.payload,
			};

		case getType(actions.updateCoordinates):
			return {
				...state,
				coords: action.payload,
			};

		default:
			return state;
	}
};
