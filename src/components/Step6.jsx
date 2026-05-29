import ScoreCard from './ScoreCard'
import { COLORS, ENROL_OPTIONS } from '../data/constants'

export default function Step6({ form }) {
  const enrolOption = ENROL_OPTIONS.find((o) => o.value === form.enrollLikelihood)

  return (
    <div>
      <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 26, color: COLORS.text, margin: '0 0 6px' }}>
        Your Feedback Summary 📋
      </h2>
      <p style={{ color: COLORS.textMuted, marginBottom: 24, fontSize: 15, lineHeight: 1.6 }}>
        Here's a quick recap before you submit. Everything look right?
      </p>

      {/* Visit info card */}
      <div style={{
        background: COLORS.white, borderRadius: 18, padding: '18px 20px',
        border: `1.5px solid ${COLORS.border}`, marginBottom: 22,
      }}>
        <p style={{
          fontWeight: 800, fontSize: 12, color: COLORS.textMuted,
          textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px',
        }}>
          Visit Info
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Parent',     value: form.parentName },
            { label: 'Child',      value: form.childName },
            { label: 'Age Group',  value: form.childAge },
            { label: 'Centre',     value: form.centre?.replace('Intellitots ', '') },
          ].map((item) => (
            <div key={item.label} style={{ background: COLORS.soft, borderRadius: 10, padding: '10px 12px' }}>
              <p style={{ fontSize: 11, color: COLORS.textMuted, margin: 0 }}>{item.label}</p>
              <p style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, margin: '2px 0 0', wordBreak: 'break-word' }}>
                {item.value || '—'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <p style={{
        fontWeight: 800, fontSize: 12, color: COLORS.textMuted,
        textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12,
      }}>
        Your Ratings
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
        <ScoreCard label="Cleanliness & Hygiene"      emoji="🧹" value={form.cleanliness} />
        <ScoreCard label="Safety & Infrastructure"    emoji="🛡️" value={form.safety} />
        <ScoreCard label="Play Areas & Facilities"    emoji="🎠" value={form.playArea} />
        <ScoreCard label="Teacher Warmth"             emoji="💛" value={form.teacherWarmth} />
        <ScoreCard label="Teacher Attentiveness"      emoji="👁️" value={form.teacherAttention} />
        <ScoreCard label="Staff Behaviour"            emoji="🤝" value={form.staffBehaviour} />
        <ScoreCard label="Curriculum Overview"        emoji="📖" value={form.curriculumImpression} />
        <ScoreCard label="Activities & Learning"      emoji="🎨" value={form.activities} />
        <ScoreCard label="Learning Environment"       emoji="🧠" value={form.learningEnvironment} />
      </div>

      {/* Open feedback */}
      {form.openFeedback && (
        <div style={{
          background: COLORS.primaryLight, borderRadius: 14, padding: '14px 16px',
          marginBottom: 18, border: `1.5px solid ${COLORS.border}`,
        }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: COLORS.primaryDark, margin: '0 0 6px' }}>
            💬 Your Comments
          </p>
          <p style={{ fontSize: 14, color: COLORS.text, margin: 0, lineHeight: 1.6 }}>
            {form.openFeedback}
          </p>
        </div>
      )}

      {/* Enrolment likelihood */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}20)`,
        borderRadius: 14, padding: '14px 16px',
        border: `1.5px solid ${COLORS.border}`,
        display: 'flex', gap: 12, alignItems: 'center',
      }}>
        <span style={{ fontSize: 24 }}>{enrolOption?.icon || '🤔'}</span>
        <div>
          <p style={{ fontSize: 12, color: COLORS.textMuted, margin: 0 }}>Likelihood to Enrol</p>
          <p style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, margin: '2px 0 0' }}>
            {enrolOption?.label || '—'}
          </p>
        </div>
      </div>
    </div>
  )
}
