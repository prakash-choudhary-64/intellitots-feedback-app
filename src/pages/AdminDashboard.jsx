import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

// ─── COLOURS ────────────────────────────────────────────────────────────────
const C = {
  bg:       '#0F172A',
  surface:  '#1E293B',
  border:   '#334155',
  text:     '#F1F5F9',
  muted:    '#94A3B8',
  hint:     '#475569',
  primary:  '#FF6B35',
  secondary:'#FFB347',
  success:  '#4ADE80',
  warning:  '#FBBF24',
  danger:   '#F87171',
  info:     '#60A5FA',
}

const PIE_COLORS   = ['#4ADE80', '#60A5FA', '#FBBF24', '#F87171']
const SCORE_COLOR  = (v) => v >= 4 ? C.success : v >= 3 ? C.warning : C.danger

const ENROL_LABELS = {
  yes:       '🎉 Very Likely',
  maybe:     '🤔 Still Deciding',
  comparing: '🔍 Comparing',
  no:        '😔 Not Now',
}
const FEE_LABELS = {
  comfortable: '✅ Comfortable',
  discussion:  '💬 Needs Discussion',
  concern:     '🤔 Concern',
  info:        '📄 Needs Info',
}

const RATING_FIELDS = [
  { key: 'score_cleanliness',       label: 'Cleanliness',     emoji: '🧹' },
  { key: 'score_safety',            label: 'Safety',          emoji: '🛡️' },
  { key: 'score_play_area',         label: 'Play Area',       emoji: '🎠' },
  { key: 'score_teacher_warmth',    label: 'Teacher Warmth',  emoji: '💛' },
  { key: 'score_teacher_attention', label: 'Attentiveness',   emoji: '👁️' },
  { key: 'score_staff_behaviour',   label: 'Staff',           emoji: '🤝' },
  { key: 'score_curriculum',        label: 'Curriculum',      emoji: '📖' },
  { key: 'score_activities',        label: 'Activities',      emoji: '🎨' },
  { key: 'score_environment',       label: 'Environment',     emoji: '🧠' },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const avg = (arr, key) => {
  const vals = arr.map((r) => r[key]).filter(Boolean)
  if (!vals.length) return 0
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)
}

