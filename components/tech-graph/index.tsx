"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { PointerEvent } from "react";

type GroupKey = "frontend" | "api" | "backend" | "tools";

type Group = {
  key: GroupKey;
  label: string;
  arc: number;
  items: string[];
};

type TechNode = {
  id: string;
  label: string;
  group?: GroupKey;
  kind: "core" | "hub" | "leaf";
  x: number;
  y: number;
  r: number;
  phase: number;
};

type Link = [string, string];

const GROUPS: Group[] = [
  {
    key: "frontend",
    label: "Frontend",
    arc: 150,
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Vue.js", "Angular", "Tailwind CSS"],
  },
  {
    key: "api",
    label: "Data & APIs",
    arc: 80,
    items: ["React Query", "GraphQL", "REST APIs", "Axios", "Fetch API"],
  },
  {
    key: "backend",
    label: "Backend",
    arc: 68,
    items: ["Python", "FastAPI", "Node.js", "Express.js"],
  },
  {
    key: "tools",
    label: "Tooling",
    arc: 62,
    items: ["Datadog RUM", "Git", "AI-assisted dev"],
  },
];

const COLOR: Record<GroupKey, string> = {
  frontend: "var(--g-frontend)",
  api: "var(--g-api)",
  backend: "var(--g-backend)",
  tools: "var(--g-tools)",
};

const SIZE = 600;
const CENTER = SIZE / 2;

function buildGraph(): { nodes: TechNode[]; links: Link[] } {
  const nodes: TechNode[] = [
    {
      id: "core",
      label: "Software Engineering",
      kind: "core",
      x: CENTER,
      y: CENTER,
      r: 34,
      phase: 0,
    },
  ];

  const links: Link[] = [];
  let start = -90 - GROUPS[0]!.arc / 2;
  let phaseIndex = 0;

  GROUPS.forEach((group) => {
    const mid = start + group.arc / 2;
    const radians = (mid * Math.PI) / 180;
    const hubRadius = group.key === "frontend" ? 120 : 130;
    const hubId = `hub-${group.key}`;

    nodes.push({
      id: hubId,
      label: group.label,
      group: group.key,
      kind: "hub",
      x: CENTER + Math.cos(radians) * hubRadius,
      y: CENTER + Math.sin(radians) * hubRadius,
      r: group.key === "frontend" ? 16 : 12,
      phase: phaseIndex++ * 1.7,
    });

    links.push(["core", hubId]);

    group.items.forEach((label, index) => {
      const count = group.items.length;
      const angle = ((start + 8 + ((group.arc - 16) * (index + 0.5)) / count) * Math.PI) / 180;

      const ring = 225 + (index % 2 ? 22 : -6);
      const id = `${group.key}-${label}`;

      nodes.push({
        id,
        label,
        group: group.key,
        kind: "leaf",
        x: CENTER + Math.cos(angle) * ring,
        y: CENTER + Math.sin(angle) * ring,
        r: group.key === "frontend" ? 9 : 6.5,
        phase: phaseIndex++ * 1.7,
      });

      links.push([hubId, id]);
    });

    start += group.arc;
  });

  return { nodes, links };
}

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");

  media.addEventListener("change", callback);

  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return true;
}

