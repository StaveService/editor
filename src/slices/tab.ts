import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { RootState } from "../store";

export interface ITabModel {
  tabs: ITab[];
  activeTabIndex: number;
}
export interface IFile {
  filePath: string;
  fileText: string;
}
export interface ITab extends IFile {
  isChanged?: boolean;
  createMonacoModel: ({ filePath, fileText }: IFile) => void;
}

const initialState: ITabModel = {
  tabs: [],
  activeTabIndex: -1,
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ITab>) => {
      let isExist = false;
      state.tabs.forEach((tab, i) => {
        if (tab.filePath === action.payload.filePath) {
          state.activeTabIndex = i;
          isExist = true;
        }
      });
      if (!isExist) {
        const { fileText, filePath } = action.payload;

        action.payload.createMonacoModel({ fileText, filePath });
        state.tabs = [...state.tabs, { ...action.payload, isChanged: false }];
        state.activeTabIndex = state.tabs.length - 1;
      }
    },
    remove: (state, action) => {
      state.activeTabIndex -= 1;
      state.tabs = state.tabs.filter((_tab, i) => i !== action.payload);
    },
    change: (state) => {
      state.tabs[state.activeTabIndex].isChanged = true;
    },
    changed: (state) => {
      state.tabs[state.activeTabIndex].isChanged = false;
      state.tabs = [...state.tabs];
    },
    select: (state, action) => {
      state.activeTabIndex = action.payload;
    },
    refresh: (state) => {
      state.activeTabIndex = initialState.activeTabIndex;
      state.tabs = initialState.tabs;
    },
  },
});

export const selectTabs = (state: RootState) => state.tab.tabs;
export const selectActiveTabIndex = (state: RootState) =>
  state.tab.activeTabIndex;
export const { add, remove, select, changed, change, refresh } =
  tabSlice.actions;
export default tabSlice.reducer;
