import { FC, ReactNode } from 'react'
import { Handle, Position } from 'reactflow'

export interface ComponentStateNodeProps {
  children?: ReactNode
  isConnectable: boolean
}

export const ComponentStateNode: FC<ComponentStateNodeProps> = (props) => {
  const { children, isConnectable } = props

  return (
    <div
      style={{
        padding: 2,
        border: '1px solid #ccc',
        fontSize: 12,
      }}>
      State {children}
      <select name='type'>
        <option value='number'>number</option>
        <option value='string'>string</option>
        <option value='boolean'>boolean</option>
      </select>
      <Handle
        type='target'
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  )
}
