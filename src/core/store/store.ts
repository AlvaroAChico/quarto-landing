import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import appReducer from "./app-store/appSlice"
import userReducer from "./user-store/userSlice"

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
