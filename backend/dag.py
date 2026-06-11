from collections import defaultdict, deque
from typing import Any, Optional


def analyze(nodes, edges) -> dict[str, Any]:
    node_ids = {n.id for n in nodes}
    adj: dict[str, list[str]] = defaultdict(list)
    in_deg: dict[str, int] = {nid: 0 for nid in node_ids}

    for e in edges:
        if e.source in node_ids and e.target in node_ids:
            adj[e.source].append(e.target)
            in_deg[e.target] = in_deg.get(e.target, 0) + 1

    queue = deque(sorted([n for n, d in in_deg.items() if d == 0]))
    topo: list[str] = []
    in_deg_copy = dict(in_deg)

    while queue:
        u = queue.popleft()
        topo.append(u)
        for v in adj[u]:
            in_deg_copy[v] -= 1
            if in_deg_copy[v] == 0:
                queue.append(v)

    is_dag = len(topo) == len(node_ids)

    cycles: list[list[str]] = []
    if not is_dag:
        remaining = set(node_ids) - set(topo)
        cycles = _find_cycles(remaining, adj, in_deg_copy)

    return {
        "is_dag": is_dag,
        "cycles": cycles,
        "topological_order": topo if is_dag else None,
    }


def _find_cycles(remaining, adj, in_deg):
    cycles: list[list[str]] = []
    seen_in_cycles: set[str] = set()

    def dfs(start: str) -> Optional[list[str]]:
        path: list[str] = []
        visited_in_path: set[str] = set()
        stack = [(start, iter(adj[start]))]
        while stack:
            node, it = stack[-1]
            if node not in visited_in_path:
                visited_in_path.add(node)
                path.append(node)
            advanced = False
            for nxt in it:
                if nxt in visited_in_path:
                    idx = path.index(nxt)
                    return path[idx:] + [nxt]
                if nxt not in seen_in_cycles:
                    stack.append((nxt, iter(adj.get(nxt, []))))
                    advanced = True
                    break
            if not advanced:
                stack.pop()
                if path:
                    path.pop()
                visited_in_path.discard(node)
        return None

    for n in list(remaining):
        if n in seen_in_cycles:
            continue
        c = dfs(n)
        if c:
            cycles.append(c)
            seen_in_cycles.update(c)
    return cycles
