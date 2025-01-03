import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WindowState {
  size: { width: number; height: number }
  position: { x: number; y: number }
  isMaximized: boolean
  isMinimized: boolean
  previousSize: { width: number; height: number }
  previousPosition: { x: number; y: number }
}

interface FileManagerState {
  showFileStation: boolean
  fileStationState: WindowState
  fileStationZIndex: number
  currentView: 'list' | 'grid'
  expandedFolders: string[]
  showProperties: boolean
  showSubMenu: boolean
  subMenuPosition: { x: number; y: number }
  showPropertiesPortal: boolean
}

const initialState: FileManagerState = {
  showFileStation: false,
  fileStationState: {
    size: { width: 640, height: 480 },
    position: { x: 200, y: 100 },
    isMaximized: false,
    isMinimized: false,
    previousSize: { width: 640, height: 480 },
    previousPosition: { x: 200, y: 100 }
  },
  fileStationZIndex: 1,
  currentView: 'list',
  expandedFolders: [],
  showProperties: false,
  showSubMenu: false,
  subMenuPosition: { x: 0, y: 0 },
  showPropertiesPortal: false,
}

export const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState,
  reducers: {
    setShowFileStation: (state, action: PayloadAction<boolean>) => {
      state.showFileStation = action.payload
    },
    updateFileStationState: (state, action: PayloadAction<Partial<WindowState>>) => {
      state.fileStationState = { ...state.fileStationState, ...action.payload }
    },
    setFileStationZIndex: (state, action: PayloadAction<number>) => {
      state.fileStationZIndex = action.payload
    },
    setCurrentView: (state, action: PayloadAction<'list' | 'grid'>) => {
      state.currentView = action.payload
    },
    toggleExpandedFolder: (state, action: PayloadAction<string>) => {
      const index = state.expandedFolders.indexOf(action.payload)
      if (index > -1) {
        state.expandedFolders.splice(index, 1)
      } else {
        state.expandedFolders.push(action.payload)
      }
    },
    setShowProperties: (state, action: PayloadAction<boolean>) => {
      state.showProperties = action.payload
    },
    setShowSubMenu: (state, action: PayloadAction<boolean>) => {
      state.showSubMenu = action.payload
    },
    setSubMenuPosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.subMenuPosition = action.payload
    },
    setShowPropertiesPortal: (state, action: PayloadAction<boolean>) => {
      state.showPropertiesPortal = action.payload
    },
  },
})

export const {
  setShowFileStation,
  updateFileStationState,
  setFileStationZIndex,
  setCurrentView,
  toggleExpandedFolder,
  setShowProperties,
  setShowSubMenu,
  setSubMenuPosition,
  setShowPropertiesPortal,
} = fileManagerSlice.actions

export default fileManagerSlice.reducer

