import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface LandingState {
  isLoadingApp: boolean
  actionTitleApp: string
}

const initialState: LandingState = {
  isLoadingApp: false,
  actionTitleApp: "",
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateLoadingApp: (state, action: PayloadAction<boolean>) => {
      state.isLoadingApp = action.payload
    },
    updateActionTitleApp: (state, action: PayloadAction<string>) => {
      state.actionTitleApp = action.payload
    },
  },
})

export const { updateLoadingApp, updateActionTitleApp } = appSlice.actions

export const getIsLoadingApp = (state: RootState) => state.app.isLoadingApp
export const getActionTitleApp = (state: RootState) => state.app.actionTitleApp

export default appSlice.reducer