const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    const k = item[key] || 'Unknown'
    acc[k] = (acc[k] || [])
    acc[k].push(item)
    return acc
  }, {})

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function StatCard({ emoji, label, value, sub, color }) {
  return (
    <div style={{
      background: C.surface, borderRadius: 16, padding: '20px 22px',
      border: `1px solid ${C.border}`, flex: 1, minWidth: 140,
    }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: color || C.text, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: C.hint, marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

function ScoreBar({ label, emoji, value }) {
  const pct = ((value / 5) * 100).toFixed(0)
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: C.muted }}>{emoji} {label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: SCORE_COLOR(value) }}>{value} / 5</span>
      </div>
      <div style={{ height: 8, background: C.border, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: SCORE_COLOR(value),
          borderRadius: 4, transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize: 13, fontWeight: 700, color: C.hint,
      textTransform: 'uppercase', letterSpacing: 1.2,
      margin: '36px 0 16px',
    }}>
      {children}
    </h2>
  )
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [rows, setRows]           = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [filterCentre, setFilter] = useState('All')
  const [filterEnrol, setEnrol]   = useState('All')
  const [sortBy, setSortBy]       = useState('created_at')
  const [sortDir, setSortDir]     = useState('desc')
  const [page, setPage]           = useState(0)
  const PER_PAGE = 10
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setRows(data || [])
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  // ── derived data ──────────────────────────────────────────────────────────
  const centres     = ['All', ...Object.keys(groupBy(rows, 'centre_name'))]
  const thisWeek    = rows.filter((r) => {
    const d = new Date(r.created_at)
    const now = new Date()
    return (now - d) / (1000 * 60 * 60 * 24) <= 7
  })

  const likelyEnrol = rows.filter((r) => r.enrol_likelihood === 'yes').length
  const feeConCern  = rows.filter((r) => ['concern', 'discussion'].includes(r.fee_comfort)).length

  const overallAvg  = RATING_FIELDS.reduce((sum, f) => sum + parseFloat(avg(rows, f.key)), 0) / RATING_FIELDS.length

  // per-centre avg scores for bar chart
  const centreChart = Object.entries(groupBy(rows, 'centre_name')).map(([name, recs]) => ({
    name: name.replace('Intellitots ', ''),
    avg:  parseFloat(
      (RATING_FIELDS.reduce((s, f) => s + parseFloat(avg(recs, f.key)), 0) / RATING_FIELDS.length).toFixed(2)
    ),
    count: recs.length,
  }))

  // enrolment pie
  const enrolPie = Object.entries(groupBy(rows, 'enrol_likelihood')).map(([k, v]) => ({
    name: ENROL_LABELS[k] || k,
    value: v.length,
  }))

  // fee pie
  const feePie = Object.entries(groupBy(rows, 'fee_comfort')).map(([k, v]) => ({
    name: FEE_LABELS[k] || k,
    value: v.length,
  }))

  // filtered table rows
  const filtered = rows
    .filter((r) => {
      const matchCentre = filterCentre === 'All' || r.centre_name === filterCentre
      const matchEnrol  = filterEnrol  === 'All' || r.enrol_likelihood === filterEnrol
      const matchSearch = !search ||
        r.parent_name?.toLowerCase().includes(search.toLowerCase()) ||
        r.child_name?.toLowerCase().includes(search.toLowerCase()) ||
        r.centre_name?.toLowerCase().includes(search.toLowerCase())
      return matchCentre && matchEnrol && matchSearch
    })
    .sort((a, b) => {
      const va = a[sortBy], vb = b[sortBy]
      if (va === null || va === undefined) return 1
      if (vb === null || vb === undefined) return -1
      if (sortDir === 'asc') return va > vb ? 1 : -1
      return va < vb ? 1 : -1
    })

  const paginated   = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE)
  const totalPages  = Math.ceil(filtered.length / PER_PAGE)

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir('desc') }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: C.bg, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', sans-serif", color: C.muted, fontSize: 15,
      }}>
        Loading dashboard...
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Inter', sans-serif", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Baloo+2:wght@700;800&display=swap" rel="stylesheet" />

      {/* ── TOP NAV ── */}
      <div style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        padding: '0 32px', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>🏫</div>
            <div>
              <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: 16, color: C.primary, fontWeight: 800 }}>
                Intellitots
              </span>
              <span style={{ fontSize: 13, color: C.muted, marginLeft: 8 }}>Admin Dashboard</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 12, color: C.hint }}>{rows.length} total submissions</span>
            <button
              onClick={fetchData}
              style={{
                padding: '7px 14px', borderRadius: 8, border: `1px solid ${C.border}`,
                background: 'transparent', color: C.muted, fontSize: 13,
                cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              }}
            >
              ↻ Refresh
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '7px 14px', borderRadius: 8, border: 'none',
                background: '#450A0A', color: '#FCA5A5', fontSize: 13,
                cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 600,
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 60px' }}>

        {/* ── STAT CARDS ── */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <StatCard emoji="📋" label="Total Submissions"   value={rows.length}           sub={`${thisWeek.length} this week`} />
          <StatCard emoji="⭐" label="Overall Avg Score"   value={overallAvg.toFixed(1)} sub="across all categories"         color={SCORE_COLOR(overallAvg)} />
          <StatCard emoji="🎉" label="Likely to Enrol"     value={likelyEnrol}           sub={`${rows.length ? ((likelyEnrol/rows.length)*100).toFixed(0) : 0}% of responses`} color={C.success} />
          <StatCard emoji="💬" label="Fee Concerns"        value={feeConCern}            sub="need follow-up"               color={C.warning} />
          <StatCard emoji="🏫" label="Centres Active"      value={centres.length - 1}    sub="reporting data" />
        </div>

        {/* ── OVERALL CATEGORY SCORES ── */}
        <SectionTitle>Average Score by Category</SectionTitle>
        <div style={{
          background: C.surface, borderRadius: 16, padding: '24px 26px',
          border: `1px solid ${C.border}`,
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0 40px',
        }}>
          {RATING_FIELDS.map((f) => (
            <ScoreBar key={f.key} label={f.label} emoji={f.emoji} value={parseFloat(avg(rows, f.key))} />
          ))}
        </div>

        {/* ── CHARTS ROW ── */}
        <SectionTitle>Centre Performance & Enrolment Intent</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>

          {/* Bar chart — centre avg */}
          <div style={{ background: C.surface, borderRadius: 16, padding: '22px 16px', border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.muted, margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: 1 }}>
              Avg Score per Centre
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={centreChart} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="name" tick={{ fill: C.muted, fontSize: 11 }} />
                <YAxis domain={[0, 5]} tick={{ fill: C.muted, fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13 }}
                  labelStyle={{ color: C.text }}
                  formatter={(v, _, props) => [`${v} avg (${props.payload.count} submissions)`, 'Score']}
                />
                <Bar dataKey="avg" fill={C.primary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie — enrolment likelihood */}
          <div style={{ background: C.surface, borderRadius: 16, padding: '22px 16px', border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.muted, margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: 1 }}>
              Enrolment Likelihood
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={enrolPie} dataKey="value" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {enrolPie.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12, color: C.muted }} />
                <Tooltip contentStyle={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Pie — fee comfort */}
          <div style={{ background: C.surface, borderRadius: 16, padding: '22px 16px', border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.muted, margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: 1 }}>
              Fee Comfort Breakdown
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={feePie} dataKey="value" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {feePie.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12, color: C.muted }} />
                <Tooltip contentStyle={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── FOLLOW-UP PRIORITY LIST ── */}
        <SectionTitle>Priority Follow-ups · Fee Concern + Not Enrolled</SectionTitle>
        <div style={{ background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
          {rows
            .filter((r) => ['concern', 'discussion'].includes(r.fee_comfort) && r.enrol_likelihood !== 'yes')
            .slice(0, 8)
            .map((r, i) => (
              <div key={r.id} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 22px',
                borderBottom: i < 7 ? `1px solid ${C.border}` : 'none',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: '#451A03', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 15, flexShrink: 0,
                }}>
                  {ENROL_LABELS[r.enrol_likelihood]?.split(' ')[0] || '🤔'}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, color: C.text, margin: 0 }}>{r.parent_name}</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: '2px 0 0' }}>
                    {r.child_name} · {r.child_age} · {r.centre_name?.replace('Intellitots ', '')}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: 11, padding: '4px 10px', borderRadius: 20,
                    background: '#451A03', color: C.warning, fontWeight: 600,
                  }}>
                    {FEE_LABELS[r.fee_comfort] || r.fee_comfort}
                  </span>
                  <p style={{ fontSize: 11, color: C.hint, margin: '4px 0 0' }}>
                    {new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>
            ))}
          {rows.filter((r) => ['concern', 'discussion'].includes(r.fee_comfort) && r.enrol_likelihood !== 'yes').length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: C.hint, fontSize: 14 }}>
              🎉 No outstanding fee concerns right now
            </div>
          )}
        </div>

        {/* ── ALL SUBMISSIONS TABLE ── */}
        <SectionTitle>All Submissions</SectionTitle>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0) }}
            placeholder="Search parent, child, centre..."
            style={{
              flex: 1, minWidth: 200, padding: '9px 14px', borderRadius: 10,
              border: `1px solid ${C.border}`, background: C.surface,
              color: C.text, fontSize: 13, outline: 'none', fontFamily: "'Inter', sans-serif",
            }}
          />
          <select
            value={filterCentre}
            onChange={(e) => { setFilter(e.target.value); setPage(0) }}
            style={{
              padding: '9px 14px', borderRadius: 10,
              border: `1px solid ${C.border}`, background: C.surface,
              color: C.text, fontSize: 13, outline: 'none', fontFamily: "'Inter', sans-serif",
            }}
          >
            {centres.map((c) => <option key={c} value={c}>{c === 'All' ? 'All Centres' : c.replace('Intellitots ', '')}</option>)}
          </select>
          <select
            value={filterEnrol}
            onChange={(e) => { setEnrol(e.target.value); setPage(0) }}
            style={{
              padding: '9px 14px', borderRadius: 10,
              border: `1px solid ${C.border}`, background: C.surface,
              color: C.text, fontSize: 13, outline: 'none', fontFamily: "'Inter', sans-serif",
            }}
          >
            <option value="All">All Enrolment</option>
            {Object.entries(ENROL_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {[
                  { label: 'Date',          col: 'created_at' },
                  { label: 'Parent',        col: 'parent_name' },
                  { label: 'Child',         col: 'child_name' },
                  { label: 'Age',           col: 'child_age' },
                  { label: 'Centre',        col: 'centre_name' },
                  { label: 'Avg Score',     col: null },
                  { label: 'Fee',           col: 'fee_comfort' },
                  { label: 'Likely Enrol',  col: 'enrol_likelihood' },
                ].map(({ label, col }) => (
                  <th
                    key={label}
                    onClick={() => col && toggleSort(col)}
                    style={{
                      padding: '12px 16px', textAlign: 'left', fontWeight: 600,
                      color: C.hint, textTransform: 'uppercase', letterSpacing: 0.8,
                      fontSize: 11, cursor: col ? 'pointer' : 'default',
                      userSelect: 'none', whiteSpace: 'nowrap',
                    }}
                  >
                    {label} {col && sortBy === col ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: '32px', textAlign: 'center', color: C.hint }}>
                    No submissions match your filters.
                  </td>
                </tr>
              )}
              {paginated.map((r, i) => {
                const rowAvg = (
                  RATING_FIELDS.reduce((s, f) => s + (r[f.key] || 0), 0) / RATING_FIELDS.length
                ).toFixed(1)
                return (
                  <tr
                    key={r.id}
                    style={{
                      borderBottom: i < paginated.length - 1 ? `1px solid ${C.border}` : 'none',
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <td style={{ padding: '12px 16px', color: C.muted, whiteSpace: 'nowrap' }}>
                      {new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                    </td>
                    <td style={{ padding: '12px 16px', color: C.text, fontWeight: 500 }}>{r.parent_name}</td>
                    <td style={{ padding: '12px 16px', color: C.muted }}>{r.child_name}</td>
                    <td style={{ padding: '12px 16px', color: C.muted, whiteSpace: 'nowrap' }}>{r.child_age}</td>
                    <td style={{ padding: '12px 16px', color: C.muted, whiteSpace: 'nowrap' }}>
                      {r.centre_name?.replace('Intellitots ', '')}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        fontWeight: 700, fontSize: 14,
                        color: SCORE_COLOR(parseFloat(rowAvg)),
                      }}>
                        {rowAvg}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        fontSize: 11, padding: '4px 10px', borderRadius: 20, fontWeight: 600,
                        background: ['concern','discussion'].includes(r.fee_comfort) ? '#451A03' : '#052E16',
                        color: ['concern','discussion'].includes(r.fee_comfort) ? C.warning : C.success,
                      }}>
                        {FEE_LABELS[r.fee_comfort] || r.fee_comfort || '—'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        fontSize: 11, padding: '4px 10px', borderRadius: 20, fontWeight: 600,
                        background: r.enrol_likelihood === 'yes' ? '#052E16' : r.enrol_likelihood === 'no' ? '#450A0A' : '#1C1917',
                        color: r.enrol_likelihood === 'yes' ? C.success : r.enrol_likelihood === 'no' ? C.danger : C.warning,
                      }}>
                        {ENROL_LABELS[r.enrol_likelihood] || r.enrol_likelihood || '—'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{
                padding: '8px 16px', borderRadius: 8, border: `1px solid ${C.border}`,
                background: 'transparent', color: page === 0 ? C.hint : C.text,
                cursor: page === 0 ? 'not-allowed' : 'pointer', fontSize: 13,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              ← Prev
            </button>
            <span style={{ padding: '8px 14px', fontSize: 13, color: C.muted }}>
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              style={{
                padding: '8px 16px', borderRadius: 8, border: `1px solid ${C.border}`,
                background: 'transparent', color: page === totalPages - 1 ? C.hint : C.text,
                cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer', fontSize: 13,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Open feedback section */}
        <SectionTitle>Recent Open Feedback</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rows.filter((r) => r.open_feedback).slice(0, 6).map((r) => (
            <div key={r.id} style={{
              background: C.surface, borderRadius: 14, padding: '16px 20px',
              border: `1px solid ${C.border}`,
            }}>
              <p style={{ fontSize: 14, color: C.text, margin: '0 0 10px', lineHeight: 1.6 }}>
                "{r.open_feedback}"
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: C.muted }}>— {r.parent_name}</span>
                <span style={{ fontSize: 12, color: C.hint }}>·</span>
                <span style={{ fontSize: 12, color: C.muted }}>{r.centre_name?.replace('Intellitots ', '')}</span>
                <span style={{ fontSize: 12, color: C.hint }}>·</span>
                <span style={{ fontSize: 12, color: C.hint }}>
                  {new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            </div>
          ))}
          {rows.filter((r) => r.open_feedback).length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: C.hint, fontSize: 14, background: C.surface, borderRadius: 14, border: `1px solid ${C.border}` }}>
              No written feedback yet.
            </div>
          )}
        </div>

      </div>
    </div>
  )
}