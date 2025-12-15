import React, { useState, useEffect } from 'react'

export default function Timer({ onSave, projectId }) {
  const [running, setRunning] = useState(false)
  const [start, setStart] = useState(null)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    let t;
    if (running) {
      t = setInterval(() => setElapsed((Date.now() - start) / 1000), 1000);
    }
    return () => clearInterval(t);
  }, [running, start]);

  const startTimer = () => {
    setStart(Date.now());
    setRunning(true);
  }
  const stopTimer = () => {
    setRunning(false);
    const end = Date.now();
    const durationHours = (end - start) / (1000 * 60 * 60);
    onSave({ project: projectId, date: new Date(), startTime: new Date(start), endTime: new Date(end), durationHours });
    setElapsed(0);
    setStart(null);
  }

  const hh = Math.floor(elapsed/3600).toString().padStart(2,'0')
  const mm = Math.floor(elapsed%3600/60).toString().padStart(2,'0')
  const ss = Math.floor(elapsed%60).toString().padStart(2,'0')

  return (
    <div className={`time-card ${running ? 'card-pop' : 'animate-slide-up'}`}>
      <div className="text-xl mb-2 flex items-center justify-between">
        <div className="font-semibold">Timer</div>
        <div className={`text-sm badge-pill ${running ? '' : 'muted'}`}>
          <span className="dot" style={{ background: running ? '#22c55e' : '#9ca3af' }} />
          {running ? 'Running' : 'Idle'}
        </div>
      </div>
      <div className="mb-3 text-3xl font-mono text-center">{hh}:{mm}:{ss}</div>
      {!running ? (
        <button onClick={startTimer} className="btn-primary btn-hover bg-green-500" style={{ background: '#22c55e' }}>
          Start session
        </button>
      ) : (
        <button onClick={stopTimer} className="btn-primary btn-hover bg-red-500" style={{ background: '#ef4444' }}>
          Stop & save
        </button>
      )}
    </div>
  )
}
