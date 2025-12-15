import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()
  const nav = useNavigate()

  const linkClass = (path) =>
    `nav-link ${location.pathname === path ? 'nav-link-active' : ''}`

  return (
    <nav className="site-nav">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <span className="brand-logo">
            <span className="brand-clock">
              <span className="brand-clock-hand" />
            </span>
          </span>
          <div className="brand-text">
            <span className="logo-gradient">Freelancer Time</span>
            <span className="brand-subtitle">Smart time & invoicing</span>
          </div>
        </Link>

        <div className="nav-right">
          {user ? (
            <>
              <div className="nav-links">
                <Link to="/clients" className={linkClass('/clients')}>Clients</Link>
                <Link to="/projects" className={linkClass('/projects')}>Projects</Link>
                <Link to="/time" className={linkClass('/time')}>Time</Link>
                <Link to="/invoices" className={linkClass('/invoices')}>Invoices</Link>
              </div>
              <div className="nav-user">
                <button
                  type="button"
                  className="nav-user-pill"
                  onClick={() => nav('/profile')}
                >
                  <span className="nav-avatar">
                    {user?.user?.name?.[0]?.toUpperCase() || 'F'}
                  </span>
                  <span className="nav-user-meta">
                    <span className="nav-user-name">{user?.user?.name || 'Freelancer'}</span>
                    <span className="nav-user-role">Edit profile</span>
                  </span>
                </button>
                <button
                  onClick={() => { logout(); nav('/login') }}
                  className="btn-outline btn-hover nav-logout"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="nav-links">
              <Link to="/login" className={linkClass('/login')}>Login</Link>
              <Link to="/register" className={linkClass('/register')}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
