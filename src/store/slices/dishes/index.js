import { createSlice } from "@reduxjs/toolkit";

export const dishSlice = createSlice({
  name: 'dishes',
  initialState: {
    data: []
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
    updateData: (state, action) => {
      state.data = state.data.filter(dish => dish.id !== action.payload)
    }
  }
})

export const { setData, updateData } = dishSlice.actions

export default dishSlice.reducer