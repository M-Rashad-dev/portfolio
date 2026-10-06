/** Tiny JSON/JS-literal highlighter returning React nodes. */
const RE =
  /((?:'[^']*'|"(?:[^"\\]|\\.)*")(?=\s*:))|((?:'[^']*'|"(?:[^"\\]|\\.)*"))|([a-z_]+(?=\s*:))|(-?\b\d+(?:\.\d+)?\b)|([{}[\],:])|((?:'[^']*|"[^"]*)$)/g

export function highlight(text) {
  const out = []
  let last = 0
  let m
  RE.lastIndex = 0
  while ((m = RE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const cls = m[1] || m[3] ? 'json-key' : m[2] || m[6] ? 'json-str' : m[4] ? 'json-num' : 'json-punc'
    out.push(
      <span key={m.index} className={cls}>
        {m[0]}
      </span>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}
