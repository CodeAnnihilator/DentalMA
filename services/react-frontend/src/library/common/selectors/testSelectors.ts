// import {createSelector} from 'reselect'; --> memoization

import {RootState} from 'core/store/configureStore';

export const getIsToggled = (state: RootState) => state.test.isToggled;
export const getData = (state: RootState) => state.test.data;
