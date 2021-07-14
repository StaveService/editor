/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import tabReducer from './slices/tab';
import themeReducer from './slices/theme';

export default combineReducers({
  tab: tabReducer,
  theme: themeReducer,
});
