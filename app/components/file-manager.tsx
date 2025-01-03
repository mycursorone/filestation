"use client"

import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from "@/lib/utils"
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ChevronRight, ChevronDown, Folder, File, List, Grid, Upload, Plus, Settings } from 'lucide-react'
import { PropertiesPortal } from '@/components/properties-portal'
import { RootState } from '../../store/store'
import {
  setCurrentView,
  toggleExpandedFolder,
  setShowProperties,
  setShowSubMenu,
  setSubMenuPosition,
  setShowPropertiesPortal,
} from '../../store/fileManagerSlice'

// Mock data for demonstration
const mockFolders = [
  { id: '1', name: 'Documents', children: [
    { id: '1-1', name: 'Work', children: [
      { id: '1-1-1', name: 'Projects' },
      { id: '1-1-2', name: 'Reports' },
    ] },
    { id: '1-2', name: 'Personal' },
  ]},
  { id: '2', name: 'Pictures', children: [] },
  { id: '3', name: 'Downloads', children: [] },
]

const mockFiles = [
  { id: '1', name: 'Report.docx', size: '2.5 MB', type: 'Document', modified: '2023-05-15' },
  { id: '2', name: 'Presentation.pptx', size: '5.1 MB', type: 'Presentation', modified: '2023-05-14' },
  { id: '3', name: 'Budget.xlsx', size: '1.8 MB', type: 'Spreadsheet', modified: '2023-05-13' },
]

const menuItems = [
  {
    label: '上传',
    items: ['上传忽略', '上传覆盖']
  },
  {
    label: '新增',
    items: ['新建文件夹', '新建共享文件夹']
  },
  {
    label: '操作',
    items: ['下载', '在新选项中打开', '压缩到文件', '压缩到', '复制/移动', '剪切', '复制', '删除', '改名', '属性', '共享', '创建文件请求'],
  },
  {
    label: '工具',
    items: ['远程连接', '加载远程目录', '装载虚拟设备', '卸载', '装载列表', '共享管理']
  },
  {
    label: '设置',
    items: []
  }
]

