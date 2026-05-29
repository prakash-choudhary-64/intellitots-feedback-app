import { COLORS, STEPS } from '../data/constants'

export default function Header({ step }) {
  const current = STEPS[step - 1]
  const progress = ((step - 1) / (STEPS.length - 1)) * 100

  return (
    <div style={{
      background:   COLORS.white,
      borderBottom: `1.5px solid ${COLORS.border}`,
      padding:      '0 24px',
      position:     'sticky',
      top:          0,
      zIndex:       100,
      boxShadow:    '0 2px 12px rgba(255,107,53,0.08)',
    }}>
      <div style={{
        maxWidth:       620,
        margin:         '0 auto',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        height:         60,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width:          38,
            height:         38,
            borderRadius:   '50%',
            background:     `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       20,
          }}>
            🏫
          </div>
          <div>
            <p style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 800,
              fontSize:   15,
              color:      COLORS.primary,
              margin:     0,
              lineHeight: 1.1,
            }}>
              FirstCry Intellitots
            </p>
            <p style={{ fontSize: 11, color: COLORS.textMuted, margin: 0 }}>
              Demo Visit Feedback
            </p>
          </div>
        </div>

        {/* Step label */}
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 12, color: COLORS.textMuted, margin: 0 }}>
            Step {step} of {STEPS.length}
          </p>
          <p style={{ fontWeight: 700, fontSize: 13, color: COLORS.primary, margin: 0 }}>
            {current.icon} {current.label}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ maxWidth: 620, margin: '0 auto', paddingBottom: 10 }}>
        <div style={{
          height:       4,
          background:   '#FFE0D0',
          borderRadius: 4,
          overflow:     'hidden',
        }}>
          <div style={{
            height:     '100%',
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
            borderRadius: 4,
            width:      `${progress}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>
    </div>
  )
}
