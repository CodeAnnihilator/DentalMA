import {RootState} from 'core/store/configureStore';

export const getProjects = (state: RootState) => state.projects.data;
export const getCurrentProject = (state: RootState) => state.projects.currentProject;
export const getCurrentProjectName = (state: RootState) => state.projects.currentProject?.name;
export const getIsProjectLoaded = (state: RootState) => !state.projects.isLoading;
export const getMeasurements = (state: RootState) => state.project.data;
export const getCurrentMeasurement = (state: RootState) => state.measurement.currentMeasurement;