export function FileManager() {
  const dispatch = useDispatch()
  const {
    currentView,
    expandedFolders,
    showProperties,
    showSubMenu,
    subMenuPosition,
    showPropertiesPortal
  } = useSelector((state: RootState) => state.fileManager)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleFolderClick = (folder: any, event: React.MouseEvent) => {
    event.stopPropagation();
    if (folder.children && folder.children.length > 0) {
      dispatch(toggleExpandedFolder(folder.id));
    } else {
      dispatch(setShowSubMenu(true));
      dispatch(setSubMenuPosition({ x: event.clientX, y: event.clientY }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Close any open menus
      }
      dispatch(setShowSubMenu(false));
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  const contextMenuItems = [
    { icon: <Plus className="mr-2 h-4 w-4" />, label: '新建文件夹' },
    { icon: <Upload className="mr-2 h-4 w-4" />, label: '上传' },
    { 
      icon: <Settings className="mr-2 h-4 w-4" />, 
      label: '属性',
      onClick: () => dispatch(setShowPropertiesPortal(true))
    },
  ]

  return (
    <div className={`h-full flex flex-col bg-gray-100 border border-gray-300 rounded-lg overflow-hidden file-station`}>
      <div className="flex flex-col border-b border-gray-300 bg-white">
        {/* Toolbar first */}
        <div className="flex items-center justify-between p-1 border-b border-gray-300">
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="icon" className="h-6 w-6">
              <ChevronRight className="h-3 w-3" />
            </Button>
            <Input className="w-64 h-6 text-xs" placeholder="Path: /home/user" />
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => dispatch(setCurrentView('list'))}
              className="h-6 w-6"
            >
              <List className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => dispatch(setCurrentView('grid'))}
              className="h-6 w-6"
            >
              <Grid className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Menu Bar second */}
        <div className="flex items-center px-1 space-x-1 py-0.5" ref={menuRef}>
          {menuItems.map((menuItem, index) => (
            <div key={menuItem.label} className="relative">
              <Button
                variant="ghost"
                className={cn(
                  "px-2 py-0.5 h-6 border border-gray-300 rounded text-xs",
                  // openMenuIndex === index && "bg-gray-100"
                )}
                // onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
              >
                {menuItem.label}
              </Button>
              {/* {openMenuIndex === index && menuItem.items.length > 0 && (
                <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {menuItem.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        onClick={menuItem.handlers?.[item]}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="flex-grow"
      >
        <ResizablePanel defaultSize={25} minSize={15}>
          <ScrollArea className="h-full border-r border-gray-300">
            <div className="p-1">
              {mockFolders.map(folder => (
                <ContextMenu key={folder.id}>
                  <ContextMenuTrigger>
                    <FolderTreeItem
                      key={folder.id}
                      folder={folder}
                      expanded={expandedFolders.includes(folder.id)}
                      onToggle={handleFolderClick}
                      level={0}
                      expandedFolders={expandedFolders}
                    />
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    {contextMenuItems.map((item) => (
                      <ContextMenuItem
                        key={item.label}
                        onClick={item.onClick}
                        className="text-xs"
                      >
                        {item.icon}
                        {item.label}
                      </ContextMenuItem>
                    ))}
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} minSize={50}>
          <ScrollArea className="h-full bg-white">
            {currentView === 'list' ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-medium">Name</TableHead>
                    <TableHead className="text-xs font-medium">Size</TableHead>
                    <TableHead className="text-xs font-medium">Type</TableHead>
                    <TableHead className="text-xs font-medium">Modified</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFiles.map(file => (
                    <TableRow key={file.id}>
                      <TableCell className="py-1">
                        <ContextMenu>
                          <ContextMenuTrigger className="flex w-full">
                            <span className="text-xs">{file.name}</span>
                          </ContextMenuTrigger>
                          <ContextMenuContent>
                            {contextMenuItems.map((item) => (
                              <ContextMenuItem
                                key={item.label}
                                onClick={item.onClick}
                                className="text-xs"
                              >
                                {item.icon}
                                {item.label}
                              </ContextMenuItem>
                            ))}
                          </ContextMenuContent>
                        </ContextMenu>
                      </TableCell>
                      <TableCell className="py-1 text-xs">{file.size}</TableCell>
                      <TableCell className="py-1 text-xs">{file.type}</TableCell>
                      <TableCell className="py-1 text-xs">{file.modified}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="grid grid-cols-5 gap-2 p-2">
                {mockFiles.map(file => (
                  <ContextMenu key={file.id}>
                    <ContextMenuTrigger>
                      <div className="flex flex-col items-center">
                        <File className="h-8 w-8 text-blue-500" />
                        <span className="mt-1 text-xs text-center">{file.name}</span>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      {contextMenuItems.map((item) => (
                        <ContextMenuItem
                          key={item.label}
                          onClick={item.onClick}
                          className="text-xs"
                        >
                          {item.icon}
                          {item.label}
                        </ContextMenuItem>
                      ))}
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </div>
            )}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>

      <PropertiesPortal
        isOpen={showPropertiesPortal}
        onClose={() => dispatch(setShowPropertiesPortal(false))}
        title="video 共享文件共享窗"
      />

      {showSubMenu && (
        <div
          style={{
            position: 'fixed',
            top: subMenuPosition.y,
            left: subMenuPosition.x,
            zIndex: 1000,
          }}
          className="bg-white border border-gray-200 rounded-md shadow-lg"
        >
          <div className="py-1">
            <a href="#" className="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100">上传</a>
            <a href="#" className="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100">新建文件夹</a>
            <a href="#" className="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100">属性</a>
          </div>
        </div>
      )}
    </div>
  )
}

interface FolderTreeItemProps {
  folder: { id: string; name: string; children?: { id: string; name: string; children?: any[] }[] }
  expanded: boolean
  onToggle: (folder: any, event: React.MouseEvent) => void
  level: number
  expandedFolders: string[]
}

function FolderTreeItem({ folder, expanded, onToggle, level = 0, expandedFolders }: FolderTreeItemProps) {
  return (
    <div>
      <div
        className="flex items-center space-x-1 cursor-pointer hover:bg-gray-200 rounded py-0.5 px-1"
        style={{ paddingLeft: `${level * 12}px` }}
        onClick={(e) => onToggle(folder, e)}
      >
        {folder.children && folder.children.length > 0 ? (
          expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />
        ) : <span className="w-3" />}
        <Folder className="h-3 w-3 text-blue-500" />
        <span className="text-xs">{folder.name}</span>
      </div>
      {expanded && folder.children && (
        <div>
          {folder.children.map(childFolder => (
            <FolderTreeItem
              key={childFolder.id}
              folder={childFolder}
              expanded={expandedFolders.includes(childFolder.id)}
              onToggle={onToggle}
              level={level + 1}
              expandedFolders={expandedFolders}
            />
          ))}
        </div>
      )}
    </div>
  );
}

