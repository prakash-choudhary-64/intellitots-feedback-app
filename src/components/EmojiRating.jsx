import { useState } from 'react'
import { RATING_OPTIONS, COLORS } from '../data/constants'

export default function EmojiRating({ label, value, onChange, color }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ marginBottom: 26 }}>
      <p style={{ fontWeight: 700, fontSize: 15, color: COLORS.text, marginBottom: 12 }}>
        {label}
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {RATING_OPTIONS.map((opt) => {
          const active    = value === opt.value
          const isHovered = hovered === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              onMouseEnter={() => setHovered(opt.value)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                padding:        '10px 14px',
                borderRadius:   16,
                border:         active ? `2px solid ${color}` : '2px solid transparent',
                background:     active ? `${color}18` : isHovered ? '#FFF5F0' : '#F8F8F8',
                cursor:         'pointer',
                transition:     'all 0.2s',
                minWidth:       64,
                transform:      active ? 'scale(1.12)' : isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <span style={{ fontSize: active ? 30 : 24, transition: 'font-size 0.2s', display: 'block' }}>
                {opt.emoji}
              </span>
              <span style={{
                fontSize:   11,
                fontWeight: 600,
                color:      active ? color : COLORS.textMuted,
                marginTop:  4,
              }}>
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
