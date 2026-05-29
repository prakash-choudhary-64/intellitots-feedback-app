import EmojiRating from './EmojiRating'
import { COLORS } from '../data/constants'

export default function Step4({ form, update, childName }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 26, color: COLORS.text, margin: '0 0 6px' }}>
        Curriculum & Activities 📚
      </h2>
      <p style={{ color: COLORS.textMuted, marginBottom: 28, fontSize: 15, lineHeight: 1.6 }}>
        How did the learning experience look for {childName || 'your child'}'s age group?
      </p>

      <EmojiRating
        label="📖 Curriculum Overview"
        value={form.curriculumImpression}
        onChange={(v) => update('curriculumImpression', v)}
        color={COLORS.primary}
      />
      <EmojiRating
        label="🎨 Activities & Play-based Learning"
        value={form.activities}
        onChange={(v) => update('activities', v)}
        color={COLORS.secondary}
      />
      <EmojiRating
        label="🧠 Learning Environment & Setup"
        value={form.learningEnvironment}
        onChange={(v) => update('learningEnvironment', v)}
        color={COLORS.accent}
      />
    </div>
  )
}
