export const COLORS = {
  primary: '#FF6B35',
  primaryLight: '#FFF0EB',
  primaryDark: '#E05520',
  secondary: '#FFB347',
  accent: '#4ECDC4',
  soft: '#FFF8F5',
  text: '#2D2D2D',
  textMuted: '#888888',
  white: '#FFFFFF',
  success: '#4CAF50',
  border: '#FFE0D0',
}

export const STEPS = [
  { id: 1, label: 'Visit Details',    icon: '🏫' },
  { id: 2, label: 'Environment',      icon: '✨' },
  { id: 3, label: 'Teachers',         icon: '👩‍🏫' },
  { id: 4, label: 'Curriculum',       icon: '📚' },
  { id: 5, label: 'Fee & Next Steps', icon: '💬' },
  { id: 6, label: 'Summary',          icon: '📋' },
]

export const RATING_OPTIONS = [
  { value: 1, emoji: '😞', label: 'Poor' },
  { value: 2, emoji: '😕', label: 'Below Avg' },
  { value: 3, emoji: '😊', label: 'Good' },
  { value: 4, emoji: '😄', label: 'Very Good' },
  { value: 5, emoji: '🤩', label: 'Excellent' },
]

export const FEE_OPTIONS = [
  { value: 'comfortable', icon: '✅', label: 'Comfortable with fees' },
  { value: 'discussion',  icon: '💬', label: 'Need more discussion' },
  { value: 'concern',     icon: '🤔', label: 'Fees are a concern' },
  { value: 'info',        icon: '📄', label: 'Need detailed fee info' },
]

export const ENROL_OPTIONS = [
  { value: 'yes',       icon: '🎉', label: 'Yes, very likely!' },
  { value: 'maybe',     icon: '🤔', label: 'Still deciding' },
  { value: 'comparing', icon: '🔍', label: 'Comparing options' },
  { value: 'no',        icon: '😔', label: 'Not at the moment' },
]

export const CENTRES = [
  'Intellitots Banjara Hills',
  'Intellitots Jubilee Hills',
  'Intellitots Kondapur',
  'Intellitots Gachibowli',
  'Intellitots Madhapur',
  'Intellitots Kukatpally',
]

export const AGE_GROUPS = [
  '3 months – 1 year',
  '1 – 2 years',
  '2 – 3 years',
  '3 – 4 years',
  '4 – 5 years',
  '5 – 6 years',
]

export const INITIAL_FORM = {
  parentName:            '',
  childName:             '',
  childAge:              '',
  centre:                '',
  visitDate:             '',
  cleanliness:           null,
  safety:                null,
  playArea:              null,
  teacherWarmth:         null,
  teacherAttention:      null,
  staffBehaviour:        null,
  curriculumImpression:  null,
  activities:            null,
  learningEnvironment:   null,
  feeComfort:            '',
  enrollLikelihood:      '',
  openFeedback:          '',
}
