import { FC, ReactNode } from 'react'

export interface SidebarProps {
  children?: ReactNode
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { children } = props

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    { nodeType }: { nodeType: string }
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside>
      <div
        className='dndnode input'
        onDragStart={(event) =>
          onDragStart(event, {
            nodeType: 'State',
          })
        }
        draggable>
        State
      </div>
      <div
        className='dndnode'
        onDragStart={(event) =>
          onDragStart(event, {
            nodeType: 'default',
          })
        }
        draggable>
        Default Node
      </div>
      <div
        className='dndnode output'
        onDragStart={(event) =>
          onDragStart(event, {
            nodeType: 'output',
          })
        }
        draggable>
        Output Node
      </div>
      {children}
    </aside>
  )
}
