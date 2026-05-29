import Confetti from './Confetti'
import { COLORS } from '../data/constants'

const NEXT_STEPS = [
  { icon: '📋', step: 'Team reviews your feedback',         time: 'Right away' },
  { icon: '📞', step: 'Our counsellor reaches out to you',  time: 'Within 24 hours' },
  { icon: '💡', step: 'Your questions & concerns answered', time: 'Personalised for you' },
]

export default function ThankYou({ form, showConfetti, onReset }) {
  const firstName = form.parentName?.split(' ')[0] || 'there'

  return (
    <div style={{
      minHeight:  '100vh',
      background: 'linear-gradient(135deg, #FFF8F5 0%, #FFF0EB 100%)',
      display:    'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position:   'relative',
      overflow:   'hidden',
    }}>
      <Confetti active={showConfetti} />

      <div style={{
        maxWidth:   520,
        margin:     '0 auto',
        padding:    '40px 24px',
        textAlign:  'center',
        position:   'relative',
        zIndex:     1,
      }}>
        {/* Big emoji */}
        <div style={{ fontSize: 80, marginBottom: 16, animation: 'bounce 0.6s ease' }}>
          🎉
        </div>

        <h1 style={{
          fontFamily: "'Baloo 2', cursive",
          fontSize:   32,
          color:      COLORS.primary,
          margin:     '0 0 12px',
        }}>
          Thank You, {firstName}!
        </h1>

        <p style={{ fontSize: 16, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 32 }}>
          Your feedback about{' '}
          <strong style={{ color: COLORS.text }}>{form.centre}</strong>{' '}
          means a lot to us. We're committed to making every visit memorable for little{' '}
          <strong style={{ color: COLORS.text }}>{form.childName}</strong>! 🌟
        </p>

        {/* What happens next */}
        <div style={{
          background:   COLORS.white,
          borderRadius: 20,
          padding:      24,
          marginBottom: 24,
          border:       `1.5px solid ${COLORS.border}`,
          textAlign:    'left',
        }}>
          <p style={{ fontWeight: 800, fontSize: 15, color: COLORS.text, marginBottom: 18 }}>
            What happens next
          </p>
          {NEXT_STEPS.map((item, i) => (
            <div key={i} style={{
              display:      'flex',
              gap:          14,
              marginBottom: i < NEXT_STEPS.length - 1 ? 18 : 0,
              alignItems:   'flex-start',
            }}>
              <div style={{
                width:          38,
                height:         38,
                borderRadius:   '50%',
                background:     COLORS.primaryLight,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       20,
                flexShrink:     0,
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, margin: 0 }}>
                  {item.step}
                </p>
                <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '3px 0 0' }}>
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Centre badge */}
        <div style={{
          background:   `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
          borderRadius: 16,
          padding:      '18px 24px',
          color:        COLORS.white,
          textAlign:    'center',
          marginBottom: 20,
        }}>
          <p style={{ fontSize: 13, opacity: 0.85, margin: '0 0 4px' }}>Submitted from</p>
          <p style={{ fontWeight: 800, fontSize: 17, margin: 0 }}>{form.centre}</p>
        </div>

        {/* Reset button */}
        <button
          onClick={onReset}
          style={{
            width:        '100%',
            padding:      '14px',
            borderRadius: 14,
            border:       `1.5px solid ${COLORS.border}`,
            background:   COLORS.white,
            fontFamily:   "'Nunito', sans-serif",
            fontWeight:   700,
            fontSize:     15,
            color:        COLORS.textMuted,
            cursor:       'pointer',
            transition:   'all 0.2s',
          }}
        >
          📝 Submit Another Form
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}