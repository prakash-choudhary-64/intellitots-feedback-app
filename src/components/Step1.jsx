import { COLORS, CENTRES, AGE_GROUPS } from '../data/constants'

export default function Step1({ form, update }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 26, color: COLORS.text, margin: '0 0 6px' }}>
        Welcome! 👋
      </h2>
      <p style={{ color: COLORS.textMuted, marginBottom: 28, fontSize: 15, lineHeight: 1.6 }}>
        Tell us a little about your visit — we'd love to personalise this for you.
      </p>

      {/* Parent Name */}
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, display: 'block', marginBottom: 8 }}>
          Parent / Guardian Name *
        </label>
        <input
          value={form.parentName}
          onChange={(e) => update('parentName', e.target.value)}
          placeholder="Your full name"
          style={{
            width: '100%', padding: '12px 16px', borderRadius: 12,
            border: `1.5px solid ${form.parentName ? COLORS.primary : COLORS.border}`,
            fontSize: 15, outline: 'none', transition: 'border-color 0.2s',
            background: COLORS.white, color: COLORS.text,
          }}
        />
      </div>

      {/* Child Name */}
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, display: 'block', marginBottom: 8 }}>
          Child's Name *
        </label>
        <input
          value={form.childName}
          onChange={(e) => update('childName', e.target.value)}
          placeholder="Your little one's name"
          style={{
            width: '100%', padding: '12px 16px', borderRadius: 12,
            border: `1.5px solid ${form.childName ? COLORS.primary : COLORS.border}`,
            fontSize: 15, outline: 'none', background: COLORS.white, color: COLORS.text,
          }}
        />
      </div>

      {/* Age Group */}
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, display: 'block', marginBottom: 8 }}>
          Child's Age Group *
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          {AGE_GROUPS.map((ag) => (
            <button
              key={ag}
              onClick={() => update('childAge', ag)}
              style={{
                padding: '10px 12px', borderRadius: 12,
                border: `1.5px solid ${form.childAge === ag ? COLORS.primary : COLORS.border}`,
                background: form.childAge === ag ? COLORS.primaryLight : COLORS.white,
                fontWeight: 700, fontSize: 13,
                color: form.childAge === ag ? COLORS.primaryDark : COLORS.text,
                cursor: 'pointer', transition: 'all 0.2s',
                transform: form.childAge === ag ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              {ag}
            </button>
          ))}
        </div>
      </div>

      {/* Centre */}
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, display: 'block', marginBottom: 8 }}>
          Centre Visited *
        </label>
        <select
          value={form.centre}
          onChange={(e) => update('centre', e.target.value)}
          style={{
            width: '100%', padding: '12px 16px', borderRadius: 12,
            border: `1.5px solid ${form.centre ? COLORS.primary : COLORS.border}`,
            fontSize: 15, outline: 'none', background: COLORS.white,
            color: form.centre ? COLORS.text : COLORS.textMuted,
          }}
        >
          <option value="">Select centre...</option>
          {CENTRES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Visit Date */}
      <div>
        <label style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, display: 'block', marginBottom: 8 }}>
          Visit Date
        </label>
        <input
          type="date"
          value={form.visitDate}
          onChange={(e) => update('visitDate', e.target.value)}
          style={{
            width: '100%', padding: '12px 16px', borderRadius: 12,
            border: `1.5px solid ${COLORS.border}`,
            fontSize: 15, outline: 'none', background: COLORS.white, color: COLORS.text,
          }}
        />
      </div>
    </div>
  )
}
