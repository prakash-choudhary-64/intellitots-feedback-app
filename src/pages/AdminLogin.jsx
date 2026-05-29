import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const navigate                = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid credentials. Please try again.')
      setLoading(false)
      return
    }

    navigate('/admin')
  }

  return (
    <div style={{
      minHeight:      '100vh',
      background:     '#0F172A',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      fontFamily:     "'Inter', sans-serif",
      padding:        '24px',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Baloo+2:wght@700;800&display=swap" rel="stylesheet" />

      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, margin: '0 auto 14px',
          }}>
            🏫
          </div>
          <h1 style={{
            fontFamily: "'Baloo 2', cursive", fontSize: 22,
            color: '#F1F5F9', margin: '0 0 4px',
          }}>
            Intellitots Admin
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
            Feedback Dashboard · Restricted Access
          </p>
        </div>

        {/* Card */}
        <div style={{
          background:   '#1E293B',
          borderRadius: 20,
          padding:      '32px 28px',
          border:       '1px solid #334155',
        }}>
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div style={{ marginBottom: 18 }}>
              <label style={{
                display: 'block', fontSize: 13, fontWeight: 600,
                color: '#94A3B8', marginBottom: 8,
              }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@intellitots.com"
                required
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: 12,
                  border: '1px solid #334155', background: '#0F172A',
                  color: '#F1F5F9', fontSize: 15, outline: 'none',
                  boxSizing: 'border-box', transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                onBlur={(e) => e.target.style.borderColor = '#334155'}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block', fontSize: 13, fontWeight: 600,
                color: '#94A3B8', marginBottom: 8,
              }}>
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: 12,
                  border: '1px solid #334155', background: '#0F172A',
                  color: '#F1F5F9', fontSize: 15, outline: 'none',
                  boxSizing: 'border-box', transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                onBlur={(e) => e.target.style.borderColor = '#334155'}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: '#450A0A', border: '1px solid #7F1D1D',
                borderRadius: 10, padding: '10px 14px',
                color: '#FCA5A5', fontSize: 13, marginBottom: 18,
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px',
                borderRadius: 12, border: 'none',
                background: loading
                  ? '#334155'
                  : 'linear-gradient(135deg, #FF6B35, #FFB347)',
                color: '#fff', fontFamily: "'Inter', sans-serif",
                fontWeight: 700, fontSize: 15,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#475569', marginTop: 20 }}>
          FirstCry Intellitots · Internal Use Only
        </p>
      </div>
    </div>
  )
}