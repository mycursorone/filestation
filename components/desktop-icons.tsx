import Image from 'next/image'
import { useState } from 'react'

interface DesktopIconProps {
  onFileStationClick: () => void
  onControlPanelClick: () => void
}

export function DesktopIcons({ onFileStationClick, onControlPanelClick }: DesktopIconProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  const icons = [
    { name: '套件中心', src: 'https://cdn-icons-png.flaticon.com/512/2784/2784451.png', onClick: () => {} },
    { name: '控制面板', src: 'https://cdn-icons-png.flaticon.com/512/900/900797.png', onClick: onControlPanelClick },
    { name: 'File Station', src: 'https://cdn-icons-png.flaticon.com/512/3767/3767094.png', onClick: onFileStationClick },
    { name: 'DSM 说明', src: 'https://cdn-icons-png.flaticon.com/512/10024/10024192.png', onClick: () => {} },
  ]

  return (
    <div className="absolute top-4 left-4 flex flex-col space-y-4">
      {icons.map((icon) => (
        <div
          key={icon.name}
          className="flex flex-col items-center cursor-pointer"
          onClick={icon.onClick}
          onMouseEnter={() => setHoveredIcon(icon.name)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <div className="w-16 h-16 relative">
            <Image
              src={icon.src}
              alt={icon.name}
              layout="fill"
              objectFit="contain"
              className={`transition-transform duration-200 ${hoveredIcon === icon.name ? 'scale-110' : ''}`}
            />
          </div>
          <span className="mt-1 text-xs text-white bg-black bg-opacity-50 px-1 rounded">
            {icon.name}
          </span>
        </div>
      ))}
    </div>
  )
}

