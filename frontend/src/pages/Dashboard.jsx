import React from 'react'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      {/* Hero / overview */}
      <section className="md:col-span-2 dashboard-hero">
        <div className="flex flex-col gap-3">
          <div className="badge-pill">
            <span className="dot" />
            Live overview
          </div>
          <h3>Welcome back, freelancer ✨</h3>
          <p>
            Track your time, keep projects on schedule and generate polished invoices —
            all in one focused workspace.
          </p>
          <div className="dashboard-hero-gallery">
            <img
              src="https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Freelancer working and tracking time"
              className="hero-image"
            />
          </div>
        </div>
        <div className="dashboard-hero-footer">
          <button className="btn-primary btn-hover">Start a new session</button>
          <span className="muted">Tip: jump into the Time tab to start the timer.</span>
        </div>
      </section>

      {/* Quick stats */}
      <aside className="bg-white p-6 rounded-2xl shadow-md card-pop">
        <h4 className="font-semibold text-gray-700">Quick stats</h4>
        <p className="text-sm text-gray-600 mb-2">Today at a glance</p>
        <div className="stat-grid mt-3">
          <div className="stat-card">
            <span className="stat-label">Active projects</span>
            <span className="stat-value">3</span>
            <span className="stat-chip">
              <span className="dot" />
              On track
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Clients</span>
            <span className="stat-value">5</span>
            <span className="text-xs text-gray-600">Ready for invoicing</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
