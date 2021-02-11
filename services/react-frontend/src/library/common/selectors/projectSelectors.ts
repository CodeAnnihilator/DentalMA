// import {createSelector} from 'reselect'; --> memoization

import {RootState} from 'core/store/configureStore';

export const getProjects = (state: RootState) => state.projects.data;
export const getMeasurements = (state: RootState) => state.measurements.data;
