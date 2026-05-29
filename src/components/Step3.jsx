import EmojiRating from './EmojiRating'
import { COLORS } from '../data/constants'

export default function Step3({ form, update, childName }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 26, color: COLORS.text, margin: '0 0 6px' }}>
        Teachers & Staff 👩‍🏫
      </h2>
      <p style={{ color: COLORS.textMuted, marginBottom: 28, fontSize: 15, lineHeight: 1.6 }}>
        How did the team interact with you and {childName || 'your child'}?
      </p>

      <EmojiRating
        label="💛 Warmth & Friendliness"
        value={form.teacherWarmth}
        onChange={(v) => update('teacherWarmth', v)}
        color={COLORS.secondary}
      />
      <EmojiRating
        label={`👁️ Attentiveness to ${childName || 'your child'}`}
        value={form.teacherAttention}
        onChange={(v) => update('teacherAttention', v)}
        color={COLORS.primary}
      />
      <EmojiRating
        label="🤝 Overall Staff Behaviour"
        value={form.staffBehaviour}
        onChange={(v) => update('staffBehaviour', v)}
        color={COLORS.accent}
      />
    </div>
  )
}
