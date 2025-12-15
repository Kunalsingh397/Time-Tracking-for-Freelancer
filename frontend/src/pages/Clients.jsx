import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Clients() {
  const { API } = useContext(AuthContext)
  const [clients, setClients] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')

  const load = async () => {
    const res = await API.get('/clients')
    setClients(res.data)
  }
  useEffect(() => { load() }, [])

  const add = async () => {
    if (!name.trim()) return
    await API.post('/clients', {
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
      notes: notes.trim() || undefined,
    })
    setName('')
    setEmail('')
    setPhone('')
    setAddress('')
    setNotes('')
    load()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      <section className="md:col-span-2 time-card">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-semibold">Clients</h2>
            <p className="text-sm text-gray-600">Keep track of who you work with.</p>
          </div>
          <span className="badge-pill">
            <span className="dot" />
            {clients.length} total
          </span>
        </div>

        <ul className="time-logs-list">
          {clients.map(c => (
            <li key={c._id} className="time-log-item">
              <div className="time-log-main">
                <span className="time-log-project">{c.name}</span>
                <span className="time-log-date">
                  {c.email || 'No email'} &bull; {c.phone || 'No phone'}
                </span>
                {c.address && <span className="time-log-date muted">{c.address}</span>}
                {c.notes && <span className="time-log-date muted">Notes: {c.notes}</span>}
              </div>
            </li>
          ))}
          {clients.length === 0 && (
            <li className="time-log-item">
              <span className="muted">No clients yet. Add your first client using the form on the right.</span>
            </li>
          )}
        </ul>
      </section>

      <aside className="time-card side-panel">
        <div className="flex flex-col mb-3">
          <img
            src="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Client collaboration"
            className="card-illustration"
          />
          <h3 className="text-md font-semibold">Add client</h3>
          <p className="text-sm muted">Store contact details so invoices and projects stay organised.</p>
        </div>
        <div className="form-row vertical">
          <label className="form-label">Client name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="input"
            placeholder="e.g. Acme Corp"
          />
        </div>
        <div className="form-row vertical">
          <label className="form-label">Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input"
            placeholder="client@email.com"
          />
        </div>
        <div className="form-row vertical">
          <label className="form-label">Phone</label>
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="input"
            placeholder="+1 555 000 0000"
          />
        </div>
        <div className="form-row vertical">
          <label className="form-label">Address</label>
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="input"
            placeholder="Street, city, country"
          />
        </div>
        <div className="form-row vertical">
          <label className="form-label">Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="input"
            rows={3}
            placeholder="Any important details about this client"
          />
        </div>
        <button onClick={add} className="btn-primary btn-hover w-full">
          Add client
        </button>
      </aside>
    </div>
  )
}
