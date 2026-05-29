import { useState } from 'react'

import Header    from './components/Header'
import StepDots  from './components/StepDots'
import BottomNav from './components/BottomNav'
import ThankYou  from './components/ThankYou'

import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step3'
import Step4 from './components/Step4'
import Step5 from './components/Step5'
import Step6 from './components/Step6'

import { STEPS, INITIAL_FORM } from './data/constants'
import { supabase } from './lib/supabaseClient'

const TOTAL_STEPS = STEPS.length

function isStepValid(step, form) {
  switch (step) {
    case 1: return !!(form.centre && form.childName && form.childAge && form.parentName)
    case 2: return !!(form.cleanliness && form.safety && form.playArea)
    case 3: return !!(form.teacherWarmth && form.teacherAttention && form.staffBehaviour)
    case 4: return !!(form.curriculumImpression && form.activities && form.learningEnvironment)
    case 5: return !!(form.feeComfort && form.enrollLikelihood)
    default: return true
  }
}

export default function App() {
  const [step, setStep]             = useState(1)
  const [form, setForm]             = useState(INITIAL_FORM)
  const [submitted, setSubmitted]   = useState(false)
  const [showConfetti, setConfetti] = useState(false)
  const [animating, setAnimating]   = useState(false)
  const [direction, setDirection]   = useState('forward')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const transition = (newStep, dir) => {
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setStep(newStep)
      setAnimating(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 180)
  }

  const goNext = () => transition(step + 1, 'forward')
  const goBack = () => transition(step - 1, 'back')

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError(null)

    const payload = {
      parent_name:              form.parentName,
      child_name:               form.childName,
      child_age:                form.childAge,
      centre_name:              form.centre,
      visit_date:               form.visitDate || null,
      score_cleanliness:        form.cleanliness,
      score_safety:             form.safety,
      score_play_area:          form.playArea,
      score_teacher_warmth:     form.teacherWarmth,
      score_teacher_attention:  form.teacherAttention,
      score_staff_behaviour:    form.staffBehaviour,
      score_curriculum:         form.curriculumImpression,
      score_activities:         form.activities,
      score_environment:        form.learningEnvironment,
      fee_comfort:              form.feeComfort,
      enrol_likelihood:         form.enrollLikelihood,
      open_feedback:            form.openFeedback || null,
    }

    const { error } = await supabase.from('submissions').insert([payload])

    if (error) {
      console.error('Supabase error:', error)
      setSubmitError('Something went wrong. Please try again.')
      setSubmitting(false)
      return
    }

    setSubmitting(false)
    setSubmitted(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 4200)
  }

  const handleReset = () => {
    setForm(INITIAL_FORM)
    setStep(1)
    setSubmitted(false)
    setSubmitError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return <ThankYou form={form} showConfetti={showConfetti} onReset={handleReset} />
  }

  const slideStyle = {
    opacity:   animating ? 0 : 1,
    transform: animating
      ? direction === 'forward' ? 'translateX(28px)' : 'translateX(-28px)'
      : 'translateX(0)',
    transition: 'opacity 0.18s ease, transform 0.18s ease',
  }

  const stepProps = { form, update, childName: form.childName }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header step={step} />

      <div style={{ maxWidth: 620, margin: '0 auto', padding: '32px 20px 130px' }}>
        <StepDots current={step} total={TOTAL_STEPS} />

        <div style={slideStyle}>
          {step === 1 && <Step1 {...stepProps} />}
          {step === 2 && <Step2 {...stepProps} />}
          {step === 3 && <Step3 {...stepProps} />}
          {step === 4 && <Step4 {...stepProps} />}
          {step === 5 && <Step5 {...stepProps} />}
          {step === 6 && <Step6 form={form} />}
        </div>

        {/* Inline error message above bottom nav */}
        {submitError && (
          <div style={{
            margin: '16px 0 0',
            padding: '12px 16px',
            borderRadius: 12,
            background: '#FFF0F0',
            border: '1.5px solid #FFCCCC',
            color: '#CC3333',
            fontSize: 14,
            fontWeight: 600,
            textAlign: 'center',
          }}>
            ⚠️ {submitError}
          </div>
        )}
      </div>

      <BottomNav
        step={step}
        canProceed={isStepValid(step, form)}
        onNext={goNext}
        onBack={goBack}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  )
}