import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface LandingState {
  userEdit: string
}

const initialState: LandingState = {
  userEdit: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserEdit: (state, action: PayloadAction<string>) => {
      state.userEdit = action.payload
    },
  },
})

export const { updateUserEdit } = userSlice.actions

export const getUserEdit = (state: RootState) => state.user.userEdit

export default userSlice.reducer
