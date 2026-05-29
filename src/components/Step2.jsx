import EmojiRating from './EmojiRating'
import { COLORS } from '../data/constants'

export default function Step2({ form, update, childName }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 26, color: COLORS.text, margin: '0 0 6px' }}>
        Centre Environment ✨
      </h2>
      <p style={{ color: COLORS.textMuted, marginBottom: 28, fontSize: 15, lineHeight: 1.6 }}>
        How did the centre feel when you walked in with {childName || 'your child'}?
      </p>

      <EmojiRating
        label="🧹 Cleanliness & Hygiene"
        value={form.cleanliness}
        onChange={(v) => update('cleanliness', v)}
        color={COLORS.primary}
      />
      <EmojiRating
        label="🛡️ Safety & Infrastructure"
        value={form.safety}
        onChange={(v) => update('safety', v)}
        color={COLORS.accent}
      />
      <EmojiRating
        label="🎠 Play Areas & Facilities"
        value={form.playArea}
        onChange={(v) => update('playArea', v)}
        color={COLORS.secondary}
      />
    </div>
  )
}
