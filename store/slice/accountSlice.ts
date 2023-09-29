import { createSlice } from "@reduxjs/toolkit"

type InitialStateType = {
  user: UserData | null,
  token: string | null,
  isFirstTime: boolean,
}
const initialState: InitialStateType = {
  user: null,
  token: null,
  isFirstTime: true
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    populateUser: (state, action) => {
      state.user = action.payload
    },
    populateToken: (state, action) => {
      state.token = action.payload
    },
    updateFirstTime: (state) => {
      state.isFirstTime = false
    },
    clearAccountState: (state) => {
      state.token = null
      state.user = null
    }
  }
})

export const { populateUser, populateToken, updateFirstTime, clearAccountState } = accountSlice.actions
export default accountSlice.reducer