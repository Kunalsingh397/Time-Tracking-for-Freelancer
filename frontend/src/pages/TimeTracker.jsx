import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Timer from '../components/Timer'

export default function TimeTracker(){
  const { API } = useContext(AuthContext)
  const [projects, setProjects] = useState([])
  const [logs, setLogs] = useState([])
  const [selectedProject, setSelectedProject] = useState('')

  const load = async ()=>{
    const [p,l] = await Promise.all([API.get('/projects'), API.get('/time')])
    setProjects(p.data)
    setLogs(l.data)
  }
  useEffect(()=>{ load() }, [])

  const saveLog = async (payload) => {
    await API.post('/time', payload)
    load()
  }

  return (
    <div className="time-layout animate-fade-in">
      <section className="time-card">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-semibold">Time logs</h2>
            <p className="text-sm text-gray-600">Review where your hours are going.</p>
          </div>
          <span className="badge-pill">
            <span className="dot" />
            {logs.length} entries
          </span>
        </div>

        <div className="mb-3">
          <label className="text-sm text-gray-700 mb-1 block">Project</label>
          <select
            value={selectedProject}
            onChange={e=>setSelectedProject(e.target.value)}
            className="input"
          >
            <option value="">Select project</option>
            {projects.map(p=> <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
        </div>

        <ul className="time-logs-list">
          {logs.map(l => (
            <li key={l._id} className="time-log-item">
              <div className="time-log-main">
                <span className="time-log-project">{l.project?.name || 'Unassigned project'}</span>
                <span className="time-log-date">
                  {new Date(l.date).toLocaleDateString()} &bull; {new Date(l.startTime).toLocaleTimeString()} - {new Date(l.endTime).toLocaleTimeString()}
                </span>
              </div>
              <span className="time-log-hours">
                {l.durationHours?.toFixed(2)}h
              </span>
            </li>
          ))}
          {logs.length === 0 && (
            <li className="time-log-item">
              <span className="muted">No time logged yet. Start the timer on the right to create your first entry.</span>
            </li>
          )}
        </ul>
      </section>

      <aside>
        <Timer onSave={(data)=> saveLog({ ...data, project: selectedProject })} projectId={selectedProject} />
      </aside>
    </div>
  )
}
