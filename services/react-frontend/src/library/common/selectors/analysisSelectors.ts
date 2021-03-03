import {createSelector} from 'reselect';
import {RootState} from 'core/store/configureStore';

import { lenpoint } from 'pages/Measurement/utils/canvas';

import { getCalibration, getMagnification, getMeta, getXDeviation, getYDeviation } from 'library/common/selectors/settingsSelectors';

export const getActiveControl = (state: RootState) => state.analysis.activeControl;
export const getMqSettings = (state: RootState) => state.analysis.mqSettings;
export const getActiveMQ = (state: RootState) => state.analysis.activeMQ;
export const getCoords = (state: RootState) => state.analysis.coords;
export const getExcelMQs = (state: RootState) => state.analysis.excelMQs;

export const getActiveMQObj = createSelector(
	[getMqSettings, getActiveMQ],
	(data, id) => data[id]
)

export const getColorMQById = createSelector(
	[getMqSettings, (_: any, id: number) => id],
	(colors, id) => {
		const colorObj = colors.find(c => c.id === id);
		return colorObj ? colorObj.color : 'grey';
	}
)

export const getExcelData = createSelector(
	[getCoords, getCalibration, getMagnification, getMqSettings, getMeta, getXDeviation, getYDeviation],
	(data: any[], calibration: any, magnification: any, mqs: any[], meta, xDev, yDev) => {
		const nmByPx = magnification / calibration;
		if (data.length <= 1) return null;
		const newData = [] as any;
		data.forEach((c, i, arr) => {
			if (!arr[i + 1]) return;
			const distance = lenpoint(c.coord, arr[i + 1].coord, xDev, yDev);
			const nmDistance = distance * nmByPx;
			const newC = {colorId: arr[i + 1].colorId, distance: nmDistance};
			newData.push(newC);
		});

		const totalDistance = newData.reduce((c: number, n: any) => c + n.distance, 0);

		const mqsWithDistances = mqs.map(({key, ...c}) => {
			const totalMQDistance = newData
				.filter((o: any) => o.colorId === c.id)
				.reduce((c: any, n: any) => c + n.distance, 0);
			const percentage = `${(totalMQDistance / totalDistance * 100).toFixed(2)}%`;
			const distance = `${totalMQDistance.toFixed(2)}um`;
			return {...meta, ...c, distance, percentage};
		})
		return mqsWithDistances;
	}
)

export const getMQDistances = createSelector(
	[getExcelData],
	(data: any) => data.map((o: any) => {
		const distance = o.distance.split('um')[0];
		return {colorId: o.id, distance};
	})
)