import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: null
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
  }
})

export const { populateUser, populateToken } = accountSlice.actions
export default accountSlice.reducer