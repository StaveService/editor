/* eslint-disable import/no-cycle */
import { combineReducers } from "redux";
import currentUserReducer from "./slices/currentUser/currentUser";
import tabReducer from "./slices/tab";
import themeReducer from "./slices/theme";
import workDirReducer from "./slices/workDir";

export default combineReducers({
  tab: tabReducer,
  theme: themeReducer,
  currentUser: currentUserReducer,
  workDir: workDirReducer,
});
