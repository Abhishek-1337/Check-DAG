import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { registry } from './nodes';
import clsx from 'clsx';

const categoryLabels = {
  source: 'Sources',
  transform: 'Transform',
  logic: 'Logic',
  ai: 'AI / LLM',
  output: 'Outputs',
};

export function PipelineToolbar() {
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState({});

  const grouped = useMemo(() => {
    const groups = {};
    for (const [type, config] of Object.entries(registry)) {
      const cat = config.category || 'other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push({ type, config });
    }
    return groups;
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return grouped;
    const q = search.toLowerCase();
    const result = {};
    for (const [cat, items] of Object.entries(grouped)) {
      const filteredItems = items.filter(({ config }) =>
        config.title.toLowerCase().includes(q)
      );
      if (filteredItems.length) result[cat] = filteredItems;
    }
    return result;
  }, [search, grouped]);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="toolbar">
      <div className="toolbar-header">
        <h1 className="toolbar-title">Pipeline</h1>
      </div>

      <div className="toolbar-search">
        <Search size={14} className="toolbar-search-icon" />
        <input
          className="toolbar-search-input"
          type="text"
          placeholder="Search nodes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="toolbar-groups">
        {Object.entries(filtered).map(([cat, items]) => (
          <div key={cat} className="toolbar-group">
            <button
              className="toolbar-group-header"
              onClick={() => setCollapsed((c) => ({ ...c, [cat]: !c[cat] }))}
            >
              {collapsed[cat] ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
              <span>{categoryLabels[cat] || cat}</span>
              <span className="toolbar-group-count">{items.length}</span>
            </button>
            {!collapsed[cat] && (
              <div className="toolbar-group-items">
                {items.map(({ type, config }) => (
                  <div
                    key={type}
                    className="toolbar-item"
                    onDragStart={(e) => onDragStart(e, type)}
                    draggable
                  >
                    <config.icon size={14} className="toolbar-item-icon" style={{ color: config.accentColor }} />
                    <span className="toolbar-item-label">{config.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
