import React, { useState, useMemo } from 'react'
import styles from './admissionConfirmation.module.css'

const COURSES = [
  '', 'BSIT', 'BSEE', 'BSCE', 'BSA', 'BSBA', 'BSHRM',
  'BSS', 'BSP', 'BSPA', 'BSAT'
]
const STATUSES = ['', 'PASSED', 'FAILED']

const INITIAL_ROWS = Array.from({ length: 12 }, (_, i) => ({
  id: 1001 + i,
  name: i % 2 === 0 ? 'Annette Black' : 'Jane Cooper',
  academicYear: i % 2 === 0 ? '2024–2025' : '2025–2026',
  course: 'BSIT',
  status: i % 2 === 0 ? 'PASSED' : 'FAILED',
  email: i % 2 === 0 ? 'annette@gmail.com' : 'janecoop@gmail.com',
}))

export default function AdmissionConfirmation() {
  const [filterCourse, setFilterCourse] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [sortName, setSortName] = useState('')

  const visibleRows = useMemo(() => {
    let rows = INITIAL_ROWS
    if (filterCourse) rows = rows.filter(r => r.course === filterCourse)
    if (filterStatus) rows = rows.filter(r => r.status === filterStatus)
    if (sortName) {
      const dir = sortName === 'desc' ? -1 : 1
      rows = [...rows].sort((a, b) =>
        a.name.localeCompare(b.name) * dir
      )
    }
    return rows
  }, [filterCourse, filterStatus, sortName])

  const Chevron = () => (
    <svg
      className="w-4 h-4 text-gray-600 pointer-events-none"
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M19 9l-7 7-7-7"/>
    </svg>
  )

  return (
    <div
      style={{
        backgroundColor: '#F7FAFC',
        color: '#1A202C',
        fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
        lineHeight: 1.5,
        fontWeight: 400,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <aside style={{
        width: 256,
        backgroundColor: '#22543D',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            borderBottom: '1px solid #1C4532'
          }}>
            <img
              src="../assets/pictures/BeastLink_Logo.png"
              alt="Logo"
              style={{ width: 32, height: 32, marginRight: 8 }}
            />
            BeastLink University
          </div>
          <nav style={{ marginTop: '1rem' }}>
            {['Dashboard','Teachers','Admission','Create Schedule','Schedule List','Examination Results']
              .map(label => (
                <a
                  key={label}
                  href="#"
                  style={{
                    display: 'block',
                    padding: '0.5rem 1.5rem',
                    backgroundColor: label==='Admission' ? '#2F855A' : 'transparent',
                    color: '#fff',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#276749'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = (label==='Admission'?'#2F855A':'transparent')}
                >{label}</a>
            ))}
          </nav>
        </div>
        <div style={{ padding: '1rem' }}>
          <button style={{
            backgroundColor: '#2F855A',
            color: '#fff',
            fontSize: '0.875rem',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: 4,
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#276749'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2F855A'}
          >
            Features <span style={{
              marginLeft: 8,
              backgroundColor: '#4299E1',
              fontSize: '0.75rem',
              padding: '0.25rem 0.5rem',
              borderRadius: 9999
            }}>NEW</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowX: 'auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          Letter for Admission Result Module
        </h1>

        <div style={{
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderRadius: 8,
          overflowX: 'auto',
          overflowY: 'visible'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            borderSpacing: 0,
            fontSize: '0.875rem'
          }}>
            <thead style={{ backgroundColor: '#EDF2F7' }}>
              <tr>
                {/*Applicant ID */}
                <th style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>Applicant ID</th>

                {/*Name*/}
                <th style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Name</span>
                    <div className={styles.iconContainer}>
                      <Chevron/>
                      <select
                        value={sortName}
                        onChange={e => setSortName(e.target.value)}
                        className={styles.selectOverlay}
                      >
                        <option value="">ALL</option>
                        <option value="asc">A–Z</option>
                        <option value="desc">Z–A</option>
                      </select>
                    </div>
                  </div>
                </th>

                {/*Academic Year*/}
                <th style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>Academic Year</th>

                {/*Course*/}
                <th style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Course</span>
                    <div className={styles.iconContainer}>
                      <Chevron/>
                      <select
                        value={filterCourse}
                        onChange={e => setFilterCourse(e.target.value)}
                        className={styles.selectOverlay}
                      >
                        {COURSES.map(c => <option key={c} value={c}>{c || 'All'}</option>)}
                      </select>
                    </div>
                  </div>
                </th>

                {/*Status*/}
                <th style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Status</span>
                    <div className={styles.iconContainer}>
                      <Chevron/>
                      <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className={styles.selectOverlay}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s || 'All'}</option>)}
                      </select>
                    </div>
                  </div>
                </th>

                {/*Email Address*/}
                <th style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>Email Address</th>

                {/*Letter*/}
                <th style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>Letter</th>

                {/*Letter Status*/}
                <th style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>Letter Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r, idx) => (
                <tr key={r.id} style={{
                  backgroundColor: idx % 2 === 0 ? '#E6FFFA' : '#fff'
                }}>
                  <td style={{ padding: '0.5rem 1rem' }}>{r.id}</td>
                  <td style={{ padding: '0.5rem 1rem' }}>{r.name}</td>
                  <td style={{ padding: '0.5rem 1rem' }}>{r.academicYear}</td>
                  <td style={{ padding: '0.5rem 1rem' }}>{r.course}</td>
                  <td style={{
                    padding: '0.5rem 1rem',
                    fontWeight: 600,
                    color: r.status === 'PASSED' ? '#2F855A' : '#E53E3E'
                  }}>{r.status}</td>
                  <td style={{ padding: '0.5rem 1rem' }}>{r.email}</td>
                  <td style={{ padding: '0.5rem 1rem', display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => alert('Generate Letter')}
                      style={{
                        backgroundColor: '#4299E1',
                        color: '#fff',
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.75rem',
                        border: 'none',
                        borderRadius: 4,
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3182CE'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4299E1'}
                    >
                      GENERATE
                    </button>
                    <a
                      href="#"
                      onClick={e => { e.preventDefault(); alert('View Letter') }}
                      style={{
                        color: '#A0AEC0',
                        fontSize: '0.75rem',
                        textDecoration: 'none',
                        cursor: 'default',
                      }}
                    >
                      VIEW
                    </a>
                  </td>
                  <td style={{ padding: '0.5rem 1rem', alignItems: 'center' }}>
                    <span style={{ color: '#A0AEC0', fontSize: '0.75rem', marginRight: 8 }}>SENT</span>
                    <a
                      href="#"
                      onClick={e => { e.preventDefault(); alert('Resend Letter') }}
                      style={{ color: '#4299E1', fontSize: '0.75rem', textDecoration: 'underline' }}
                    >
                      resend?
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
