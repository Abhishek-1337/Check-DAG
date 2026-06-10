import { BaseEdge, getBezierPath } from 'reactflow';

function AnimatedEdge({ id, source, target, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, selected }) {
  const [edgePath] = getBezierPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      className={`custom-edge${selected ? ' custom-edge--selected' : ''}`}
      markerEnd={markerEnd}
    />
  );
}

export const edgeTypes = {
  animated: AnimatedEdge,
};
