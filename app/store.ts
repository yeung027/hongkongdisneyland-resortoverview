import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import utilReducer from '../reducers/util';

export const store = configureStore({
  reducer: {
    util: utilReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;