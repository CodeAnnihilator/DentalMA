import {RootState} from 'core/store/configureStore';

export const getActiveControl = (state: RootState) => state.analysis.activeControl;
export const getMqSettings = (state: RootState) => state.analysis.mqSettings;
export const getActiveMQ = (state: RootState) => state.analysis.activeMQ;
export const getCoords = (state: RootState) => state.analysis.coords;