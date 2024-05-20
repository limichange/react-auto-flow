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
        onDragStart={(event) =>
          onDragStart(event, {
            nodeType: 'ComponentStateNode',
          })
        }
        draggable>
        State
      </div>
      <div
        onDragStart={(event) =>
          onDragStart(event, {
            nodeType: 'ComponentNode',
          })
        }
        draggable>
        Component
      </div>
      <div
        onDragStart={(event) =>
          onDragStart(event, {
            nodeType: 'ComponentHookNode',
          })
        }
        draggable>
        Hook
      </div>
      {children}
    </aside>
  )
}
