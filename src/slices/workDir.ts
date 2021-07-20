import { createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { RootState } from "../store";

export interface IWorkDir {
  workDir?: string;
}
const initialState: IWorkDir = {
  workDir: undefined,
};

const workDirSlice = createSlice({
  name: "workDir",
  initialState,
  reducers: {
    set: (state, action) => {
      state.workDir = action.payload;
    },
  },
});

export const selectWorkDir = (state: RootState): string | undefined =>
  state.workDir.workDir;
export const { set } = workDirSlice.actions;
export default workDirSlice.reducer;
