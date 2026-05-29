import { COLORS } from '../data/constants'

export default function StepDots({ current, total }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
      {Array.from({ length: total }).map((_, i) => {
        const isDone    = i + 1 < current
        const isCurrent = i + 1 === current
        return (
          <div
            key={i}
            style={{
              width:        isCurrent ? 28 : 8,
              height:       8,
              borderRadius: 4,
              background:   isDone ? COLORS.success : isCurrent ? COLORS.primary : '#E0E0E0',
              transition:   'all 0.35s ease',
            }}
          />
        )
      })}
    </div>
  )
}
