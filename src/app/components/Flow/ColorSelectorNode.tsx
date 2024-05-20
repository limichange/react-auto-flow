import { ChangeEventHandler, FC } from 'react'
import { Handle, Position } from 'reactflow'

export interface ColorSelectorNodeProps {
  data: {
    color: string
    onChange: ChangeEventHandler<HTMLInputElement>
  }
  isConnectable: boolean
}

export const ColorSelectorNode: FC<ColorSelectorNodeProps> = (props) => {
  const { data, isConnectable } = props

  return (
    <div
      style={{
        border: '1px solid #ccc',
      }}>
      <div>
        Color Picker Node: <strong>{data.color}</strong>
      </div>
      <input
        className='nodrag'
        type='color'
        onChange={data.onChange}
        defaultValue={data.color}
      />
      <Handle
        type='source'
        position={Position.Right}
        id='b'
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  )
}
