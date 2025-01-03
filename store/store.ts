import { configureStore } from '@reduxjs/toolkit'
import fileManagerReducer from './fileManagerSlice'
import controlPanelReducer from './controlPanelSlice'

export const store = configureStore({
  reducer: {
    fileManager: fileManagerReducer,
    controlPanel: controlPanelReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

