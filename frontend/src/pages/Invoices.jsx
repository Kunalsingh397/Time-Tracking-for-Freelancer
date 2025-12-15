import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Invoices() {
  const { API } = useContext(AuthContext)
  const [invoices, setInvoices] = useState([])
  const [clients, setClients] = useState([])
  const [projects, setProjects] = useState([])
  const [timeLogs, setTimeLogs] = useState([])

  const [form, setForm] = useState({ client: '', project: '', timeLogs: [], hourlyRate: 0, dueDate: '' })
  const [loading, setLoading] = useState(false)

  const load = async () => {
    const [invRes, cliRes, projRes, tlRes] = await Promise.all([
      API.get('/invoices'), API.get('/clients'), API.get('/projects'), API.get('/time')
    ])
    setInvoices(invRes.data)
    setClients(cliRes.data)
    setProjects(projRes.data)
    setTimeLogs(tlRes.data)
  }
  useEffect(() => { load() }, [])

  const download = async (id)=>{
    const res = await API.get(`/invoices/${id}/pdf`, { responseType: 'blob' })
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
    const a = document.createElement('a'); a.href = url; a.download = `invoice-${id}.pdf`; a.click();
  }

  const toggleLog = (id) => {
    setForm((f) => {
      const exists = f.timeLogs.includes(id)
      return { ...f, timeLogs: exists ? f.timeLogs.filter(x=>x!==id) : [...f.timeLogs, id] }
    })
  }

  const createInvoice = async () => {
    if (!form.client || form.timeLogs.length === 0) return alert('Select a client and at least one time log')
    setLoading(true)
    try {
      await API.post('/invoices', { client: form.client, project: form.project || undefined, timeLogs: form.timeLogs, hourlyRate: Number(form.hourlyRate) || 0, dueDate: form.dueDate || undefined })
      await load()
      setForm({ client: '', project: '', timeLogs: [], hourlyRate: 0, dueDate: '' })
    } catch (err) {
      alert(err?.response?.data?.message || 'Invoice creation failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
      <section className="md:col-span-2 time-card">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-semibold">Invoices</h2>
            <p className="text-sm text-gray-600">Overview of what you&apos;ve billed.</p>
          </div>
          <span className="badge-pill">
            <span className="dot" />
            {invoices.length} total
          </span>
        </div>
        <ul className="time-logs-list">
          {invoices.map(i => (
            <li key={i._id} className="time-log-item">
              <div className="time-log-main">
                <span className="time-log-project">
                  {i.client?.name || 'Unknown client'}
                </span>
                <span className="time-log-date">
                  Amount: ${i.totalAmount?.toFixed(2)} &bull; Status: {i.status}
                </span>
              </div>
              <button
                onClick={() => download(i._id)}
                className="btn-outline btn-hover"
              >
                Download PDF
              </button>
            </li>
          ))}
          {invoices.length === 0 && (
            <li className="time-log-item">
              <span className="muted">No invoices yet. Use the form on the right to create one.</span>
            </li>
          )}
        </ul>
      </section>

      <aside className="time-card side-panel">
        <h3 className="text-md font-semibold mb-3">Create invoice</h3>
        <div className="form-row vertical">
          <label className="form-label">Client</label>
          <select
            className="input"
            value={form.client}
            onChange={e => setForm({ ...form, client: e.target.value })}
          >
            <option value="">Select client</option>
            {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>

        <div className="form-row vertical">
          <label className="form-label">Project (optional)</label>
          <select
            className="input"
            value={form.project}
            onChange={e => setForm({ ...form, project: e.target.value })}
          >
            <option value="">Any project</option>
            {projects
              .filter(p => p.client?._id === form.client || !form.client)
              .map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
        </div>

        <div className="form-row vertical">
          <label className="form-label">Hourly rate</label>
          <input
            className="input"
            type="number"
            value={form.hourlyRate}
            onChange={e => setForm({ ...form, hourlyRate: e.target.value })}
          />
        </div>

        <div className="form-row vertical">
          <label className="form-label">Due date</label>
          <input
            className="input"
            type="date"
            value={form.dueDate}
            onChange={e => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>

        <div className="form-row vertical">
          <label className="form-label">Select time logs</label>
          <div className="max-h-40 overflow-auto border rounded p-2">
            {timeLogs.length === 0 && (
              <div className="text-sm text-gray-500">No time logs yet</div>
            )}
            {timeLogs.map(t => (
              <div key={t._id} className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  checked={form.timeLogs.includes(t._id)}
                  onChange={() => toggleLog(t._id)}
                />
                <div className="text-sm">
                  {new Date(t.date).toLocaleDateString()} — {t.project?.name || '—'} — {t.durationHours?.toFixed(2)} hrs
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={createInvoice}
          disabled={loading}
          className="btn-primary btn-hover w-full mt-2"
        >
          {loading ? 'Creating…' : 'Create invoice'}
        </button>
      </aside>
    </div>
  )
}
