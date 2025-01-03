"use client"

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface User {
  name: string
  type: string
  permissions: string
}

interface PropertiesPortalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

const mockUsers: User[] = [
  { name: "lockuser", type: "拒绝", permissions: "完全控制" },
  { name: "melbutest", type: "拒绝", permissions: "完全控制" },
  { name: "技术", type: "拒绝", permissions: "完全控制" },
  { name: "administrators", type: "允许", permissions: "读取 & 写入" },
]

export function PropertiesPortal({ isOpen, onClose, title }: PropertiesPortalProps) {
  const portalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Create portal container if it doesn't exist
    if (!portalRef.current) {
      const div = document.createElement('div')
      div.id = 'properties-portal'
      document.body.appendChild(div)
      portalRef.current = div
    }

    return () => {
      // Cleanup on unmount
      if (portalRef.current) {
        document.body.removeChild(portalRef.current)
      }
    }
  }, [])

  if (!isOpen || !portalRef.current) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 file-station">
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="flex items-center justify-between p-2 border-b">
          <div className="flex space-x-2">
            <button className="px-3 py-0.5 text-xs hover:bg-gray-100 rounded">常规</button>
            <button className="px-3 py-0.5 text-xs hover:bg-gray-100 rounded">板块</button>
            <button className="px-3 py-0.5 text-xs bg-blue-500 text-white rounded">高级选项</button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-medium mb-3">{title}</h3>
          
          <div className="mb-4">
            <h4 className="text-xs font-medium mb-2">用户选组</h4>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead className="py-1">用户/组组</TableHead>
                  <TableHead className="py-1">类型</TableHead>
                  <TableHead className="py-1">权限</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.name}>
                    <TableCell className="py-1">{user.name}</TableCell>
                    <TableCell className="py-1">{user.type}</TableCell>
                    <TableCell className="py-1">{user.permissions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Checkbox id="apply-subfolder" className="h-3 w-3" />
            <label htmlFor="apply-subfolder" className="text-xs">
              应用到这个文件夹、子文件夹及文件
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-2 p-2 bg-gray-50 rounded-b-lg">
          <Button variant="outline" onClick={onClose} className="h-6 text-xs px-3">
            取消
          </Button>
          <Button onClick={onClose} className="h-6 text-xs px-3">
            确定
          </Button>
        </div>
      </div>
    </div>,
    portalRef.current
  )
}

