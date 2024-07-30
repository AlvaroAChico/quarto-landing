import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface LandingState {
  isLoadingApp: boolean
}

const initialState: LandingState = {
  isLoadingApp: false,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateLoadingApp: (state, action: PayloadAction<boolean>) => {
      state.isLoadingApp = action.payload
    },
  },
})

export const { updateLoadingApp } = appSlice.actions

export const getIsLoadingApp = (state: RootState) => state.app.isLoadingApp

export default appSlice.reducer
