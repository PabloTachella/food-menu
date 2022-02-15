import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    authenticated: false
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.token = action.payload.token
      state.authenticated = action.payload.authenticated
    }
  }
})

export const { setAuthentication } = userSlice.actions

export default userSlice.reducer