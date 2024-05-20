import { FC, ReactNode } from 'react'
import { Handle, Position } from 'reactflow'

export interface ComponentNodeProps {
  children?: ReactNode
  isConnectable: boolean
}

export const ComponentNode: FC<ComponentNodeProps> = (props) => {
  const { children, isConnectable } = props

  return (
    <div
      style={{
        padding: 2,
        border: '1px solid #ccc',
        fontSize: 12,
        background: 'rgba(0, 0, 0, 0.1)',
      }}>
      Component {children}
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  )
}
