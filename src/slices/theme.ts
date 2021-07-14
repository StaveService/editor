import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export interface ITheme {
  theme: 'dark' | 'light';
}
const initialState: ITheme = {
  theme: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    change: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const selectTheme = (state: RootState) => state.theme.theme;
export const { change } = themeSlice.actions;
export default themeSlice.reducer;
