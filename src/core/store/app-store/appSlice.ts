import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { ETypeModeSearch } from "../../../constants/app"
import { PropertyDTO } from "../../models/interfaces/property-model"

export interface LandingState {
  isLoadingApp: boolean
  actionTitleApp: string
  modeSearchProperty: ETypeModeSearch
  propertyDetail: PropertyDTO
}

const initialState: LandingState = {
  isLoadingApp: false,
  actionTitleApp: "",
  modeSearchProperty: ETypeModeSearch.ALQUILAR,
  propertyDetail: {} as PropertyDTO,
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
    updateModeSearch: (state, action: PayloadAction<ETypeModeSearch>) => {
      state.modeSearchProperty = action.payload
    },
    updatePropertyDetail: (state, action: PayloadAction<PropertyDTO>) => {
      state.propertyDetail = action.payload
    },
  },
})

export const {
  updateLoadingApp,
  updateActionTitleApp,
  updateModeSearch,
  updatePropertyDetail,
} = appSlice.actions

export const getIsLoadingApp = (state: RootState) => state.app.isLoadingApp
export const getActionTitleApp = (state: RootState) => state.app.actionTitleApp
export const getModeSearch = (state: RootState) => state.app.modeSearchProperty
export const getPropertyDetail = (state: RootState) => state.app.propertyDetail

export default appSlice.reducer
