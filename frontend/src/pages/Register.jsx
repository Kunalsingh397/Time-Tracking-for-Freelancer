import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'
import { AuthContext } from '../context/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await API.post('/auth/register', { name, email, password })
      login(res.data)
      nav('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">Freelancer Time</div>
        <p className="muted text-center mb-2">Set up your workspace in a few seconds.</p>
        <div className="dashboard-hero-gallery" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
          <img
            src="https://images.pexels.com/photos/4065135/pexels-photo-4065135.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Freelancer planning projects"
            className="hero-image"
          />
        </div>
        <h2 className="text-lg font-semibold mb-3 text-center">Create your account</h2>
        <form onSubmit={submit} className="space-y-4">
          <input required value={name} onChange={e=>setName(e.target.value)} className="input" placeholder="Full name" />
          <input required value={email} onChange={e=>setEmail(e.target.value)} className="input" placeholder="Email" />
          <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="input" placeholder="Password" />
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary btn-hover">{loading ? 'Creating…' : 'Create account'}</button>
        </form>
      </div>
    </div>
  )
}
