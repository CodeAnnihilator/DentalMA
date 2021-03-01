// import {createSelector} from 'reselect'; --> memoization

import {RootState} from 'core/store/configureStore';

export const getIsUser = (state: RootState) => state.auth.user;