import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../store';
import { nodeTypes, registry, defaultDataFor } from '../nodes';
import { edgeTypes } from './edges';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

export function Canvas() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const addNode = useStore((s) => s.addNode);
  const getNodeID = useStore((s) => s.getNodeID);
  const onNodesChange = useStore((s) => s.onNodesChange);
  const onEdgesChange = useStore((s) => s.onEdgesChange);
  const onConnect = useStore((s) => s.onConnect);
  const isValidConnection = useStore((s) => s.isValidConnection);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const raw = event.dataTransfer.getData('application/reactflow');
    if (!raw) return;
    const appData = JSON.parse(raw);
    const type = appData?.nodeType;
    if (!type || !registry[type]) return;

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const nodeID = getNodeID(type);
    const config = registry[type];
    const newNode = {
      id: nodeID,
      type,
      position,
      data: defaultDataFor(config, { id: nodeID, nodeType: type }),
    };
    addNode(newNode);
  }, [reactFlowInstance, getNodeID, addNode]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="canvas-wrapper" ref={reactFlowWrapper}>
      {nodes.length === 0 && (
        <div className="canvas-empty">
          Drag a node from the left to start building
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: 'animated',
          animated: true,
          style: { strokeWidth: 2 },
        }}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background variant="dots" gap={gridSize} size={1} color="var(--border)" />
        <Controls showInteractive={false} />
        <MiniMap
          nodeStrokeColor="var(--border-strong)"
          nodeColor="var(--surface)"
          nodeBorderRadius={4}
          maskColor="rgba(0,0,0,0.5)"
          style={{ background: 'var(--surface)' }}
        />
      </ReactFlow>
      <div className="canvas-vignette" />
    </div>
  );
}
