import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Locale } from '../models/util';

export interface UtilState {
  isMobile:boolean | undefined;
  locale:Locale | undefined;
  version:number;
  callNavClose:number;
}

const initialState: UtilState = {
  isMobile:undefined,
  locale:undefined,
  version:0,
  callNavClose:0
};

export const utilSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
    addVersion: (state) => {
      state.version++;
    },
    callNavClose: (state) => {
      state.callNavClose++;
    }
  }
});

export const utilState = (state: RootState) => state.util;

export const { setIsMobile, setLocale, addVersion, callNavClose } = utilSlice.actions;

export default utilSlice.reducer;