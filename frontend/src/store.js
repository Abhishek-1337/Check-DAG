import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

function unprefixHandleId(nodeId, handleId) {
  if (!nodeId || !handleId) return '';
  const prefix = `${nodeId}-`;
  return handleId.startsWith(prefix) ? handleId.slice(prefix.length) : handleId;
}

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },
  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  isValidConnection: (connection) => {
    const { source, target, sourceHandle, targetHandle } = connection || {};
    if (!source || !target) return false;

    const nodes = get().nodes;
    const sourceNode = nodes.find((n) => n.id === source);
    const targetNode = nodes.find((n) => n.id === target);
    if (!sourceNode || !targetNode) return false;

    // Text variable handles only accept Input nodes with matching inputName.
    if (targetNode.type === 'text') {
      if (sourceNode.type !== 'customInput') return false;
      const sourcePort = unprefixHandleId(source, sourceHandle);
      const targetVar = unprefixHandleId(target, targetHandle);
      const inputName = String(sourceNode.data?.inputName || '').trim();

      if (sourcePort !== 'value') return false;
      if (!inputName) return false;
      return inputName === targetVar;
    }

    return true;
  },
  onConnect: (connection) => {
    if (!get().isValidConnection(connection)) {
      return;
    }
    set({
      edges: addEdge({
        ...connection,
        type: 'animated',
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
      }, get().edges),
    });
  },
  updateNodeData: (nodeId, patch) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...patch } };
        }
        return node;
      }),
    });
  },
  updateNodeSize: (nodeId, size) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, ...size };
        }
        return node;
      }),
    });
  },
}));
