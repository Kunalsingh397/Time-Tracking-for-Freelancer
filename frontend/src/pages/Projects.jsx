import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Projects() {
  const { API } = useContext(AuthContext)
  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')
  const [clientId, setClientId] = useState('')
  const [clients, setClients] = useState([])

  const load = async () => {
    const [p, c] = await Promise.all([API.get('/projects'), API.get('/clients')])
    setProjects(p.data)
    setClients(c.data)
  }
  useEffect(() => { load() }, [])

  const add = async () => {
    if (!name.trim()) return
    await API.post('/projects', { name: name.trim(), client: clientId || undefined, hourlyRate: 0 })
    setName('')
    load()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      <section className="md:col-span-2 time-card">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-semibold">Projects</h2>
            <p className="text-sm text-gray-600">Organise your work by client and project.</p>
          </div>
          <span className="badge-pill">
            <span className="dot" />
            {projects.length} active
          </span>
        </div>

        <ul className="time-logs-list">
          {projects.map(p => (
            <li key={p._id} className="time-log-item">
              <div className="time-log-main">
                <span className="time-log-project">{p.name}</span>
                <span className="time-log-date">
                  {p.client?.name || 'No client assigned'}
                </span>
              </div>
              <span className="time-log-hours muted">
                Hourly: ${p.hourlyRate?.toFixed ? p.hourlyRate.toFixed(2) : Number(p.hourlyRate || 0).toFixed(2)}
              </span>
            </li>
          ))}
          {projects.length === 0 && (
            <li className="time-log-item">
              <span className="muted">No projects yet. Create one on the right to start tracking.</span>
            </li>
          )}
        </ul>
      </section>

      <aside className="time-card side-panel">
        <h3 className="text-md font-semibold mb-3">New project</h3>
        <div className="form-row vertical">
          <label className="form-label">Project name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="input"
            placeholder="e.g. Website redesign"
          />
        </div>
        <div className="form-row vertical">
          <label className="form-label">Client</label>
          <select
            value={clientId}
            onChange={e => setClientId(e.target.value)}
            className="input"
          >
            <option value="">Unassigned</option>
            {clients.map(cl => (
              <option key={cl._id} value={cl._id}>{cl.name}</option>
            ))}
          </select>
        </div>
        <button onClick={add} className="btn-primary btn-hover w-full">
          Add project
        </button>
      </aside>
    </div>
  )
}
