import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAddProjectOpen: false,
  isEditProjectOpen: false,
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
    openEditProject(state) {
    state.isEditProjectOpen = true
    },
    closeEditProject(state) {
    state.isEditProjectOpen = false
  } 
}})

export const { openAddProject, closeAddProject, openEditProject, closeEditProject} = uiSlice.actions
export default uiSlice.reducer