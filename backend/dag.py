from collections import defaultdict
from typing import Any


def analyze(nodes, edges) -> dict[str, Any]:
    node_ids = {n.id for n in nodes}
    adj: dict[str, list[str]] = defaultdict(list)

    for e in edges:
        if e.source in node_ids and e.target in node_ids:
            adj[e.source].append(e.target)

    # 0 = unvisited, 1 = visiting (in current DFS path), 2 = fully visited
    state: dict[str, int] = {nid: 0 for nid in node_ids}
    topo_postorder: list[str] = []
    cycles: list[list[str]] = []
    path: list[str] = []
    path_index: dict[str, int] = {}
    seen_cycles: set[tuple[str, ...]] = set()

    def dfs(u: str) -> None:
        state[u] = 1
        path_index[u] = len(path)
        path.append(u)

        for v in adj[u]:
            if state[v] == 0:
                dfs(v)
            elif state[v] == 1:
                start = path_index[v]
                cycle = path[start:] + [v]
                cycle_sig = tuple(cycle)
                if cycle_sig not in seen_cycles:
                    seen_cycles.add(cycle_sig)
                    cycles.append(cycle)

        path.pop()
        path_index.pop(u, None)
        state[u] = 2
        topo_postorder.append(u)

    for nid in sorted(node_ids):
        if state[nid] == 0:
            dfs(nid)

    is_dag = len(cycles) == 0

    return {
        "is_dag": is_dag,
        "cycles": cycles,
        "topological_order": list(reversed(topo_postorder)) if is_dag else None,
    }
