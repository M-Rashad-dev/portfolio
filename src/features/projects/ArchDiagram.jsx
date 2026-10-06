/** Vertical flow diagram: node -> node -> ... rendered as SVG (read as LTR labels). */
export default function ArchDiagram({ nodes, note }) {
  const w = 260
  const h = 44
  const gap = 28
  const total = nodes.length * h + (nodes.length - 1) * gap
  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${w} ${total}`} className="mx-auto w-full max-w-[260px]" role="img" aria-label={nodes.join(' → ')}>
        <defs>
          <marker id="arr" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0 0L8 4L0 8z" fill="#A9CFDD" />
          </marker>
        </defs>
        {nodes.map((n, i) => {
          const y = i * (h + gap)
          return (
            <g key={n}>
              <path
                d={`M0 ${y}H${w}V${y + h}H18Q0 ${y + h} 0 ${y + h - 18}Z`}
                fill="#2C3841"
                stroke="rgba(169,207,221,0.30)"
              />
              <text x={w / 2} y={y + h / 2 + 4} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#EEF1F0">
                {n}
              </text>
              {i < nodes.length - 1 && (
                <line x1={w / 2} y1={y + h + 2} x2={w / 2} y2={y + h + gap - 4} stroke="#A9CFDD" strokeWidth="1" markerEnd="url(#arr)" />
              )}
            </g>
          )
        })}
      </svg>
      {note && <figcaption className="mt-3 text-center text-sm text-muted-dark">{note}</figcaption>}
    </figure>
  )
}
