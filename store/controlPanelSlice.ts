import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WindowState {
  size: { width: number; height: number }
  position: { x: number; y: number }
  isMaximized: boolean
  isMinimized: boolean
  previousSize: { width: number; height: number }
  previousPosition: { x: number; y: number }
}

interface ControlPanelState {
  showControlPanel: boolean
  controlPanelState: WindowState
  controlPanelZIndex: number
}

const initialState: ControlPanelState = {
  showControlPanel: false,
  controlPanelState: {
    size: { width: 800, height: 520 },
    position: { x: 150, y: 80 },
    isMaximized: false,
    isMinimized: false,
    previousSize: { width: 800, height: 520 },
    previousPosition: { x: 72, y: 100 }
  },
  controlPanelZIndex: 1,
}

export const controlPanelSlice = createSlice({
  name: 'controlPanel',
  initialState,
  reducers: {
    setShowControlPanel: (state, action: PayloadAction<boolean>) => {
      state.showControlPanel = action.payload
    },
    updateControlPanelState: (state, action: PayloadAction<Partial<WindowState>>) => {
      state.controlPanelState = { ...state.controlPanelState, ...action.payload }
    },
    setControlPanelZIndex: (state, action: PayloadAction<number>) => {
      state.controlPanelZIndex = action.payload
    },
  },
})

export const {
  setShowControlPanel,
  updateControlPanelState,
  setControlPanelZIndex,
} = controlPanelSlice.actions

export default controlPanelSlice.reducer

