import { useState } from 'react';
import { useStore } from './store';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { CheckCircle, XCircle } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export function SubmitButton() {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        nodes: nodes.map((n) => ({ id: n.id, type: n.type, position: n.position, data: n.data })),
        edges: edges.map((e) => ({ id: e.id, source: e.source, target: e.target, sourceHandle: e.sourceHandle, targetHandle: e.targetHandle })),
      };
      const res = await fetch(`${API_BASE_URL}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error(`Backend error: ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="submit-area">
        <Button
          variant="primary"
          loading={loading}
          disabled={nodes.length === 0}
          onClick={handleSubmit}
        >
          {nodes.length === 0 ? 'Add a node to submit' : 'Submit'}
        </Button>
      </div>

      {error && (
        <Modal open={true} onClose={() => setError(null)} title="Error">
          <p style={{ color: 'var(--danger)' }}>{error}</p>
          <Button variant="primary" onClick={handleSubmit}>Retry</Button>
        </Modal>
      )}

      {result && (
        <Modal open={true} onClose={() => setResult(null)} title="Pipeline Analysis">
          <div className="result-grid">
            <div className="result-item">
              <span className="result-label">Nodes</span>
              <span className="result-value">{result.num_nodes}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Edges</span>
              <span className="result-value">{result.num_edges}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Is DAG</span>
              <span className={`result-value ${result.is_dag ? 'result-ok' : 'result-danger'}`}>
                {result.is_dag ? <CheckCircle size={18} /> : <XCircle size={18} />}
                {result.is_dag ? ' Yes' : ' No'}
              </span>
            </div>
          </div>
          {result.topological_order && (
            <div className="result-section">
              <div className="result-label">Topological Order</div>
              <div className="result-tags">
                {result.topological_order.map((id) => (
                  <span key={id} className="result-tag">{id}</span>
                ))}
              </div>
            </div>
          )}
          {result.cycles?.length > 0 && (
            <div className="result-section">
              <div className="result-label" style={{ color: 'var(--danger)' }}>Cycles Detected</div>
              {result.cycles.map((cycle, i) => (
                <div key={i} className="result-cycle">
                  Cycle {i + 1}: {cycle.join(' → ')}
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
