import { COLORS } from '../data/constants'

export default function SelectCard({ options, value, onChange }) {
  return (
    <div style={{
      display:               'grid',
      gridTemplateColumns:   'repeat(auto-fit, minmax(200px, 1fr))',
      gap:                   12,
    }}>
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              display:     'flex',
              alignItems:  'center',
              gap:         12,
              padding:     '14px 16px',
              borderRadius: 14,
              border:      active ? `2px solid ${COLORS.primary}` : `1.5px solid ${COLORS.border}`,
              background:  active ? COLORS.primaryLight : COLORS.white,
              cursor:      'pointer',
              textAlign:   'left',
              transition:  'all 0.2s',
              transform:   active ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <span style={{ fontSize: 22 }}>{opt.icon}</span>
            <span style={{
              fontWeight: active ? 700 : 600,
              fontSize:   14,
              color:      active ? COLORS.primaryDark : COLORS.text,
            }}>
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
