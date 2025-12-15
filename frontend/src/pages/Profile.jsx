import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Profile() {
  const { user, API, updateUser } = useContext(AuthContext)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    setSaving(true)
    try {
      const res = await API.put('/auth/me', { name, email, avatarUrl })
      updateUser(res.data.user, res.data.token)
      setMessage('Profile updated successfully.')
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  const avatarPreview = avatarUrl || user?.avatarUrl
  const initial = (name || user?.name || 'F')[0].toUpperCase()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      <section className="md:col-span-2 time-card">
        <div className="flex items-center gap-4 mb-4">
          <div className="nav-avatar" style={{ width: '3rem', height: '3rem', fontSize: '1.2rem', overflow: 'hidden', padding: 0 }}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              initial
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Your profile</h2>
            <p className="text-sm text-gray-600">Manage your basic account details and avatar.</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="form-row vertical">
            <label className="form-label">Display name</label>
            <input
              className="input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="form-row vertical">
            <label className="form-label">Email</label>
            <input
              className="input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="form-row vertical">
            <label className="form-label">Profile picture URL</label>
            <input
              className="input"
              value={avatarUrl}
              onChange={e => setAvatarUrl(e.target.value)}
              placeholder="Paste an image link (e.g. from your cloud storage)"
            />
          </div>
          {message && <div className="error" style={{ color: message.includes('successfully') ? '#16a34a' : '#dc2626' }}>{message}</div>}
          <button type="submit" className="btn-primary btn-hover mt-1" disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </section>

      <aside className="time-card side-panel">
        <h3 className="text-md font-semibold mb-3">Profile tips</h3>
        <p className="text-sm text-gray-600 mb-2">
          Use a clear name and a professional avatar so your clients recognise your invoices and time reports.
        </p>
        <p className="text-sm text-gray-600">
          For profile pictures, upload an image to a trusted service (e.g. Google Drive, Dropbox, Imgur) and paste the direct image link here.
        </p>
      </aside>
    </div>
  )
}


