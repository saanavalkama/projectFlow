import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAddProjectOpen: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAddProject(state) {
      state.isAddProjectOpen = true
    },
    closeAddProject(state) {
      state.isAddProjectOpen = false
    },
  },
})

export const { openAddProject, closeAddProject } = uiSlice.actions
export default uiSlice.reducer