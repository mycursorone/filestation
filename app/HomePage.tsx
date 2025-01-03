"use client"

import { useDispatch, useSelector } from 'react-redux'
import { FileManager } from './components/file-manager'
import { ControlPanel } from './components/control-panel'
import { Rnd } from 'react-rnd'
import { Minus, Square, X } from 'lucide-react'
import { DesktopIcons } from '../components/desktop-icons'
import { RootState } from '../store/store'
import { setShowFileStation, updateFileStationState, setFileStationZIndex } from '../store/fileManagerSlice'
import { setShowControlPanel, updateControlPanelState, setControlPanelZIndex } from '../store/controlPanelSlice'

export function HomePage() {
  const dispatch = useDispatch()
  const { showFileStation, fileStationState, fileStationZIndex } = useSelector((state: RootState) => state.fileManager)
  const { showControlPanel, controlPanelState, controlPanelZIndex } = useSelector((state: RootState) => state.controlPanel)

  const handleMaximize = (isFileStation: boolean) => {
    const state = isFileStation ? fileStationState : controlPanelState
    const updateAction = isFileStation ? updateFileStationState : updateControlPanelState

    if (!state.isMaximized) {
      dispatch(updateAction({
        previousSize: state.size,
        previousPosition: state.position,
        size: { width: window.innerWidth, height: window.innerHeight },
        position: { x: 0, y: 0 },
        isMaximized: true
      }))
    } else {
      dispatch(updateAction({
        size: state.previousSize,
        position: state.previousPosition,
        isMaximized: false
      }))
    }
  }

  const handleMinimize = (isFileStation: boolean) => {
    const updateAction = isFileStation ? updateFileStationState : updateControlPanelState
    dispatch(updateAction({ isMinimized: true }))
  }

  const bringToFront = (window: 'fileStation' | 'controlPanel') => {
    const newZIndex = Math.max(fileStationZIndex, controlPanelZIndex) + 1
    if (window === 'fileStation') {
      dispatch(setFileStationZIndex(newZIndex))
    } else {
      dispatch(setControlPanelZIndex(newZIndex))
    }
  }

  return (
    <main className="min-h-screen bg-blue-500 p-4 overflow-hidden">
      <DesktopIcons 
        onFileStationClick={() => {
          dispatch(setShowFileStation(true))
          dispatch(updateFileStationState({ isMinimized: false }))
          bringToFront('fileStation')
        }}
        onControlPanelClick={() => {
          dispatch(setShowControlPanel(true))
          dispatch(updateControlPanelState({ isMinimized: false }))
          bringToFront('controlPanel')
        }}
      />
      
      {showFileStation && (
        <Rnd
          size={{ width: fileStationState.size.width, height: fileStationState.size.height }}
          position={{ x: fileStationState.position.x, y: fileStationState.position.y }}
          onDragStop={(e, d) => {
            dispatch(updateFileStationState({
              position: { x: d.x, y: d.y },
              isMaximized: false
            }))
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            dispatch(updateFileStationState({
              size: {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height)
              },
              position,
              isMaximized: false
            }))
          }}
          minWidth={400}
          minHeight={300}
          bounds="window"
          style={{
            visibility: fileStationState.isMinimized ? 'hidden' : 'visible',
            display: fileStationState.isMinimized ? 'none' : 'block',
            zIndex: fileStationZIndex,
          }}
        >
          <div className="w-full h-full border rounded-lg overflow-hidden bg-white shadow-lg">
            <div className="flex items-center justify-between px-2 py-1 bg-gray-100 border-b">
              <div className="text-sm font-normal">File Station</div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleMinimize(true)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleMaximize(true)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Square className="h-3 w-3" />
                </button>
                <button
                  onClick={() => dispatch(setShowFileStation(false))}
                  className="p-1 hover:bg-red-500 hover:text-white rounded"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
            <FileManager />
          </div>
        </Rnd>
      )}

      {showControlPanel && (
        <Rnd
          size={{ width: controlPanelState.size.width, height: controlPanelState.size.height }}
          position={{ x: controlPanelState.position.x, y: controlPanelState.position.y }}
          onDragStop={(e, d) => {
            dispatch(updateControlPanelState({
              position: { x: d.x, y: d.y },
              isMaximized: false
            }))
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            dispatch(updateControlPanelState({
              size: {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height)
              },
              position,
              isMaximized: false
            }))
          }}
          minWidth={600}
          minHeight={400}
          bounds="window"
          style={{
            visibility: controlPanelState.isMinimized ? 'hidden' : 'visible',
            display: controlPanelState.isMinimized ? 'none' : 'block',
            zIndex: controlPanelZIndex,
          }}
        >
          <div className="w-full h-full border rounded-lg overflow-hidden bg-white shadow-lg">
            <div className="flex items-center justify-between px-2 py-1 bg-gray-100 border-b">
              <div className="text-sm font-normal">控制面板</div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleMinimize(false)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleMaximize(false)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Square className="h-3 w-3" />
                </button>
                <button
                  onClick={() => dispatch(setShowControlPanel(false))}
                  className="p-1 hover:bg-red-500 hover:text-white rounded"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
            <ControlPanel />
          </div>
        </Rnd>
      )}
    </main>
  )
}

