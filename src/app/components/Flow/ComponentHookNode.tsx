import { FC, ReactNode } from 'react'

export interface ComponentHookNodeProps {
  children?: ReactNode
  isConnectable: boolean
}

export const ComponentHookNode: FC<ComponentHookNodeProps> = (props) => {
  const { children } = props

  return (
    <div
      style={{
        padding: 2,
        border: '1px solid #ccc',
        fontSize: 12,
      }}>
      Hook {children}
    </div>
  )
}
