import { RATING_OPTIONS, COLORS } from '../data/constants'

export default function ScoreCard({ label, emoji, value }) {
  const rating = RATING_OPTIONS.find((r) => r.value === value)

  return (
    <div style={{
      background:   COLORS.soft,
      borderRadius: 14,
      padding:      '14px 16px',
      border:       `1.5px solid ${COLORS.border}`,
      display:      'flex',
      alignItems:   'center',
      gap:          14,
    }}>
      <span style={{ fontSize: 24 }}>{emoji}</span>

      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 12, color: COLORS.textMuted, margin: 0 }}>{label}</p>
        <p style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, margin: '3px 0 0' }}>
          {rating ? `${rating.emoji} ${rating.label}` : 'Not rated'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 3 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              width:        6,
              height:       6,
              borderRadius: '50%',
              background:   i <= (value || 0) ? COLORS.primary : '#E0E0E0',
              transition:   'background 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