export function TechGraph() {
  const [graph] = useState(() => buildGraph());

  const [nodes, setNodes] = useState<TechNode[]>(() => graph.nodes.map((node) => ({ ...node })));

  const [active, setActive] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [time, setTime] = useState(0);

  const svgRef = useRef<SVGSVGElement>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const links = graph.links;

  const byId = useMemo(
    () => Object.fromEntries(nodes.map((node) => [node.id, node])) as Record<string, TechNode>,
    [nodes],
  );

  const activeNode = active ? byId[active] : null;
  const activeGroup = activeNode?.group;

  useEffect(() => {
    if (reducedMotion) return;

    let frameId = 0;

    const animate = (now: number) => {
      setTime(now / 1000);
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [reducedMotion]);

  const getPosition = (node: TechNode) => {
    if (reducedMotion || node.kind === "core" || draggingId === node.id) {
      return { x: node.x, y: node.y };
    }

    const amplitude = node.kind === "hub" ? 3 : 5;

    return {
      x: node.x + Math.sin(time * 0.6 + node.phase) * amplitude,
      y: node.y + Math.cos(time * 0.5 + node.phase) * amplitude,
    };
  };

  const isLit = (node: TechNode) =>
    !activeNode ||
    node.id === active ||
    node.kind === "core" ||
    (!!activeGroup && node.group === activeGroup);

  const groupLabel = (group?: GroupKey) =>
    GROUPS.find((item) => item.key === group)?.label ?? "Core";

  const toSvg = (event: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;

    if (!svg) return { x: 0, y: 0 };

    const rect = svg.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * SIZE,
      y: ((event.clientY - rect.top) / rect.height) * SIZE,
    };
  };

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!draggingId) return;

    const position = toSvg(event);

    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === draggingId
          ? {
              ...node,
              x: Math.max(20, Math.min(SIZE - 20, position.x)),
              y: Math.max(20, Math.min(SIZE - 20, position.y)),
            }
          : node,
      ),
    );
  };

  const stopDragging = () => {
    setDraggingId(null);
  };

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-auto w-full touch-none select-none"
        role="group"
        aria-label="Interactive graph of technologies grouped by category"
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={130}
          fill="none"
          stroke="var(--border)"
          strokeDasharray="2 6"
        />

        <circle
          cx={CENTER}
          cy={CENTER}
          r={235}
          fill="none"
          stroke="var(--border)"
          strokeDasharray="2 6"
        />

        {links.map(([sourceId, targetId]) => {
          const source = byId[sourceId]!;
          const target = byId[targetId]!;

          const from = getPosition(source);
          const to = getPosition(target);

          const highlighted = !!activeNode && isLit(target) && target.group === activeGroup;

          const color = target.group ? COLOR[target.group] : "var(--foreground)";

          return (
            <line
              key={`${sourceId}-${targetId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={highlighted ? color : "var(--muted-foreground)"}
              strokeOpacity={activeNode ? (highlighted ? 0.9 : 0.12) : 0.35}
              strokeWidth={highlighted ? 1.6 : 1}
              style={{ transition: "stroke-opacity .6s ease" }}
            />
          );
        })}

        {nodes.map((node, index) => {
          const position = getPosition(node);
          const highlighted = isLit(node);
          const selected = node.id === active;
          const labelBelow = position.y > CENTER;

          const color = node.group ? COLOR[node.group] : "var(--foreground)";

          return (
            <g
              key={node.id}
              tabIndex={0}
              role="button"
              aria-label={`${node.label} — ${groupLabel(node.group)}`}
              aria-pressed={selected}
              className="cursor-pointer outline-none"
              style={{
                opacity: highlighted ? 1 : 0.25,
                transition: `opacity .6s ease ${!activeNode ? index * 25 : 0}ms`,
              }}
              onPointerEnter={() => setActive(node.id)}
              onPointerLeave={() => {
                if (!draggingId) setActive(null);
              }}
              onFocus={() => setActive(node.id)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(node.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActive(node.id);
                }
              }}
              onPointerDown={(event) => {
                if (node.kind === "core" || event.pointerType !== "mouse") {
                  return;
                }

                setDraggingId(node.id);
              }}
            >
              <circle
                cx={position.x}
                cy={position.y}
                r={Math.max(node.r + 10, 18)}
                fill="transparent"
              />

              {selected && (
                <circle
                  cx={position.x}
                  cy={position.y}
                  r={node.r + 7}
                  fill={color}
                  opacity={0.15}
                />
              )}

              <circle
                cx={position.x}
                cy={position.y}
                r={node.r}
                fill={node.kind === "leaf" ? "var(--card)" : color}
                stroke={color}
                strokeWidth={node.kind === "leaf" ? 2 : 0}
              />

              {node.kind === "core" ? (
                <text
                  x={position.x}
                  y={position.y + 54}
                  textAnchor="middle"
                  className="fill-foreground font-mono text-[13px] font-medium"
                >
                  Software Engineering
                </text>
              ) : (
                <text
                  x={position.x}
                  y={labelBelow ? position.y + node.r + 16 : position.y - node.r - 9}
                  textAnchor="middle"
                  className={
                    node.kind === "hub"
                      ? "fill-foreground font-mono text-[11px] uppercase tracking-wider"
                      : node.group === "frontend"
                        ? "fill-foreground text-[14px] font-medium"
                        : "fill-muted-foreground text-[12.5px]"
                  }
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div
        aria-live="polite"
        className="pointer-events-none absolute bottom-0 left-0 flex items-center gap-3 rounded-md border bg-card/90 px-3 py-2 shadow-soft backdrop-blur"
      >
        {activeNode ? (
          <>
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                background: activeNode.group ? COLOR[activeNode.group] : "var(--foreground)",
              }}
            />

            <span className="text-sm font-medium">{activeNode.label}</span>

            <span className="eyebrow">{groupLabel(activeNode.group)}</span>
          </>
        ) : (
          <span className="eyebrow">Hover or tap a node</span>
        )}
      </div>
    </div>
  );
}

export function TechGraphFallback() {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {GROUPS.flatMap((group) => group.items).map((item) => (
        <li key={item} className="rounded-md border px-2 py-1 text-sm">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default TechGraph;
