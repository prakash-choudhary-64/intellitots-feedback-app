import { COLORS, STEPS } from '../data/constants'

export default function BottomNav({ step, canProceed, onNext, onBack, onSubmit, submitting }) {
  const isLast = step === STEPS.length

  return (
    <div style={{
      position:   'fixed',
      bottom:     0,
      left:       '50%',
      transform:  'translateX(-50%)',
      width:      '100%',
      maxWidth:   620,
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(12px)',
      borderTop:  `1.5px solid ${COLORS.border}`,
      padding:    '14px 20px',
      display:    'flex',
      gap:        12,
      zIndex:     200,
    }}>
      {step > 1 && (
        <button
          onClick={onBack}
          disabled={submitting}
          style={{
            flex:         1,
            padding:      '14px',
            borderRadius: 14,
            border:       `1.5px solid ${COLORS.border}`,
            background:   COLORS.white,
            fontWeight:   700,
            fontSize:     15,
            color:        COLORS.textMuted,
            cursor:       submitting ? 'not-allowed' : 'pointer',
            transition:   'all 0.2s',
            opacity:      submitting ? 0.5 : 1,
          }}
        >
          ← Back
        </button>
      )}

      {!isLast ? (
        <button
          onClick={onNext}
          disabled={!canProceed}
          style={{
            flex:         3,
            padding:      '14px',
            borderRadius: 14,
            border:       'none',
            background:   canProceed
              ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
              : '#E0E0E0',
            fontWeight:   800,
            fontSize:     15,
            color:        canProceed ? COLORS.white : COLORS.textMuted,
            cursor:       canProceed ? 'pointer' : 'not-allowed',
            transition:   'all 0.2s',
          }}
        >
          Continue →
        </button>
      ) : (
        <button
          onClick={onSubmit}
          disabled={submitting}
          style={{
            flex:         3,
            padding:      '14px',
            borderRadius: 14,
            border:       'none',
            background:   submitting
              ? '#A5D6A7'
              : `linear-gradient(135deg, ${COLORS.success}, #45a049)`,
            fontWeight:   800,
            fontSize:     15,
            color:        COLORS.white,
            cursor:       submitting ? 'not-allowed' : 'pointer',
            transition:   'all 0.2s',
          }}
        >
          {submitting ? '⏳ Saving...' : '🎉 Submit Feedback'}
        </button>
      )}
    </div>
  )
}