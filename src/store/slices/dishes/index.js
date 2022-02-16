import { createSlice } from "@reduxjs/toolkit";

export const dishSlice = createSlice({
  name: 'dishes',
  initialState: {
    data: []
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { setData } = dishSlice.actions

export default dishSlice.reducer