import {RootState} from 'core/store/configureStore';

export const getLocation = (state: RootState) => state.router.location.pathname