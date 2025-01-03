"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface User {
  name: string
  type: string
  permissions: string
}

interface FilePropertiesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockUsers: User[] = [
  { name: "lockuser", type: "拒绝", permissions: "完全控制" },
  { name: "melbutest", type: "拒绝", permissions: "完全控制" },
  { name: "技术", type: "拒绝", permissions: "完全控制" },
  { name: "admin", type: "允许", permissions: "完全控制" },
  { name: "myshiner", type: "允许", permissions: "读取 & 写入" },
]

export function FilePropertiesDialog({ open, onOpenChange }: FilePropertiesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>属性</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户/组组</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>权限</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.name}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.type}</TableCell>
                  <TableCell>{user.permissions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox id="apply-subfolder" />
          <label htmlFor="apply-subfolder" className="text-sm">
            应用到这个文件夹、子文件夹及文件
          </label>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            关闭
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            确定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

