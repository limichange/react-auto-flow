'use client'

import { nanoid } from 'nanoid'
import React, { FC, useCallback, ReactNode, useState } from 'react'
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Background,
  MiniMap,
  Controls,
  ReactFlowInstance,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Sidebar } from './Sidebar'
import { ColorSelectorNode } from './ColorSelectorNode'

export interface FlowProps {
  children?: ReactNode
}

const nodeTypes = {
  ColorSelectorNode,
}

const initialNodes = [
  {
    id: '1',
    data: { label: '1', color: '#ff0000' },
    position: { x: 100, y: 20 },
  },
  { id: '2', position: { x: 100, y: 100 }, data: { label: '2' } },
]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }]

export const Flow: FC<FlowProps> = (props) => {
  const { children } = props
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null)

  const [nodes, setNodes, onNodesChange] = useNodesState<{}>(initialNodes)

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type || !reactFlowInstance) {
        return
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      let newNode = {
        id: nanoid(),
        type,
        position,
        data: { label: `${type}` },
      }

      if (type === 'state') {
        newNode.type = 'input'
        newNode.data.label = 'State'
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes]
  )

  return (
    <div>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Sidebar />

        <ReactFlow
          nodeTypes={nodeTypes}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}>
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>

      {children}
    </div>
  )
}
