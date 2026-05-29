import SelectCard from './SelectCard'
import { COLORS, FEE_OPTIONS, ENROL_OPTIONS } from '../data/constants'

export default function Step5({ form, update, childName }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 26, color: COLORS.text, margin: '0 0 6px' }}>
        Fees & Next Steps 💬
      </h2>
      <p style={{ color: COLORS.textMuted, marginBottom: 28, fontSize: 15, lineHeight: 1.6 }}>
        Help us understand where you stand — no pressure, just honesty!
      </p>

      {/* Fee comfort */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontWeight: 700, fontSize: 15, color: COLORS.text, marginBottom: 14 }}>
          How do you feel about the fee structure?
        </p>
        <SelectCard
          options={FEE_OPTIONS}
          value={form.feeComfort}
          onChange={(v) => update('feeComfort', v)}
        />
      </div>

      {/* Enrolment likelihood */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontWeight: 700, fontSize: 15, color: COLORS.text, marginBottom: 14 }}>
          How likely are you to enrol {childName || 'your child'}?
        </p>
        <SelectCard
          options={ENROL_OPTIONS}
          value={form.enrollLikelihood}
          onChange={(v) => update('enrollLikelihood', v)}
        />
      </div>

      {/* Open feedback */}
      <div>
        <label style={{ fontWeight: 700, fontSize: 15, color: COLORS.text, display: 'block', marginBottom: 10 }}>
          💡 Any other thoughts or concerns?
        </label>
        <textarea
          value={form.openFeedback}
          onChange={(e) => update('openFeedback', e.target.value)}
          placeholder={`E.g. "I loved the art room!" or "We'd like to know more about the daily schedule..."`}
          rows={4}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: 14,
            border: `1.5px solid ${COLORS.border}`, fontSize: 14,
            outline: 'none', resize: 'none', background: COLORS.white,
            color: COLORS.text, lineHeight: 1.6, transition: 'border-color 0.2s',
          }}
        />
      </div>
    </div>
  )
}
