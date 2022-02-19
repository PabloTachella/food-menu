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
    deleteData: (state, action) => {
      state.data = state.data.filter(dish => dish.id !== action.payload)
    },
    addToData: (state, action) => {
      state.data = [...state.data, action.payload]
    }
  }
})

export const { setData, deleteData, addToData } = dishSlice.actions

export default dishSlice.reducer