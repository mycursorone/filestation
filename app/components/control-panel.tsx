"use client"

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Share2, Settings, Users, UsersRound, BookKey, Zap, Globe, Network, Shield, Info, Palette, Map, MessageCircle, Calendar, Lightbulb, Download, RefreshCw, Lock, ArrowUpRightSquare, SearchIcon, FolderSync, Terminal } from 'lucide-react'
import Image from 'next/image'

interface ControlPanelProps {
  onClose?: () => void
}

interface IconItemProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

// IconItem component represents each icon in the Control Panel grid
function IconItem({ icon, label, onClick }: IconItemProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center hover:bg-gray-100 rounded cursor-pointer w-[100px]"
      onClick={onClick}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs text-center mt-1">{label}</span>
    </div>
  )
}

// Section 组件，用于显示控制面板中的每个部分
// 调整了图标间距（水平2px）和行距（垂直10px）
// 布局调整：图标现在与每个部分标题右对齐
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      {/* 为标题和图标添加 flex 容器 */}
      <div className="flex items-start">
        {/* 左侧标题 */}
        <h3 className="text-sm font-medium text-gray-600 mb-2 px-4 w-1/5">{title}</h3>
        {/* 右侧对齐的图标容器 */}
        <div className="flex-1">
          {/* 调整水平间距为2px，垂直间距为10px */}
          <div className="grid grid-cols-5 gap-x-[2px] gap-y-[10px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// ControlPanel 组件：显示控制面板的主要内容
export function ControlPanel({ onClose }: ControlPanelProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* 控制面板顶部栏 */}
      <div className="flex items-center justify-between p-2 border-b">
        {/* 左侧标题和图标 */}
        <div className="flex items-center space-x-2">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/900/900797.png"
            alt="Control Panel"
            width={16}
            height={16}
          />
          <span className="text-sm">控制面板</span>
        </div>
        {/* 右侧搜索框和模式切换 */}
        <div className="flex items-center space-x-2">
          <Input 
            type="text" 
            placeholder="搜索" 
            className="h-6 text-xs w-[200px]"
          />
          <a href="#" className="text-xs text-blue-500">基本模式</a>
        </div>
      </div>

      {/* 使用全宽度的 ScrollArea 来容纳所有部分 */}
      <ScrollArea className="flex-1 p-4 w-full">
        {/* 各个部分的内容 */}
        <Section title="文件共享">
          <IconItem icon={<Share2 className="w-8 h-8 text-orange-500" />} label="共享文件夹" />
          <IconItem icon={<Settings className="w-8 h-8 text-green-500" />} label="文件服务" />
          <IconItem icon={<Users className="w-8 h-8 text-blue-500" />} label="用户帐号" />
          <IconItem icon={<UsersRound className="w-8 h-8 text-purple-500" />} label="用户群组" />
          <IconItem icon={<BookKey className="w-8 h-8 text-gray-500" />} label="域/LDAP" />
        </Section>

        <Section title="连接性">
          <IconItem icon={<Zap className="w-8 h-8 text-cyan-500" />} label="QuickConnect" />
          <IconItem icon={<Globe className="w-8 h-8 text-blue-500" />} label="外部访问" />
          <IconItem icon={<Network className="w-8 h-8 text-red-500" />} label="网络" />
          <IconItem icon={<Network className="w-8 h-8 text-blue-500" />} label="DHCP Server" />
          <IconItem icon={<Shield className="w-8 h-8 text-yellow-500" />} label="安全性" />
        </Section>

        <Section title="系统">
          <IconItem icon={<Info className="w-8 h-8 text-blue-500" />} label="信息中心" />
          <IconItem icon={<Palette className="w-8 h-8 text-cyan-500" />} label="主题样式" />
          <IconItem icon={<Map className="w-8 h-8 text-orange-500" />} label="区域选项" />
          <IconItem icon={<MessageCircle className="w-8 h-8 text-green-500" />} label="通知设置" />
          <IconItem icon={<Calendar className="w-8 h-8 text-red-500" />} label="任务计划" />
          <IconItem icon={<Lightbulb className="w-8 h-8 text-yellow-500" />} label="硬件和电源" />
          <IconItem icon={<Download className="w-8 h-8 text-green-500" />} label="外接设备" />
          <IconItem icon={<RefreshCw className="w-8 h-8 text-blue-500" />} label="更新和还原" />
        </Section>

        <Section title="应用程序">
          <IconItem icon={<Lock className="w-8 h-8 text-red-500" />} label="权限" />
          <IconItem icon={<ArrowUpRightSquare className="w-8 h-8 text-blue-500" />} label="应用程序门户" />
          <IconItem icon={<SearchIcon className="w-8 h-8 text-green-500" />} label="索引服务" />
          <IconItem icon={<FolderSync className="w-8 h-8 text-orange-500" />} label="共享文件夹同步" />
          <IconItem icon={<Terminal className="w-8 h-8 text-gray-500" />} label="终端机和 SNMP" />
        </Section>
      </ScrollArea>
    </div>
  )
}

